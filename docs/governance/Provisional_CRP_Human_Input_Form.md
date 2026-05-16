# Provisional CRP Human Input Form

---

## Status

INPUT FORM -- NOT EXECUTED.

This form has not been completed. No draw has been run. No members have been appointed. No governance action has occurred. All fields are placeholders until filled in by a human operator with real data.

---

## Instructions

This form collects the real-world inputs required before any provisional CRP draw, roster certification, or provisional CRP action can proceed. It corresponds to the "Required Inputs Before Execution" section of docs/governance/Provisional_CRP_Draw_and_Roster_Certification_Packet.md.

Complete every section with real data. Do not fill fields with invented names, invented seeds, or placeholder values disguised as real data. Every entry must be verifiable by the independent external observer panel.

When all sections are complete and the Completion Checklist at the bottom is marked ready, the founding steward may proceed to execute the draw packet (Step 1 onward in the draw packet).

ANNEX_U Section U2 reminder: No provisional CRP action takes effect until the challenge window closes and at least one independent external observer panel attests that basic process rules were followed. Completing this form satisfies the pre-draw input requirements only; it does not satisfy the challenge window or observer attestation requirements.

---

## Eligibility Pool

List every candidate considered for the provisional CRP eligibility pool. One row per candidate. Include both eligible and excluded candidates. Conflict screening and founding-exclusion check must be complete before the draw.

Exclusion categories (per ANNEX_U Section U2 and OQ-PCRP-3): current senior decision-makers directly administering the transition; controlling beneficial owners; paid chief advocates of legacy banks, major landlord blocs, dominant essential-goods vendors, central ministries directly administering the transition; entities above published market-share conflict thresholds; persons with direct conflicts related to sub-Ombuds confirmation, FC-YT1/FC-YT2 review, Tier 0 token mechanism assignment, or launch-gate clearance.

| Candidate identifier | Eligibility basis | Verification source | Conflict screening complete | Excluded | Reason for exclusion (if any) | Notes |
|---|---|---|---|---|---|---|
| [ID] | [Founding participant / Qualified external reviewer] | [NAME OR BODY WHO VERIFIED] | Yes / No | Yes / No | [EXCLUSION CATEGORY OR BLANK] | |
| [ID] | | | Yes / No | Yes / No | | |
| [ID] | | | Yes / No | Yes / No | | |
| [ID] | | | Yes / No | Yes / No | | |
| [ID] | | | Yes / No | Yes / No | | |

Total eligible (post-screening): [NUMBER]
Total excluded: [NUMBER]
Screening completed by: [NAME, ROLE]
Screening completion date: [DATE]

Large legacy creditor / landlord / essential-goods vendor disclosure (per ANNEX_N N3): If any candidate in the pool is affiliated with a large legacy creditor, dominant landlord, or major essential-goods vendor, heightened conflict disclosure is required and must be published separately. [ATTACH OR REFERENCE HEIGHTENED DISCLOSURES, OR STATE "NONE"]

---

## External Observer Panel

List every member of the independent external observer panel. Minimum 3 members required (OQ-PCRP-7). All observers must be external to the founding steward, the provisional CRP candidate pool, the sub-Ombuds candidate pool, and any vendor or governance actor under immediate review.

| Observer identifier | Independence basis | Conflict disclosure complete | Relationship to founding steward | Relationship to candidate pool | Relationship to sub-Ombuds candidate pool | Relationship to vendors / reviewed actors | Notes |
|---|---|---|---|---|---|---|---|
| [NAME / ID] | [BASIS] | Yes / No | [NONE / DESCRIBE] | [NONE / DESCRIBE] | [NONE / DESCRIBE] | [NONE / DESCRIBE] | |
| [NAME / ID] | | Yes / No | | | | | |
| [NAME / ID] | | Yes / No | | | | | |

Total panel members: [NUMBER -- minimum 3]
Independence screening completed by: [NAME, ROLE]
Independence screening date: [DATE]

Observer panel appointment record to be published at: docs/governance/Provisional_CRP_ObserverPanel_[YYYY-MM-DD].md

---

## Public Seed Source

The seed and method must be published before the draw runs. Any person must be able to reproduce the draw output from the published seed, ordered input pool, and method.

Seed source: [DESCRIPTION -- e.g., specific block hash source, public random beacon name and URL, other verifiable public entropy source]

Seed timestamp: [DATE AND TIME AT WHICH SEED VALUE IS CAPTURED -- must be after observer panel is published and before draw runs]

Seed capture method: [HOW THE SEED VALUE IS EXTRACTED FROM THE SOURCE -- e.g., block hash of block number N at height H; beacon output at epoch E]

Who records the seed: [NAME, ROLE -- must be verifiable by observers]

Where the seed value is published: docs/governance/Provisional_CRP_SeedAndMethod_[YYYY-MM-DD].md

Seed value (to be filled at time of capture): [DO NOT FILL UNTIL CAPTURE DATE]

---

## Draw Method

The draw method must be documented in sufficient detail that any person with the seed and ordered input pool can reproduce the output independently.

Draw method name or description: [e.g., "SHA-256 ranking sort" or other]

