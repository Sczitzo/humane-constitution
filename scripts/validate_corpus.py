#!/usr/bin/env python3
"""Validate the Humane Constitution corpus.

Checks:
1. Local markdown links resolve.
2. Markdown heading anchors resolve for local markdown links with fragments.
3. The annex index covers every annex file in docs/annexes/.
4. FC/T/P identifier references resolve against their authoritative registries.
5. Deprecated naming/history terms do not appear in live documents.
6. Unresolved founding placeholders are surfaced as warnings.
7. Every annex has a complete 'At a glance' opening block with valid evidence status.
8. Every docs/governance/*.md is registered in CORE_DOCS and section_for() in export_corpus.py.
9. No FC/T/P identifier is defined more than once in its authoritative registry.
10. Banned status synonyms do not appear in the four governance status docs.
11. Every T-NNN in Threat_Register is cross-referenced in Patch_Log.
12. Blockquote-embedded tables have a separator row and consistent column counts.
"""

from __future__ import annotations

import re
import sys
from collections import Counter
from dataclasses import dataclass, field
from pathlib import Path
from typing import Iterable


ROOT = Path(__file__).resolve().parents[1]
ANNEX_DIR = ROOT / "docs" / "annexes"
INDEX_PATH = ANNEX_DIR / "INDEX.md"

IGNORED_DIRS = {
    ".git",
    ".github",
    ".claude",
    ".pytest_cache",
    "__pycache__",
    "node_modules",
    "dist",
}

DEPRECATED_TERM_EXEMPTIONS = set()

PLACEHOLDER_WARNING_EXEMPTIONS = {
    Path("docs/constitution/Acceptance_Protocol.md"),
    Path("CONTRIBUTING.md"),
    Path("docs/governance/Patch_Log.md"),
    Path("founding/commitments.md"),
}

DEPRECATED_TERMS = (
    "Master Protocol",
    "master protocol",
    "Master_Protocol.md",
    "Enterprise Currency",
    "Life Access Ledger",
    "Deliberation Weight",
    "Civic Record",
    "Scarcity Quotas",
    "Seven Pillars + P0",
    "Continuity note:",
)

# Valid evidence status values per CLAUDE.md status language standard.
VALID_EVIDENCE_STATUSES = {
    "Proposed",
    "Designed",
    "Active — unproven",
    "Partly tested",
    "Evidence-backed",
    "Resolved",
}

# Required fields in the canonical 'At a glance' blockquote table.
CANONICAL_OPENING_FIELDS = (
    "Purpose",
    "Who it protects",
    "Failure risk",
    "Evidence status",
    "Linked risks",
)

# Docs that use the status vocabulary table; banned synonyms are checked in these only.
STATUS_VOCAB_DOCS = {
    ROOT / "docs" / "governance" / "Threat_Register.md",
    ROOT / "docs" / "governance" / "Patch_Log.md",
    ROOT / "docs" / "governance" / "Hardening_Queue.md",
    ROOT / "docs" / "governance" / "Claims_Evidence_Register.md",
}

LINK_RE = re.compile(r"(?<!!)\[[^\]]+\]\(([^)]+)\)")
HEADING_RE = re.compile(r"^(#{1,6})\s+(.+?)\s*$", re.MULTILINE)
LOCAL_ID_RE = re.compile(r"\b(?:FC|T|P)-\d{3}\b")
PLACEHOLDER_RE = re.compile(r"\[FOUNDING COMMITMENT[^\]]*\]")
FC_DEF_RE = re.compile(r"\*\*(FC-\d{3})\*\*")
TABLE_ID_RE = re.compile(r"^\|\s*((?:FC|T|P)-\d{3})\s*\|")

# Matches a table cell whose entire content is a banned status synonym.
BANNED_STATUS_CELL_RE = re.compile(
    r"\|\s*\*{0,2}(Closed|Addressed|Partial|Complete|Open)\*{0,2}\s*\|",
    re.IGNORECASE,
)

# Extracts the value from an 'Evidence status' table row (handles blockquote '> |' prefix).
EVIDENCE_STATUS_ROW_RE = re.compile(
    r"^>?\s*\|\s*\*\*Evidence status\*\*\s*\|\s*([^|]+?)\s*\|",
    re.MULTILINE,
)


@dataclass
class ValidationResult:
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)

    def error(self, message: str) -> None:
        self.errors.append(message)

    def warn(self, message: str) -> None:
        self.warnings.append(message)


def iter_markdown_files() -> Iterable[Path]:
    for path in ROOT.rglob("*.md"):
        if any(part in IGNORED_DIRS for part in path.parts):
            continue
        yield path


