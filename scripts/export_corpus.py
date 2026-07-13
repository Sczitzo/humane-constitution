#!/usr/bin/env python3
"""Generate app/src/generated/corpus.ts from the live repository corpus."""

from __future__ import annotations

import json
import hashlib
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_TS = ROOT / "app" / "src" / "generated" / "corpus.ts"
OUTPUT_JSON = ROOT / "app" / "public" / "generated" / "corpus.json"

CORE_DOCS = (
    "README.md",
    "docs/constitution/Humane_Constitution.md",
    "docs/constitution/Acceptance_Protocol.md",
    "docs/constitution/INVARIANTS.md",
    "docs/constitution/SPECIFICATIONS.md",
    "architecture/parameter_registry.md",
    "architecture/amendment_protocol.md",
    "architecture/drift_chain.md",
    "architecture/implementation_binding.md",
    "docs/governance/Threat_Register.md",
    "docs/governance/Patch_Log.md",
    "docs/governance/Provenance_Map.md",
    "docs/governance/Collapse_State_Crosswalk.md",
    "docs/governance/Threat_Resolution_Matrix.md",
    "docs/governance/Open_Problems_Resolution_Docket.md",
    "docs/governance/Architecture_Source_Map.md",
    "docs/governance/External_Evidence_Register.md",
    "docs/governance/Implementation_Drift_Audit_Package.md",
    "docs/governance/Parameter_Calibration_Register.md",
    "docs/governance/Capture_Dashboard_Specification.md",
    "docs/governance/Conglomerate_Transition_Dossier.md",
    "docs/governance/Essential_Sector_Refusal_Test_Package.md",
    "docs/governance/Essential_Access_Delivery_Standard.md",
    "docs/governance/Rationing_Allocation_Standard.md",
    "docs/governance/Abuse_Case_Library.md",
    "docs/governance/Evidence_Ladder.md",
    "docs/governance/Economic_Spine_Anti_Capture_Coherence_Review.md",
    "docs/governance/Founding_Legitimacy_Dossier.md",
    "docs/governance/Identity_Recovery_Evidence_Test_Package.md",
    "docs/governance/Capacity_Measurement_Evidence_Test_Package.md",
    "docs/governance/Service_Record_Misuse_Evidence_Test_Package.md",
    "docs/governance/Anti_Rent_Legal_Wrapper_Evidence_Test_Package.md",
    "docs/governance/Demurrage_Evidence_Test_Package.md",
    "docs/governance/Commons_Return_Universal_Stake_Evidence_Test_Package.md",
    "docs/governance/CRUS_Simulation_Protocol.md",
    "docs/governance/Productive_Status_Register.md",
    "docs/governance/Cyber_Resilience_Availability_Evidence_Test_Package.md",
    "docs/governance/Last_Resort_Unenrolled_Access_Evidence_Test_Package.md",
    "docs/governance/Monitoring_Administrative_Safety_Packet.md",
    "docs/governance/Monitoring_Repurposing_Evidence_Test_Package.md",
    "docs/governance/Founding_Consent_Civil_Society_Review_Evidence_Test_Package.md",
    "docs/governance/Claims_Evidence_Register.md",
    "docs/governance/Corpus_Refinement_Roadmap.md",
    "docs/governance/Conceptual_Refinement_Audit.md",
    "docs/governance/Minimum_Viable_Constitution_Audit.md",
    "docs/governance/Founding_Preactivation_Disclosure.md",
    "docs/governance/Pilot_Evidence_Roadmap.md",
    "docs/governance/Hardening_Queue.md",
    "docs/governance/Fairness_Vignette_Library.md",
    "docs/governance/Vulnerable_Population_Consent_Protocol.md",
    "docs/governance/Pilot_Timeline_Framework.md",
    "docs/governance/Founding_Capital_Framework.md",
    "docs/governance/Founding_Team_Composition_Standard.md",
    "docs/governance/Christ_Centered_Evaluation.md",
    "docs/governance/Jurisdiction_Interface_Clause.md",
    "docs/governance/Pilot_Site_Selection_Criteria.md",
    "docs/public/00_start_here.md",
    "docs/public/02_faq.md",
    "docs/public/04_white_paper.md",
    "docs/public/05_life_and_rights.md",
    "docs/public/08_useful_history.md",
    "docs/public/09_pilot_proposal.md",
    "docs/public/10_real_world_examples.md",
    "docs/simulations/Adversarial_Narrative_Simulation.md",
    "docs/simulations/Annual_Compound_Simulation.md",
    "docs/simulations/Preliminary_ABM_Results.md",
    "docs/simulations/CRUS_Simulation_Packet_001.md",
    "founding/commitments.md",
    "docs/annexes/INDEX.md",
)


