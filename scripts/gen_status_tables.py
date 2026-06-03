#!/usr/bin/env python3
"""
gen_status_tables.py — regenerate derived linkage-table Status columns.

Several annexes carry a "Threat / Patch Linkage" table whose **Status** column
restates the THREAT's resolution status (the row's subject is the threat in the
first column; the patch column is a reference). Those copies drift from the
authority — the Threat Register's threat table.

This generator makes those Status cells *derived*: it reads each threat's status
from the Threat Register and rewrites every annex linkage row's Status to match
(collapsed to the ACTIVE / PROPOSED shorthand those tables use). The Threat ID,
Patch ID, and Annex columns are preserved — only Status is generated.

It does NOT touch the authority tables (Threat Register, Patch Log).

Usage:
  python3 scripts/gen_status_tables.py            # check: exit 1 on drift
  python3 scripts/gen_status_tables.py --write     # rewrite derived Status cells
"""
from __future__ import annotations
import glob, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
THREAT_REGISTER = os.path.join(ROOT, "docs/governance/Threat_Register.md")

def target_files() -> list[str]:
    """All annexes plus Patch_Log. Only rows whose FIRST cell is a threat id are
    rewritten (the threat-keyed coverage tables); Patch_Log's patch-keyed summary
    table — first cell P-NNN — is left untouched, since it is the patch authority."""
    return sorted(glob.glob(os.path.join(ROOT, "docs/annexes/*.md"))) + \
        [os.path.join(ROOT, "docs/governance/Patch_Log.md")]

TID_RE = re.compile(r"\bT-\d{3}\b")
PROPOSED_WORDS = {"proposed"}
# everything at or beyond incorporation collapses to the ACTIVE shorthand
ACTIVE_WORDS = {"active", "active — unproven", "active-unproven",
                "partly tested", "evidence-backed", "resolved"}


def threat_bucket(status_text: str) -> str | None:
    s = status_text.replace("*", "").strip().lower()
    if s in PROPOSED_WORDS:
        return "PROPOSED"
    for w in ACTIVE_WORDS:
        if w in s:
            return "ACTIVE"
    return None  # e.g. "Designed" — not an ACTIVE/PROPOSED shorthand; leave as-is


def load_threat_status() -> dict[str, str]:
    """T-NNN -> 'ACTIVE'|'PROPOSED', from the Threat Register detail table
    (the table whose header has a Status column and a Patch column)."""
    out: dict[str, str] = {}
    in_table = False
    status_col = None
    with open(THREAT_REGISTER, encoding="utf-8") as fh:
        for line in fh:
            if not line.lstrip().startswith("|"):
                in_table = False
                continue
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            low = [c.lower() for c in cells]
            if not in_table:
                if "status" in low and any("patch" in c for c in low) and \
                   any(c in ("id", "threat", "threat id") or "threat" in c for c in low):
                    in_table = True
                    status_col = low.index("status")
                continue
            if cells and (cells[0].startswith(":---") or set(cells[0]) <= {"-", ":"}):
                continue
            m = TID_RE.search(cells[0])
            if not m or status_col is None or len(cells) <= status_col:
                continue
            b = threat_bucket(cells[status_col])
            if b:
                out.setdefault(m.group(0), b)  # first (detail) table wins
    return out


def is_linkage_header(cells: list[str]) -> bool:
    low = [c.lower() for c in cells]
    return any("threat" in c for c in low) and any("patch" in c for c in low) \
        and any("status" in c for c in low)


def process_file(path: str, threat_status: dict[str, str], write: bool) -> list[str]:
    with open(path, encoding="utf-8") as fh:
        lines = fh.readlines()
    rel = os.path.relpath(path, ROOT)
    drifts: list[str] = []
    in_table = False
    status_col = None
    changed = False
    for i, line in enumerate(lines):
        if not line.lstrip().startswith("|"):
            in_table = False
            continue
        cells = [c.strip() for c in line.rstrip("\n").strip().strip("|").split("|")]
        if not in_table:
            if is_linkage_header(cells):
                in_table = True
                status_col = [c.lower() for c in cells].index(
                    next(c.lower() for c in cells if "status" in c.lower()))
            continue
        if cells and (cells[0].startswith(":---") or set(cells[0]) <= {"-", ":"}):
            continue
        m = TID_RE.search(cells[0])  # subject = threat in first cell
        if not m or status_col is None or len(cells) <= status_col:
            continue
        want = threat_status.get(m.group(0))
        if not want:
            continue
        have = cells[status_col].replace("*", "").strip().upper()
        if have != want:
            drifts.append(f"{rel}:{i+1}  {m.group(0)}  {have or '(empty)'} -> {want}")
            if write:
                cells[status_col] = want
                lines[i] = "| " + " | ".join(cells) + " |\n"
                changed = True
    if write and changed:
        with open(path, "w", encoding="utf-8") as fh:
            fh.writelines(lines)
    return drifts


def main() -> int:
    write = "--write" in sys.argv
    threat_status = load_threat_status()
    if not threat_status:
        print("ERROR: could not parse Threat Register status table", file=sys.stderr)
        return 2
    drifts: list[str] = []
    for path in target_files():
        drifts += process_file(path, threat_status, write)
    if not drifts:
        print(f"OK — annex linkage Status columns match the Threat Register "
              f"({len(threat_status)} threats).")
        return 0
    verb = "Rewrote" if write else "DRIFT —"
    print(f"{verb} {len(drifts)} annex linkage Status cell(s) vs Threat Register:")
    for d in drifts:
        print(f"  {d}")
    if write:
        return 0
    print("\nRun `python3 scripts/gen_status_tables.py --write` to regenerate.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