def relative(path: Path) -> Path:
    return path.relative_to(ROOT)


def normalize_target(raw_target: str) -> str:
    target = raw_target.strip()
    if target.startswith("<") and target.endswith(">"):
        target = target[1:-1]
    return target


def is_external_target(target: str) -> bool:
    lowered = target.lower()
    return lowered.startswith(("http://", "https://", "mailto:", "tel:", "data:"))


def split_target(target: str) -> tuple[str, str]:
    if "#" in target:
        path_part, anchor = target.split("#", 1)
        return path_part, anchor
    return target, ""


def strip_markdown_inline(text: str) -> str:
    cleaned = re.sub(r"`([^`]*)`", r"\1", text)
    cleaned = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", cleaned)
    cleaned = cleaned.replace("*", "").replace("_", "")
    cleaned = re.sub(r"<[^>]+>", "", cleaned)
    return cleaned.strip()


def github_anchor_slug(text: str) -> str:
    cleaned = strip_markdown_inline(text).lower()
    cleaned = re.sub(r"[^\w\- ]", "", cleaned)
    cleaned = cleaned.replace(" ", "-")
    cleaned = re.sub(r"-{2,}", "-", cleaned).strip("-")
    return cleaned


def markdown_anchor_map(text: str) -> set[str]:
    anchors: set[str] = set()
    counts: Counter[str] = Counter()
    for match in HEADING_RE.finditer(text):
        slug = github_anchor_slug(match.group(2))
        if not slug:
            continue
        count = counts[slug]
        anchor = slug if count == 0 else f"{slug}-{count}"
        counts[slug] += 1
        anchors.add(anchor)
    return anchors


def resolve_local_target(source_file: Path, target: str) -> Path:
    if target.startswith("/"):
        return ROOT / target.lstrip("/")
    return (source_file.parent / target).resolve()


def letters_to_number(value: str) -> int:
    total = 0
    for char in value:
        if not ("A" <= char <= "Z"):
            raise ValueError(f"invalid annex suffix: {value}")
        total = total * 26 + (ord(char) - ord("A") + 1)
    return total


def number_to_letters(value: int) -> str:
    letters: list[str] = []
    while value > 0:
        value, rem = divmod(value - 1, 26)
        letters.append(chr(ord("A") + rem))
    return "".join(reversed(letters))


def expand_annex_range(first_name: str, last_name: str) -> set[str]:
    first_suffix = first_name.removeprefix("ANNEX_").removesuffix(".md")
    last_suffix = last_name.removeprefix("ANNEX_").removesuffix(".md")
    start = letters_to_number(first_suffix)
    end = letters_to_number(last_suffix)
    return {f"ANNEX_{number_to_letters(number)}.md" for number in range(start, end + 1)}


def validate_local_links(result: ValidationResult, markdown_files: list[Path]) -> None:
    anchor_cache: dict[Path, set[str]] = {}
    for source in markdown_files:
        text = source.read_text(encoding="utf-8")
        for raw_target in LINK_RE.findall(text):
            target = normalize_target(raw_target)
            if not target or is_external_target(target):
                continue

            path_part, anchor = split_target(target)
            if not path_part:
                resolved = source
            else:
                resolved = resolve_local_target(source, path_part)

            if not resolved.exists():
                result.error(
                    f"{relative(source)} -> {target}: missing local target {relative(resolved) if resolved.is_absolute() and resolved.exists() else resolved}"
                )
                continue

            if anchor and resolved.suffix.lower() == ".md":
                anchors = anchor_cache.setdefault(
                    resolved, markdown_anchor_map(resolved.read_text(encoding="utf-8"))
                )
                if anchor not in anchors:
                    result.error(
                        f"{relative(source)} -> {target}: missing markdown anchor #{anchor} in {relative(resolved)}"
                    )


def validate_annex_index(result: ValidationResult) -> None:
    actual = {path.name for path in ANNEX_DIR.glob("*.md") if path.name != "INDEX.md"}
    index_text = INDEX_PATH.read_text(encoding="utf-8")
    covered: set[str] = set()

    for line in index_text.splitlines():
        link_targets = [
            normalize_target(target)
            for target in LINK_RE.findall(line)
            if normalize_target(target).endswith(".md")
        ]
        names = [Path(split_target(target)[0]).name for target in link_targets]
        annex_names = [name for name in names if name in actual]
        if "through" in line and len(annex_names) >= 2:
            first = annex_names[0]
            last = annex_names[1]
            if first.startswith("ANNEX_") and last.startswith("ANNEX_"):
                covered.update(expand_annex_range(first, last))
                continue
        covered.update(annex_names)

    missing = sorted(actual - covered)
    extra = sorted(covered - actual)

    for name in missing:
        result.error(f"docs/annexes/INDEX.md does not cover {name}")
    for name in extra:
        result.error(f"docs/annexes/INDEX.md references non-existent annex {name}")