def slugify_heading(text: str) -> str:
    slug = re.sub(r"[^\w\s-]", "", clean_inline(text).lower())
    slug = re.sub(r"[-\s]+", "-", slug).strip("-")
    return slug or "section"


def headings_for(text: str) -> list[dict[str, object]]:
    headings: list[dict[str, object]] = []
    counts: dict[str, int] = {}
    for raw_line in text.splitlines():
        match = re.match(r"^(#{1,6})\s+(.*\S)\s*$", raw_line)
        if not match:
            continue
        level = len(match.group(1))
        heading_text = clean_inline(match.group(2))
        if not heading_text:
            continue
        base_slug = slugify_heading(heading_text)
        counts[base_slug] = counts.get(base_slug, 0) + 1
        slug = base_slug if counts[base_slug] == 1 else f"{base_slug}-{counts[base_slug]}"
        headings.append(
            {
                "level": level,
                "text": heading_text,
                "slug": slug,
            }
        )
    return headings

def clean_inline(text: str) -> str:
    cleaned = re.sub(r"`([^`]*)`", r"\1", text)
    cleaned = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", cleaned)
    cleaned = cleaned.replace("**", "").replace("*", "").replace("_", "")
    return re.sub(r"\s+", " ", cleaned).strip()


def frontmatter_title(text: str) -> str | None:
    """Return the value of a 'title:' key in YAML frontmatter, if present."""
    if not text.startswith("---"):
        return None
    end = text.find("\n---", 3)
    if end == -1:
        return None
    fm = text[3:end]
    m = re.search(r"^title:\s*(.+)$", fm, re.MULTILINE)
    return m.group(1).strip() if m else None


def title_for(text: str, fallback: str) -> str:
    fm = frontmatter_title(text)
    if fm:
        return fm
    for line in text.splitlines():
        if line.startswith("# "):
            return clean_inline(line[2:])
    return fallback


def status_for(text: str) -> str:
    for line in text.splitlines()[:20]:
        stripped = line.strip()
        if stripped.startswith("**Status"):
            return clean_inline(stripped)
    return ""


def summary_for(text: str) -> str:
    paragraphs = re.split(r"\n\s*\n", text)
    for paragraph in paragraphs:
        lines = [line.strip() for line in paragraph.splitlines() if line.strip()]
        if not lines:
            continue
        if any(
            line.startswith(prefix)
            for prefix in ("#", "**Status", "**Purpose", "**Scope", "**Format", "---", "```", "|", ">", "![", "[![")
            for line in lines[:1]
        ):
            continue
        joined = clean_inline(" ".join(lines))
        if not re.search(r"[.!?:;]", joined):
            continue
        if len(joined) >= 60:
            return joined
    return ""


