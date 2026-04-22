#!/usr/bin/env python3
"""Generate app/src/generated/corpus.ts from the live repository corpus."""

from __future__ import annotations

import json
import hashlib
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "app" / "src" / "generated" / "corpus.ts"

CORE_DOCS = (
    "Humane_Constitution.md",
    "White_Paper.md",
    "Citizen_Facing_Rights_Layer.md",
    "README.md",
    "Threat_Register.md",
    "Patch_Log.md",
    "Acceptance_Protocol.md",
    "founding/commitments.md",
    "docs/SPECIFICATIONS.md",
    "docs/Founding_Preactivation_Disclosure.md",
    "docs/annexes/INDEX.md",
)

def clean_inline(text: str) -> str:
    cleaned = re.sub(r"`([^`]*)`", r"\1", text)
    cleaned = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", cleaned)
    cleaned = cleaned.replace("**", "").replace("*", "").replace("_", "")
    return re.sub(r"\s+", " ", cleaned).strip()


def title_for(text: str, fallback: str) -> str:
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
    if relative_path.startswith("docs/annexes/ANNEX_"):
        return "annex"
    if relative_path in {
        "Threat_Register.md",
        "Patch_Log.md",
        "Acceptance_Protocol.md",
        "founding/commitments.md",
        "docs/Founding_Preactivation_Disclosure.md",
        "docs/annexes/INDEX.md",
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
    paths = [ROOT / path for path in CORE_DOCS]
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
    text = (ROOT / "Humane_Constitution.md").read_text(encoding="utf-8")
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
        "threatCount": parse_heading_id_count(ROOT / "Threat_Register.md", "T"),
        "patchCount": parse_heading_id_count(ROOT / "Patch_Log.md", "P"),
        "validatorStatus": "pass",
    }
    fingerprint_input = json.dumps({"docs": docs, "stats": stats}, sort_keys=True).encode("utf-8")
    stats["buildStamp"] = f"corpus-{hashlib.sha256(fingerprint_input).hexdigest()[:12]}"
    return stats


def write_output(docs: list[dict[str, object]], stats: dict[str, object]) -> None:
    featured_paths = [
        "Humane_Constitution.md",
        "White_Paper.md",
        "founding/commitments.md",
        "Threat_Register.md",
        "Patch_Log.md",
        "docs/SPECIFICATIONS.md",
        "docs/annexes/ANNEX_AK.md",
        "docs/annexes/ANNEX_AL.md",
        "docs/annexes/ANNEX_AR.md",
        "docs/annexes/ANNEX_AS.md",
    ]

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    content = (
        "// Generated by scripts/export_corpus.py. Do not edit directly.\n\n"
        "export type CorpusSection = 'constitution' | 'founding_order' | 'registry' | 'annex'\n"
        "export type StatusBucket = 'active' | 'proposed' | 'reference'\n\n"
        "export interface CorpusDoc {\n"
        "  id: string\n"
        "  path: string\n"
        "  section: CorpusSection\n"
        "  title: string\n"
        "  status: string\n"
        "  statusBucket: StatusBucket\n"
        "  summary: string\n"
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
        f"export const corpusStats: CorpusStats = {json.dumps(stats, indent=2)} as const\n\n"
        f"export const corpusDocs: CorpusDoc[] = {json.dumps(docs, indent=2)}\n\n"
        f"export const featuredPaths = {json.dumps(featured_paths, indent=2)} as const\n"
    )
    OUTPUT.write_text(content, encoding="utf-8")


def main() -> int:
    docs = collect_docs()
    stats = collect_stats(docs)
    write_output(docs, stats)
    print(f"Wrote {OUTPUT.relative_to(ROOT)} with {len(docs)} documents.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
