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
        if "/audits/" not in p and "/superpowers/" not in p and "/review/" not in p
        and not os.path.basename(p).startswith("P-063")]  # draft working docs explore both states

PROPOSED = {"proposed"}
ACTIVE = {"active", "active — unproven", "active-unproven", "active — unproven",
          "partly tested", "evidence-backed", "resolved"}
# longest-first so multi-word terms match before "active"
TERMS = sorted(PROPOSED | ACTIVE, key=len, reverse=True)
ID_RE = re.compile(r"\b([PT]-\d{3})\b")
P_RE = re.compile(r"\bP-\d{3}\b")  # a status almost always describes a PATCH (the mechanism)

# No per-ID exemptions. Every threat and patch is in scope. False positives are
# prevented by accurate detection (below), not by suppressing IDs. The only
# scope limit is the draft-file skip in DOCS (P-063 working drafts).
EXEMPT_IDS: set[str] = set()

def bucket(term: str) -> str | None:
    t = term.lower()
    if t in PROPOSED:
        return "PROPOSED"
    if t in ACTIVE:
        return "ACTIVE"
    return None

TABLE_RE = re.compile(r"^\s*\|")
STATUSLINE_RE = re.compile(r"^\s*(?:[-*]\s*)?\**status\b", re.I)

def _status_spans(line: str):
    """Yield (bucket, start, end, term, is_upper) for each status-term occurrence,
    longest-first and non-overlapping, skipping negated ('not ACTIVE') and
    possessive ("X's PROPOSED") occurrences that assert about something else."""
    low = line.lower()
    claimed = [False] * len(low)
    for term in TERMS:  # longest-first so "active — unproven" wins over "active"
        for m in re.finditer(re.escape(term), low):
            s, e = m.start(), m.end()
            if any(claimed[s:e]):
                continue
            prefix = low[:s]
            if prefix.rstrip().endswith("not"):
                continue
            if prefix.endswith("'s ") or prefix.endswith("’s "):
                continue
            for i in range(s, e):
                claimed[i] = True
            yield bucket(term), s, e, term, (line[s:e] == term.upper())

def line_attributions(line: str) -> dict[str, set]:
    """Map id -> set of status buckets ASSERTED about that id on this line.

    Three attribution contexts, chosen to bind a status to its real subject:
      - table row  -> the id in the FIRST cell owns the row's status
                      (so a "Parent threat" reference column is not mislabelled);
      - Status: line -> the status applies to the id(s) on that declaration line;
      - prose      -> a status counts only if emphasized (**bold**/`code`/[..]) or
                      uppercase shorthand AND within 25 chars of an id.
    Lines showing a progression ("->"/"→") are ignored as history.
    """
    if "->" in line or "→" in line:
        return {}
    ids = [(m.group(1), m.start()) for m in ID_RE.finditer(line)]
    if not ids:
        return {}
    spans = list(_status_spans(line))
    if not spans:
        return {}
    out: dict[str, set] = collections.defaultdict(set)

    if TABLE_RE.match(line):
        # A row's Status describes its SUBJECT = the id in the first cell
        # (threat in a threat/linkage table, patch in the Patch_Log summary).
        # A patch named in a later "Patch" reference column is not the subject.
        cells = line.strip().strip("|").split("|")
        first = ID_RE.search(cells[0]) if cells else None
        if not first:
            return {}
        subj = first.group(1)
        for b, *_ in spans:
            out[subj].add(b)
    elif STATUSLINE_RE.match(line):
        # "Status:" line: the status is the patch's if a patch is named
        # ("Implements P-016 ... Addresses T-002 ... Status: PROPOSED" is P-016's
        # status, not T-002's); otherwise apply to the threat id(s) present.
        pm = P_RE.search(line)
        targets = [pm.group(0)] if pm else [idv for idv, _ in ids]
        for b, *_ in spans:
            for t in targets:
                out[t].add(b)
    else:  # prose
        low = line.lower()
        patch_ids = [(i, p) for i, p in ids if i.startswith("P-")]
        for b, s, e, term, is_upper in spans:
            emphasized = f"**{term}**" in low or f"`{term}`" in low or f"[{term}]" in low
            if not (emphasized or (is_upper and term in ("active", "proposed"))):
                continue
            # Status describes the mechanism: bind to the nearest PATCH within
            # range; only fall back to the nearest id (a threat) if no patch is near.
            def nearest_within(cands):
                best_id, best_d = None, 26
                for idv, ipos in cands:
                    d = min(abs(ipos - s), abs(ipos - e))
                    if d < best_d:
                        best_d, best_id = d, idv
                return best_id
            nearest = nearest_within(patch_ids) or nearest_within(ids)
            if nearest is not None:
                out[nearest].add(b)

    # A single line giving an id BOTH states is a transition/description
    # ("now ACTIVE, formerly PROPOSED") — not a contradiction.
    for idv in list(out):
        if out[idv] >= {"PROPOSED", "ACTIVE"}:
            del out[idv]
    return out

def main() -> int:
    # id -> bucket -> set of "file:lineno"
    seen: dict[str, dict[str, set]] = collections.defaultdict(lambda: collections.defaultdict(set))
    for path in DOCS:
        rel = os.path.relpath(path, ROOT)
        with open(path, encoding="utf-8", errors="replace") as fh:
            for n, line in enumerate(fh, 1):
                for the_id, buckets in line_attributions(line).items():
                    if the_id in EXEMPT_IDS:
                        continue
                    for b in buckets:
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
