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

# Documented exemptions. Keep this list short and reasoned; revisit on changes.
EXEMPT_IDS = {
    # Draft-only family, deliberately not registered (CLAUDE.md DRAFT_IDENTIFIERS).
    "P-063",
    # Genuine sub-item case: a specific fraud-calibration decision is `Proposed`
    # under threat T-002, whose overall control is `Active — unproven`. Per the
    # Status Model edge-case rule, sub-items carry their own Axis-1 status. The
    # line-level gate cannot separate them; the content is correct.
    "T-002",
    # Queued for a dedicated constitution pass: their conflicting labels live in
    # docs/constitution/Acceptance_Protocol.md (protected) and are Axis-2
    # (founding-ratification) context. Remove from this list once reconciled.
    "P-013", "P-014",
    # P-008 is `Proposed` everywhere it is actually labelled. Its lone "ACTIVE"
    # hit is the prose phrase "not ACTIVE" inside P-014's Patch_Log entry, which
    # references P-008 as a bootstrap candidate. Not a real conflict.
    "P-008",
}

def bucket(term: str) -> str | None:
    t = term.lower()
    if t in PROPOSED:
        return "PROPOSED"
    if t in ACTIVE:
        return "ACTIVE"
    return None

def statuses_on_line(line: str) -> list[str]:
    """Return status terms ASSERTED on the line.

    A bare prose word ("active serving members", "resolved the issue") is not a
    status assertion. A term counts only when it is emphasized or labelled:
      - bold (**term**), backtick (`term`), or bracket ([term]); or
      - the line carries a "Status" label; or
      - it is the uppercase Patch_Log shorthand (ACTIVE / PROPOSED) as a word.
    """
    low = line.lower()
    has_status_label = "status" in low
    out = []
    for term in TERMS:
        if term not in low:
            continue
        emphasized = (
            f"**{term}**" in low or f"`{term}`" in low or f"[{term}]" in low
        )
        upper_shorthand = re.search(rf"\b{re.escape(term.upper())}\b", line) is not None \
            and term in ("active", "proposed")
        if emphasized or has_status_label or upper_shorthand:
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