def section_for(relative_path: str) -> str:
    if relative_path.startswith("founding/order/"):
        return "founding_order"
    if relative_path.startswith("docs/annexes/"):
        return "annex"
    if relative_path in {
        "docs/governance/Threat_Register.md",
        "docs/governance/Patch_Log.md",
        "docs/governance/Provenance_Map.md",
        "docs/governance/Collapse_State_Crosswalk.md",
        "docs/governance/Threat_Resolution_Matrix.md",
        "docs/governance/Open_Problems_Resolution_Docket.md",
        "docs/governance/Architecture_Source_Map.md",
        "docs/governance/External_Evidence_Register.md",
        "docs/governance/Implementation_Drift_Audit_Package.md",
        "docs/governance/Parameter_Calibration_Register.md",
        "docs/governance/Capture_Dashboard_Specification.md",
        "docs/governance/Conglomerate_Transition_Dossier.md",
        "docs/governance/Essential_Sector_Refusal_Test_Package.md",
        "docs/governance/Essential_Access_Delivery_Standard.md",
        "docs/governance/Rationing_Allocation_Standard.md",
        "docs/governance/Abuse_Case_Library.md",
        "docs/governance/Evidence_Ladder.md",
        "docs/governance/Economic_Spine_Anti_Capture_Coherence_Review.md",
        "docs/governance/Founding_Legitimacy_Dossier.md",
        "docs/governance/Identity_Recovery_Evidence_Test_Package.md",
        "docs/governance/Capacity_Measurement_Evidence_Test_Package.md",
        "docs/governance/Service_Record_Misuse_Evidence_Test_Package.md",
        "docs/governance/Anti_Rent_Legal_Wrapper_Evidence_Test_Package.md",
        "docs/governance/Demurrage_Evidence_Test_Package.md",
        "docs/governance/Commons_Return_Universal_Stake_Evidence_Test_Package.md",
        "docs/governance/CRUS_Simulation_Protocol.md",
        "docs/governance/Productive_Status_Register.md",
        "docs/governance/Cyber_Resilience_Availability_Evidence_Test_Package.md",
        "docs/governance/Last_Resort_Unenrolled_Access_Evidence_Test_Package.md",
        "docs/governance/Monitoring_Administrative_Safety_Packet.md",
        "docs/governance/Monitoring_Repurposing_Evidence_Test_Package.md",
        "docs/governance/Founding_Consent_Civil_Society_Review_Evidence_Test_Package.md",
        "docs/governance/Claims_Evidence_Register.md",
        "docs/governance/Corpus_Refinement_Roadmap.md",
        "docs/governance/Conceptual_Refinement_Audit.md",
        "docs/governance/Minimum_Viable_Constitution_Audit.md",
        "docs/governance/Founding_Preactivation_Disclosure.md",
        "docs/governance/Pilot_Evidence_Roadmap.md",
        "docs/governance/Hardening_Queue.md",
        "docs/governance/Fairness_Vignette_Library.md",
        "docs/governance/Vulnerable_Population_Consent_Protocol.md",
        "docs/governance/Pilot_Timeline_Framework.md",
        "docs/governance/Founding_Capital_Framework.md",
        "docs/governance/Founding_Team_Composition_Standard.md",
        "docs/governance/Christ_Centered_Evaluation.md",
        "docs/governance/Jurisdiction_Interface_Clause.md",
        "docs/governance/Pilot_Site_Selection_Criteria.md",
        "docs/constitution/Acceptance_Protocol.md",
        "architecture/parameter_registry.md",
        "architecture/amendment_protocol.md",
        "architecture/drift_chain.md",
        "architecture/implementation_binding.md",
        "founding/commitments.md",
    }:
        return "registry"
    return "constitution"


def status_bucket(relative_path: str, status: str) -> str:
    lowered = status.lower()
    if "active" in lowered:
        return "active"
    if "proposed" in lowered:
        return "proposed"
    return "reference"


def collect_docs() -> list[dict[str, object]]:
    docs: list[dict[str, object]] = []
    core_paths = [ROOT / path for path in CORE_DOCS]
    missing_core = [path.relative_to(ROOT).as_posix() for path in core_paths if not path.exists()]
    if missing_core:
        raise FileNotFoundError("Missing CORE_DOCS entries:\n" + "\n".join(missing_core))

    paths = list(core_paths)
    paths.extend(sorted((ROOT / "docs" / "content").glob("*.md")))
    paths.extend(sorted((ROOT / "founding" / "order").glob("*.md")))
    paths.extend(sorted((ROOT / "docs" / "annexes").glob("ANNEX_*.md")))

    seen: set[Path] = set()
    for path in paths:
        if path in seen or not path.exists():
            continue
        seen.add(path)
        rel = path.relative_to(ROOT).as_posix()
        text = path.read_text(encoding="utf-8")
        title = title_for(text, path.stem.replace("_", " "))
        status = status_for(text)
        docs.append(
            {
                "id": rel.replace("/", "__").replace(".", "_"),
                "path": rel,
                "section": section_for(rel),
                "title": title,
                "status": status,
                "statusBucket": status_bucket(rel, status),
                "summary": summary_for(text),
                "content": text,
                "headings": headings_for(text),
                "wordCount": len(re.findall(r"\b\w+\b", text)),
                "headingCount": len(re.findall(r"^#{1,6}\s", text, re.MULTILINE)),
            }
        )
    return docs