def parse_fc_definitions() -> set[str]:
    definitions: set[str] = set()
    for line in (ROOT / "founding" / "commitments.md").read_text(encoding="utf-8").splitlines():
        if line.lstrip().startswith("|"):
            definitions.update(FC_DEF_RE.findall(line))
    return definitions


def parse_heading_ids(path: Path, prefix: str) -> set[str]:
    text = path.read_text(encoding="utf-8")
    definitions: set[str] = set()
    for line in text.splitlines():
        if line.startswith("### "):
            definitions.update(re.findall(rf"\b{prefix}-\d{{3}}\b", line))
    return definitions


def parse_table_ids(path: Path, prefix: str) -> set[str]:
    definitions: set[str] = set()
    for line in path.read_text(encoding="utf-8").splitlines():
        match = TABLE_ID_RE.match(line)
        if match:
            identifier = match.group(1)
            if identifier.startswith(f"{prefix}-"):
                definitions.add(identifier)
    return definitions


def collect_identifier_definitions(_: ValidationResult) -> dict[str, set[str]]:
    return {
        "FC": parse_fc_definitions(),
        "T": parse_heading_ids(ROOT / "docs" / "governance" / "Threat_Register.md", "T")
        | parse_table_ids(ROOT / "docs" / "governance" / "Threat_Register.md", "T"),
        "P": parse_heading_ids(ROOT / "docs" / "governance" / "Patch_Log.md", "P")
        | parse_table_ids(ROOT / "docs" / "governance" / "Patch_Log.md", "P"),
    }


def validate_identifier_references(
    result: ValidationResult,
    markdown_files: list[Path],
    definitions: dict[str, set[str]],
) -> None:
    for path in markdown_files:
        text = path.read_text(encoding="utf-8")
        for identifier in sorted(set(LOCAL_ID_RE.findall(text))):
            prefix = identifier.split("-", 1)[0]
            if identifier not in definitions[prefix]:
                result.error(f"{relative(path)} references undefined identifier {identifier}")


def validate_deprecated_terms(result: ValidationResult, markdown_files: list[Path]) -> None:
    for path in markdown_files:
        rel = relative(path)
        if rel in DEPRECATED_TERM_EXEMPTIONS:
            continue
        text = path.read_text(encoding="utf-8")
        for term in DEPRECATED_TERMS:
            if term in text:
                result.error(f"{rel} contains deprecated term: {term}")


def validate_placeholders(result: ValidationResult, markdown_files: list[Path]) -> None:
    for path in markdown_files:
        rel = relative(path)
        if rel in PLACEHOLDER_WARNING_EXEMPTIONS:
            continue
        if PLACEHOLDER_RE.search(path.read_text(encoding="utf-8")):
            result.warn(f"{rel} still contains [FOUNDING COMMITMENT] placeholder text")


def validate_annex_opening_blocks(result: ValidationResult) -> None:
    """SC-1/SC-2: Every ANNEX_*.md must have a complete canonical opening block."""
    for path in sorted(ANNEX_DIR.glob("ANNEX_*.md")):
        rel = relative(path)
        text = path.read_text(encoding="utf-8")
        lines = text.splitlines()

        h1_idx = next((i for i, ln in enumerate(lines) if ln.startswith("# ")), None)
        if h1_idx is None:
            result.error(f"{rel}: missing H1 heading")
            continue

        # Inspect the 35 lines immediately after the H1 for the opening block.
        window = "\n".join(lines[h1_idx + 1 : h1_idx + 36])

        if "At a glance" not in window:
            if "Plain-language purpose" in window or "Evidence status" in window:
                result.warn(
                    f"{rel}: opening block uses non-canonical bullet format; "
                    "convert to '> **At a glance**' blockquote table"
                )
            else:
                result.error(f"{rel}: missing 'At a glance' opening block immediately after H1")
            continue

        # Check all required fields are present.
        for field_name in CANONICAL_OPENING_FIELDS:
            if f"**{field_name}**" not in window:
                result.error(f"{rel}: opening block missing required field '{field_name}'")

        # Validate the Evidence status value.
        m = EVIDENCE_STATUS_ROW_RE.search(window)
        if m:
            status = m.group(1).strip()
            if status not in VALID_EVIDENCE_STATUSES:
                result.error(
                    f"{rel}: invalid evidence status '{status}' — must be one of: "
                    + ", ".join(sorted(VALID_EVIDENCE_STATUSES))
                )
        else:
            result.error(f"{rel}: 'Evidence status' row missing or unparseable in opening block")