Method: [STEP-BY-STEP DESCRIPTION -- example: for each candidate in the published ordered input pool, compute SHA-256(seed_value + candidate_id); sort candidates by hash value ascending; seats 1-5 are the top 5 candidates in sorted order; alternates are the next candidates in order]

Script or method reference: [FILE PATH OR EXTERNAL REFERENCE IF A SCRIPT IS USED -- script must be published before draw runs; if no script, state "manual procedure per method description above"]

Input list hash method: [ALGORITHM USED TO HASH THE ORDERED INPUT LIST -- e.g., SHA-256 of newline-separated candidate IDs in published order]

Output verification method: [HOW AN INDEPENDENT PERSON VERIFIES THE DRAW OUTPUT -- must be reproducible without access to any private data]

Observer attestation method: [HOW OBSERVERS CONFIRM THE DRAW WAS CONDUCTED AS DESCRIBED -- e.g., observers run the same computation independently and compare output; observers are present when founding steward runs the method]

---

## Sponsor List

List every individual and entity that sponsored, initiated, or directed the provisional CRP constitution process. Required by ANNEX_U Section U2 before any provisional ruling takes effect.

| Sponsor identifier | Role | Reason for sponsorship | Conflict disclosure complete | Notes |
|---|---|---|---|---|
| [NAME / ID] | [ROLE] | [REASON] | Yes / No | |
| [NAME / ID] | | | Yes / No | |

Sponsor list publication location: docs/governance/Provisional_CRP_SponsorList_[YYYY-MM-DD].md
Must be published before any provisional CRP action takes effect (ANNEX_U Section U2).

---

## Written Reasons for Provisional CRP Constitution

Required by ANNEX_N Section N3 and ANNEX_U Section U2. Must be published before any provisional CRP action takes effect.

Reason 1: [STATE THE FIRST REASON the provisional CRP is being constituted at this time -- e.g., sub-Ombuds confirmation is required before the Federated Ombuds can be constituted, and the full 11-member sortition-based CRP has not been proven constituted]

Reason 2: [STATE THE SECOND REASON -- e.g., OQ-CRP-1 adopted interpretation at docs/governance/OQ_CRP_1_Adopted_Interpretation.md authorizes the provisional CRP for this limited purpose]

Reason 3: [STATE ANY ADDITIONAL REASON -- e.g., bootstrap deadlock analysis documented in docs/governance/CRP_Bootstrap_Status_Packet.md]

Additional reasons: [IF ANY]

Source references:
- docs/governance/OQ_CRP_1_Adopted_Interpretation.md
- docs/governance/CRP_Bootstrap_Status_Packet.md
- docs/governance/Provisional_CRP_Constitution_Packet.md
- ANNEX_N.md Section N2, AA1
- ANNEX_U.md Section U2
- [ADD ANY ADDITIONAL SOURCES]

Written reasons publication location: docs/governance/Provisional_CRP_WrittenReasons_[YYYY-MM-DD].md
Must be published before any provisional CRP action takes effect (ANNEX_U Section U2).

---

## Minority Views

Required by ANNEX_U Section U2. If any person involved in the provisional CRP constitution decision holds a dissenting view, that view must be published. If no dissenting views are submitted, a "none filed" declaration must be published.

Were minority views submitted? Yes / No

If yes, summarize or attach each view:

View 1:
  Submitted by: [IDENTIFIER]
  Summary: [TEXT]
  Full text location: [FILE PATH OR REFERENCE]

View 2: [repeat if needed]

If no: [STATE "No minority views were submitted as of [DATE]."]

Minority views publication location: docs/governance/Provisional_CRP_MinorityViews_[YYYY-MM-DD].md (or "none filed" declaration in same file)
Must be published before any provisional CRP action takes effect (ANNEX_U Section U2).

---

## Completion Checklist

Human operators mark each item when real data is entered and verified. Do not mark any item complete if the corresponding field above contains placeholder text.

Pre-draw inputs:
- [ ] Eligibility pool completed -- all candidates listed, conflict screening complete for each
- [ ] Conflict screening completed -- exclusion determinations made and documented for all candidates
- [ ] Observer panel completed -- minimum 3 members identified, independence screening complete for each
- [ ] Seed source selected -- verifiable public entropy source identified and documented
- [ ] Draw method documented -- method is reproducible from published inputs alone
- [ ] Sponsor list completed -- all sponsors listed with conflict disclosures
- [ ] Written reasons completed -- at least two substantive reasons documented with source references
- [ ] Minority views collected or marked "none filed"

ANNEX_U Section U2 pre-effect publications (must be published, not just completed in this form):
- [ ] Sponsor list published at docs/governance/
- [ ] Written reasons published at docs/governance/
- [ ] Minority views published (or "none filed" declaration) at docs/governance/
- [ ] Challenge path notice published at docs/governance/
- [ ] Sunset date declared and published at docs/governance/
- [ ] Observer panel appointment record published at docs/governance/

Ready for execution packet: Yes / No

If Yes: proceed to Step 1 of docs/governance/Provisional_CRP_Draw_and_Roster_Certification_Packet.md.
If No: do not proceed. Complete all missing items above first.

---

*This form is a collection template only. No constitutional source text was modified. No generated files were modified. No governance action is claimed.*