def parse_commitment_stats() -> tuple[int, int]:
    lines = (ROOT / "founding" / "commitments.md").read_text(encoding="utf-8").splitlines()
    rows = [line for line in lines if line.startswith("| **FC-")]
    reserved = [line for line in rows if "| RESERVED" in line]
    return len(rows), len(reserved)


def parse_heading_id_count(path: Path, prefix: str) -> int:
    text = path.read_text(encoding="utf-8")
    heading_ids = set(re.findall(rf"^###\s+({prefix}-\d{{3}})\b", text, re.MULTILINE))
    table_ids = set(re.findall(rf"^\|\s*({prefix}-\d{{3}})\s*\|", text, re.MULTILINE))
    return len(heading_ids | table_ids)


def parse_article_count() -> int:
    text = (ROOT / "docs" / "constitution" / "Humane_Constitution.md").read_text(encoding="utf-8")
    return len(set(re.findall(r"^#{1,6}\s+(Article [IVX]+)\b", text, re.MULTILINE)))


def collect_stats(docs: list[dict[str, object]]) -> dict[str, object]:
    annexes = [doc for doc in docs if doc["section"] == "annex"]
    founding_order_docs = [doc for doc in docs if doc["section"] == "founding_order"]
    commitment_count, reserved_commitment_count = parse_commitment_stats()
    stats = {
        "schema": "Founding Order + Articles I-VII",
        "articleCount": parse_article_count(),
        "foundingOrderDocumentCount": len(founding_order_docs),
        "annexCount": len(annexes),
        "activeAnnexCount": sum(doc["statusBucket"] == "active" for doc in annexes),
        "proposedAnnexCount": sum(doc["statusBucket"] == "proposed" for doc in annexes),
        "referenceAnnexCount": sum(doc["statusBucket"] == "reference" for doc in annexes),
        "commitmentCount": commitment_count,
        "reservedCommitmentCount": reserved_commitment_count,
        "threatCount": parse_heading_id_count(ROOT / "docs" / "governance" / "Threat_Register.md", "T"),
        "patchCount": parse_heading_id_count(ROOT / "docs" / "governance" / "Patch_Log.md", "P"),
        "validatorStatus": "pass",
    }
    fingerprint_input = json.dumps({"docs": docs, "stats": stats}, sort_keys=True).encode("utf-8")
    stats["buildStamp"] = f"corpus-{hashlib.sha256(fingerprint_input).hexdigest()[:12]}"
    return stats