def validate_governance_registration(result: ValidationResult) -> None:
    """SC-3: Every docs/governance/*.md must be in CORE_DOCS and section_for()."""
    export_script = ROOT / "scripts" / "export_corpus.py"
    if not export_script.exists():
        result.error("scripts/export_corpus.py not found — cannot verify governance registration")
        return

    script_text = export_script.read_text(encoding="utf-8")

    governance_dir = ROOT / "docs" / "governance"
    if not governance_dir.exists():
        return

    on_disk = {f"docs/governance/{p.name}" for p in governance_dir.glob("*.md")}

    # Extract all "docs/governance/..." strings from CORE_DOCS.
    core_docs_match = re.search(r"CORE_DOCS\s*=\s*\((.*?)\)", script_text, re.DOTALL)
    if not core_docs_match:
        result.error("scripts/export_corpus.py: cannot locate CORE_DOCS tuple")
        return
    in_core = set(re.findall(r'"(docs/governance/[^"]+)"', core_docs_match.group(1)))

    # Extract all "docs/governance/..." strings from section_for().
    section_for_match = re.search(
        r"def section_for\(.*?(?=\ndef |\Z)", script_text, re.DOTALL
    )
    in_section_for: set[str] = set()
    if section_for_match:
        in_section_for = set(
            re.findall(r'"(docs/governance/[^"]+)"', section_for_match.group(0))
        )
    else:
        result.warn("scripts/export_corpus.py: cannot parse section_for() — skipping section check")

    for path_str in sorted(on_disk):
        if path_str not in in_core:
            result.error(
                f"{path_str}: not in CORE_DOCS in scripts/export_corpus.py "
                "(file will be invisible in the reader)"
            )
        if in_section_for and path_str not in in_section_for:
            result.error(
                f"{path_str}: not in section_for() in scripts/export_corpus.py "
                "(will get wrong nav section)"
            )


def validate_duplicate_identifiers(result: ValidationResult) -> None:
    """SC-5: No FC/T/P identifier may be defined more than once in its registry.

    T/P definitions are '### X-NNN' headings (table rows are summary cross-references,
    not additional definitions). FC definitions are bold table cells in commitments.md.
    """
    sources: dict[str, tuple[Path, str]] = {
        "FC": (ROOT / "founding" / "commitments.md", "FC"),
        "T": (ROOT / "docs" / "governance" / "Threat_Register.md", "T"),
        "P": (ROOT / "docs" / "governance" / "Patch_Log.md", "P"),
    }

    for prefix, (path, _) in sources.items():
        if not path.exists():
            continue
        text = path.read_text(encoding="utf-8")
        counts: Counter[str] = Counter()

        if prefix == "FC":
            # Definitions are bold **FC-NNN** cells in the commitments table.
            for line in text.splitlines():
                if line.lstrip().startswith("|"):
                    for identifier in FC_DEF_RE.findall(line):
                        counts[identifier] += 1
        else:
            # Definitions are ### headings only; table rows are cross-references, not definitions.
            # Only the primary identifier (immediately after '### ') is the definition;
            # identifiers mentioned later in the heading title are cross-references.
            primary_heading_re = re.compile(rf"^###\s+({prefix}-\d{{3}})\b")
            for line in text.splitlines():
                m = primary_heading_re.match(line)
                if m:
                    counts[m.group(1)] += 1

        for identifier, count in sorted(counts.items()):
            if count > 1:
                result.error(
                    f"{relative(path)}: identifier {identifier} defined {count} times "
                    "in '### ' headings (must be defined exactly once)"
                )


def validate_status_vocab_in_governance_docs(result: ValidationResult) -> None:
    """SC-2: Banned status synonyms must not appear as table cell values in the four governance docs."""
    for path in STATUS_VOCAB_DOCS:
        if not path.exists():
            continue
        rel = relative(path)
        for i, line in enumerate(path.read_text(encoding="utf-8").splitlines(), start=1):
            if not line.strip().startswith("|"):
                continue
            for m in BANNED_STATUS_CELL_RE.finditer(line):
                result.error(
                    f"{rel}:{i}: banned status synonym '{m.group(1)}' in table cell "
                    f"— use one of: {', '.join(sorted(VALID_EVIDENCE_STATUSES))}"
                )


