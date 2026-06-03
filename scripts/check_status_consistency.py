#!/usr/bin/env python3
"""
check_status_consistency.py — corpus status-drift gate.

Flags any patch (P-NNN) or threat (T-NNN) that is asserted as BOTH "proposed"
and "active-or-later" across the corpus. This is the contradiction class that
undermines the project's credibility ("our own docs disagree on what's proven").

It is deliberately authority-agnostic: it does not decide which file is right,
only that the corpus must not contradict itself on a single ID's deploy-state.

Axis handling (the corpus has three overlapping status vocabularies):
  - deploy-state:        ACTIVE / PROPOSED            (Patch_Log)
  - resolution status:   Proposed / Designed / Active — unproven / Partly tested
                         / Evidence-backed / Resolved (Threat_Register, registers)
  - annex evidence:      Designed / Active — unproven (annex "Evidence status")
We collapse to two buckets for the conflict test:
  PROPOSED_BUCKET = {Proposed, PROPOSED}
  ACTIVE_BUCKET   = {ACTIVE, Active — unproven, Active-unproven, Partly tested,
                     Evidence-backed, Resolved}
"Designed" is intentionally NOT bucketed (it is a maturity rating, not a
deploy-state) so it never triggers a false conflict.

Lines that show a progression/history (containing "->" or "→") are ignored.

Exit 0 = consistent; exit 1 = at least one ID asserted both proposed and active.
"""
from __future__ import annotations
import glob, os, re, sys, collections

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS = [p for p in glob.glob(os.path.join(ROOT, "docs/**/*.md"), recursive=True)
        if "/audits/" not in p and "/superpowers/" not in p and "/review/" not in p]

PROPOSED = {"proposed"}
ACTIVE = {"active", "active — unproven", "active-unproven", "active — unproven",
          "partly tested", "evidence-backed", "resolved"}
# longest-first so multi-word terms match before "active"
TERMS = sorted(PROPOSED | ACTIVE, key=len, reverse=True)
ID_RE = re.compile(r"\b([PT]-\d{3})\b")

# P-063 is a draft-only family, deliberately not registered into the corpus
# (see CLAUDE.md DRAFT_IDENTIFIERS); its own draft naturally discusses both states.
EXEMPT_IDS = {"P-063"}

def bucket(term: str) -> str | None:
    t = term.lower()
    if t in PROPOSED:
        return "PROPOSED"
    if t in ACTIVE:
        return "ACTIVE"
    return None

def statuses_on_line(line: str) -> list[str]:
    low = line.lower()
    out = []
    for term in TERMS:
        if term in low:
            out.append(term)
    return out

def main() -> int:
    # id -> bucket -> set of "file:lineno"
    seen: dict[str, dict[str, set]] = collections.defaultdict(lambda: collections.defaultdict(set))
    for path in DOCS:
        rel = os.path.relpath(path, ROOT)
        with open(path, encoding="utf-8", errors="replace") as fh:
            for n, line in enumerate(fh, 1):
                if "->" in line or "→" in line:
                    continue  # progression/history line
                ids = set(ID_RE.findall(line))
                if not ids:
                    continue
                # Only the FIRST id on a line "owns" a status, to avoid a status
                # meant for one id leaking onto co-listed ids on the same row.
                if len(ids) > 1:
                    # multi-id line (e.g. linkage table row) — skip status attribution
                    continue
                (the_id,) = tuple(ids)
                if the_id in EXEMPT_IDS:
                    continue
                buckets_here = {bucket(t) for t in statuses_on_line(line)}
                buckets_here.discard(None)
                # A line asserting BOTH states is a transition/description
                # ("now ACTIVE, formerly PROPOSED"), not a contradiction — skip it.
                if buckets_here == {"PROPOSED", "ACTIVE"}:
                    continue
                for b in buckets_here:
                    seen[the_id][b].add(f"{rel}:{n}")

    conflicts = {i: v for i, v in seen.items() if "PROPOSED" in v and "ACTIVE" in v}
    if not conflicts:
        print(f"OK — no status conflicts across {len(DOCS)} corpus docs "
              f"({len(seen)} IDs carry a deploy-state).")
        return 0

    print(f"STATUS CONFLICTS: {len(conflicts)} IDs asserted as BOTH proposed and active.\n")
    for i in sorted(conflicts, key=lambda x: (x[0], int(x.split("-")[1]))):
        print(f"  {i}:")
        for b in ("PROPOSED", "ACTIVE"):
            for loc in sorted(conflicts[i][b]):
                print(f"     {b:9} {loc}")
        print()
    print("Each ID above must resolve to a single deploy-state (or the "
          "disagreeing files must reference, not restate, the canonical status).")
    return 1

if __name__ == "__main__":
    sys.exit(main())
