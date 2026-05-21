Append a formal Session 7 section to docs/governance/Christ_Centered_Evaluation.md covering:

- ANNEX AW — Whistleblower Protection and Anti-Retaliation Protocol
- ANNEX AX — Confidential Enrollment and Safety-Identity Protocol
- ANNEX AY — Delivery Sufficiency Standard and Register

## Format requirements

Use the Session 6 inline-bold format throughout — not separate ### subheadings. Each mechanism gets:

- **Christ-centered alignment.**
- **Babel-risk warning.**
- **Human-dignity test.**
- **Revision proposal.**
- **Fruit test.**
- **Epistemic categorization:** with the four tiers (clear biblical command / theological inference / prudential political judgment / unresolved uncertainty)

## Content requirements

Use the Session 7 diagnostic findings already produced (reports/christ-centered-session7-review_*.md). Do not re-derive from scratch — use the existing verdicts, risk rankings, and should-fix items. Consolidate and formalize.

### Crosswalk items (follow Session 5 follow-up precedent)

Include a crosswalk subsection that records:

(a) AY's population-level Register partially but not fully addresses the Session 5 AED narrative-accountability gap (item 1 from Session 6 follow-up list). The Register tracks delivery gaps at population level; it does not provide the individual-case narrative-report obligation that Session 5 requested. Both are needed. Status: partially addressed, open remainder.

(b) AX immigration enforcement exclusion (AX3.2): flagged as should-fix. The Federated Ombuds notification + amicus-review pathway for any court order seeking sealed records is the proposed check. Without it, the sealed-record protection may not hold in politically hostile jurisdictions.

(c) AY trusted-intermediary designation: flagged as should-fix. AY3.2 requires delivery through intermediaries "trusted by those communities" but does not specify the consent mechanism. Who determines trustedness? The community must have a voice in the designation.

### Session 7 Net Assessment

Follow the Session 6 pattern:
- Where AW/AX/AY are most consistent with the teachings of Jesus
- Where they carry the most Babel-risk
- Net assessment paragraph
- Follow-up items for a future Session 8 (numbered list)

## Closing section

Append to "Files consulted" at the bottom:

- docs/annexes/ANNEX_AW.md
- docs/annexes/ANNEX_AX.md
- docs/annexes/ANNEX_AY.md
- reports/christ-centered-session7-review_*.md (Session 7 diagnostic)

Update "Not consulted" if any new items should be added.

## Governing sentence to preserve

Do not modify the governing sentence at the top of the file:
"The Humane Constitution must serve humanity under God; it must never become humanity's substitute for God."

## After appending

Run: npm run generate:corpus
Then run: python3 scripts/validate_corpus.py

Report: exact line range appended, corpus generation exit code, validator exit code.