def validate_threat_patch_cross_reference(result: ValidationResult) -> None:
    """SC-4 (weak): Every active T-NNN in Threat_Register must be mentioned in Patch_Log.

    Retired and renumbered IDs (rows whose second cell contains RETIRED or RENUMBERED)
    are excluded — they have no patch by design.
    """
    threat_register = ROOT / "docs" / "governance" / "Threat_Register.md"
    patch_log = ROOT / "docs" / "governance" / "Patch_Log.md"

    if not threat_register.exists() or not patch_log.exists():
        return

    threat_text = threat_register.read_text(encoding="utf-8")
    patch_text = patch_log.read_text(encoding="utf-8")

    # Collect IDs explicitly marked as retired or renumbered in table rows.
    retired_ids: set[str] = set()
    for line in threat_text.splitlines():
        if not line.strip().startswith("|"):
            continue
        cells = [c.strip().strip("*").strip() for c in line.strip("|").split("|")]
        if len(cells) >= 2 and re.match(r"T-\d{3}", cells[0]):
            if "RETIRED" in cells[1].upper() or "RENUMBERED" in cells[1].upper():
                retired_ids.add(cells[0].strip())

    defined_threats: set[str] = set()
    for line in threat_text.splitlines():
        if line.startswith("### "):
            defined_threats.update(re.findall(r"\bT-\d{3}\b", line))
        match = TABLE_ID_RE.match(line)
        if match and match.group(1).startswith("T-"):
            defined_threats.add(match.group(1))

    defined_threats -= retired_ids

    for threat_id in sorted(defined_threats):
        if threat_id not in patch_text:
            result.warn(
                f"docs/governance/Threat_Register.md: {threat_id} has no cross-reference "
                "in Patch_Log.md — every threat should have a corresponding patch"
            )


_BQ_TABLE_LINE_RE = re.compile(r"^>\s*\|")
_TABLE_SEP_RE = re.compile(r"^\|[\s|:=-]+\|$")


def validate_blockquote_table_structure(
    result: ValidationResult, markdown_files: list[Path]
) -> None:
    """SC-6: Blockquote-embedded tables must have a separator row and consistent column counts.

    The reader's markdown parser strips the '> ' prefix and treats remaining '| ... |' lines
    as table rows. A segment that lacks a separator row or has ragged column counts will
    render incorrectly (or previously, as inline text before the parser fix).
    """
    for path in markdown_files:
        text = path.read_text(encoding="utf-8")
        lines = text.splitlines()
        rel = relative(path)

        i = 0
        while i < len(lines):
            if not _BQ_TABLE_LINE_RE.match(lines[i]):
                i += 1
                continue

            segment_start = i + 1  # 1-based for error messages
            raw_rows: list[str] = []
            while i < len(lines) and _BQ_TABLE_LINE_RE.match(lines[i]):
                raw_rows.append(re.sub(r"^>\s*", "", lines[i]))
                i += 1

            if len(raw_rows) < 2:
                continue  # single-line blockquote-table; not a real table

            # Must have at least one separator row.
            if not any(_TABLE_SEP_RE.match(r.strip()) for r in raw_rows):
                result.error(
                    f"{rel}:{segment_start}: blockquote-table missing separator row "
                    "— add '> |---|---|' (or equivalent) after the header row"
                )

            # All rows must have the same column count.
            col_counts = [len(r.strip().strip("|").split("|")) for r in raw_rows]
            if len(set(col_counts)) > 1:
                result.error(
                    f"{rel}:{segment_start}: blockquote-table has inconsistent column counts "
                    f"({', '.join(str(n) for n in col_counts)}) — every row must have the same number of columns"
                )


def main() -> int:
    markdown_files = sorted(iter_markdown_files())
    result = ValidationResult()

    validate_local_links(result, markdown_files)
    validate_annex_index(result)
    definitions = collect_identifier_definitions(result)
    validate_identifier_references(result, markdown_files, definitions)
    validate_deprecated_terms(result, markdown_files)
    validate_placeholders(result, markdown_files)
    validate_annex_opening_blocks(result)
    validate_governance_registration(result)
    validate_duplicate_identifiers(result)
    validate_status_vocab_in_governance_docs(result)
    validate_threat_patch_cross_reference(result)
    validate_blockquote_table_structure(result, markdown_files)

    if result.errors:
        print("Corpus validation failed:\n")
        for message in result.errors:
            print(f"ERROR: {message}")
    else:
        print("Corpus validation passed with no errors.")

    if result.warnings:
        print("\nWarnings:\n")
        for message in result.warnings:
            print(f"WARNING: {message}")

    return 1 if result.errors else 0


if __name__ == "__main__":
    sys.exit(main())