def write_output(docs: list[dict[str, object]], stats: dict[str, object]) -> None:
    featured_paths = [
        "docs/public/00_start_here.md",
        "docs/public/08_useful_history.md",
        "docs/public/05_life_and_rights.md",
        "docs/public/09_pilot_proposal.md",
        "docs/public/10_real_world_examples.md",
        "docs/public/02_faq.md",
        "docs/public/04_white_paper.md",
        "docs/governance/Fairness_Vignette_Library.md",
        "docs/governance/Claims_Evidence_Register.md",
        "docs/governance/Corpus_Refinement_Roadmap.md",
        "docs/governance/Pilot_Evidence_Roadmap.md",
        "docs/constitution/Humane_Constitution.md",
        "docs/constitution/SPECIFICATIONS.md",
        "docs/governance/External_Evidence_Register.md",
        "docs/governance/Evidence_Ladder.md",
        "docs/governance/Economic_Spine_Anti_Capture_Coherence_Review.md",
        "docs/governance/Collapse_State_Crosswalk.md",
        "docs/governance/Abuse_Case_Library.md",
        "docs/governance/Founding_Legitimacy_Dossier.md",
        "docs/governance/Identity_Recovery_Evidence_Test_Package.md",
        "docs/governance/Capacity_Measurement_Evidence_Test_Package.md",
        "docs/governance/Service_Record_Misuse_Evidence_Test_Package.md",
        "docs/governance/Anti_Rent_Legal_Wrapper_Evidence_Test_Package.md",
        "docs/governance/Commons_Return_Universal_Stake_Evidence_Test_Package.md",
        "docs/governance/Cyber_Resilience_Availability_Evidence_Test_Package.md",
        "docs/governance/Last_Resort_Unenrolled_Access_Evidence_Test_Package.md",
        "docs/governance/Monitoring_Administrative_Safety_Packet.md",
        "docs/governance/Monitoring_Repurposing_Evidence_Test_Package.md",
        "docs/governance/Founding_Consent_Civil_Society_Review_Evidence_Test_Package.md",
        "docs/governance/Implementation_Drift_Audit_Package.md",
        "docs/governance/Parameter_Calibration_Register.md",
        "docs/governance/Capture_Dashboard_Specification.md",
        "docs/governance/Conglomerate_Transition_Dossier.md",
        "docs/governance/Essential_Sector_Refusal_Test_Package.md",
        "docs/governance/Open_Problems_Resolution_Docket.md",
        "docs/governance/Architecture_Source_Map.md",
        "docs/governance/Threat_Resolution_Matrix.md",
        "docs/governance/Conceptual_Refinement_Audit.md",
        "docs/governance/Threat_Register.md",
        "docs/governance/Patch_Log.md",
        "architecture/parameter_registry.md",
        "architecture/amendment_protocol.md",
        "architecture/drift_chain.md",
        "architecture/implementation_binding.md",
        "founding/commitments.md",
        "docs/annexes/ANNEX_AK.md",
        "docs/annexes/ANNEX_AL.md",
        "docs/annexes/ANNEX_AR.md",
        "docs/annexes/ANNEX_AS.md",
    ]
    doc_paths = {doc["path"] for doc in docs}
    missing_featured = [path for path in featured_paths if path not in doc_paths]
    if missing_featured:
        raise FileNotFoundError("Missing featured corpus entries:\n" + "\n".join(missing_featured))

    payload = {
        "stats": stats,
        "docs": docs,
        "featuredPaths": featured_paths,
    }

    OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_TS.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_JSON.write_text(json.dumps(payload, indent=2), encoding="utf-8")

    content = (
        "// Generated by scripts/export_corpus.py. Do not edit directly.\n\n"
        "export type CorpusSection = 'constitution' | 'founding_order' | 'registry' | 'annex'\n"
        "export type StatusBucket = 'active' | 'proposed' | 'reference'\n\n"
        "export interface CorpusHeading {\n"
        "  level: number\n"
        "  text: string\n"
        "  slug: string\n"
        "}\n\n"
        "export interface CorpusDoc {\n"
        "  id: string\n"
        "  path: string\n"
        "  section: CorpusSection\n"
        "  title: string\n"
        "  status: string\n"
        "  statusBucket: StatusBucket\n"
        "  summary: string\n"
        "  content: string\n"
        "  headings: CorpusHeading[]\n"
        "  wordCount: number\n"
        "  headingCount: number\n"
        "}\n\n"
        "export interface CorpusStats {\n"
        "  buildStamp: string\n"
        "  schema: string\n"
        "  articleCount: number\n"
        "  foundingOrderDocumentCount: number\n"
        "  annexCount: number\n"
        "  activeAnnexCount: number\n"
        "  proposedAnnexCount: number\n"
        "  referenceAnnexCount: number\n"
        "  commitmentCount: number\n"
        "  reservedCommitmentCount: number\n"
        "  threatCount: number\n"
        "  patchCount: number\n"
        "  validatorStatus: 'pass'\n"
        "}\n\n"
        "export interface CorpusPayload {\n"
        "  stats: CorpusStats\n"
        "  docs: CorpusDoc[]\n"
        "  featuredPaths: string[]\n"
        "}\n\n"
        "export const corpusDataUrl = '/generated/corpus.json'\n\n"
        "export async function loadCorpus(): Promise<CorpusPayload> {\n"
        "  const response = await fetch(corpusDataUrl)\n"
        "  if (!response.ok) {\n"
        "    throw new Error(`Could not load corpus data: ${response.status} ${response.statusText}`)\n"
        "  }\n"
        "  return response.json() as Promise<CorpusPayload>\n"
        "}\n"
    )
    OUTPUT_TS.write_text(content, encoding="utf-8")


def main() -> int:
    docs = collect_docs()
    stats = collect_stats(docs)
    write_output(docs, stats)
    print(
        f"Wrote {OUTPUT_TS.relative_to(ROOT)} and {OUTPUT_JSON.relative_to(ROOT)} with {len(docs)} documents."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
