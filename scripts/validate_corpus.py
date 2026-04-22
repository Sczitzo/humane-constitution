#!/usr/bin/env python3
"""Validate the Humane Constitution corpus.

Checks:
1. Local markdown links resolve.
2. Markdown heading anchors resolve for local markdown links with fragments.
3. The annex index covers every annex file in docs/annexes/.
4. FC/T/P identifier references resolve against their authoritative registries.
5. Deprecated naming/history terms do not appear in live documents.
6. Unresolved founding placeholders are surfaced as warnings.
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
    Path("Acceptance_Protocol.md"),
    Path("CONTRIBUTING.md"),
    Path("Patch_Log.md"),
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

LINK_RE = re.compile(r"(?<!!)\[[^\]]+\]\(([^)]+)\)")
HEADING_RE = re.compile(r"^(#{1,6})\s+(.+?)\s*$", re.MULTILINE)
LOCAL_ID_RE = re.compile(r"\b(?:FC|T|P)-\d{3}\b")
PLACEHOLDER_RE = re.compile(r"\[FOUNDING COMMITMENT[^\]]*\]")
FC_DEF_RE = re.compile(r"\*\*(FC-\d{3})\*\*")
T_DEF_RE = re.compile(r"^###\s+(.+)$", re.MULTILINE)
P_DEF_RE = re.compile(r"^###\s+(.+)$", re.MULTILINE)
TABLE_ID_RE = re.compile(r"^\|\s*((?:FC|T|P)-\d{3})\s*\|")


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
        "T": parse_heading_ids(ROOT / "Threat_Register.md", "T")
        | parse_table_ids(ROOT / "Threat_Register.md", "T"),
        "P": parse_heading_ids(ROOT / "Patch_Log.md", "P")
        | parse_table_ids(ROOT / "Patch_Log.md", "P"),
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


def main() -> int:
    markdown_files = sorted(iter_markdown_files())
    result = ValidationResult()

    validate_local_links(result, markdown_files)
    validate_annex_index(result)
    definitions = collect_identifier_definitions(result)
    validate_identifier_references(result, markdown_files, definitions)
    validate_deprecated_terms(result, markdown_files)
    validate_placeholders(result, markdown_files)

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
