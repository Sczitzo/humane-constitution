# ANNEX B. Threat Register (Option B Baseline)
Scoring uses Impact (I), Likelihood (L), Detectability (D). Risk Score = I × L × (6 − D). Owners are accountable for test coverage and response playbooks.

| ID | Threat scenario (area) | I/L/D & score | Key controls | Tests/monitoring | Owner (residual) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TR-01 | LC coercion via caregiver/household channels (P1/P3/P4) | 5/4/3 = 60 | Delegation-first; transfer caps; anomaly detection; targeted enforcement; dependent protections | Coercion-pattern sims; precision/recall; time-to-intervention drills | P8 + LC/Identity (Med) |
| TR-02 | Essentials hoarding + barter markets during scarcity (P1) | 4/4/3 = 48 | Scarcity-mode caps; storage/carrying costs; strategic reserves; supplier monitoring | Cap compliance tests; reserve release drills; market surveillance | P1 + P8 (Med) |
| TR-03 | Scarcity/oracle manipulation (supplier cartel, data gaming) (P7) | 5/3/2 = 60 | Polycentric quorum; independent audits; conservative issuance during disputes; penalties | Adversarial data injection; quorum failure drills; audit integrity tests | P7 + P8 (Med) |
| TR-04 | Demurrage evasion via rent extraction / asset parking (Housing) (P2) | 5/3/3 = 45 | Use-rights/leases; anti-vacancy carrying costs; anti-rent-seeking enforcement; competition policy | Vacancy audits; concentration monitoring; enforcement non-collateral tests | P2 + P8 (Med) |
| TR-05 | Bribery-by-proxy: buying verification or ‘paid contribution’ (P4) | 4/3/2 = 48 | Non-transferability; verifier staking/penalties; COI rules; whistleblower protections | Random audits; collusion-graph detection; COI enforcement checks | P4 + P8 (Med) |
| TR-06 | CC civic-elite capture (professional contributors dominate) (P4/P8) | 4/3/4 = 24 | Half-life; per-cycle cap; diminishing returns; randomized agenda slots; rotation | Agenda diversity sims; long-horizon influence distribution; cap enforcement | P8 (Low-Med) |
| TR-07 | Contribution fraud / attestation rings (P4) | 4/4/3 = 48 | Multi-attestation; random audits; anomaly detection; reputation decay; sanctions | Audit sampling power analysis; ring detection benchmarks; sanctions timeline metrics | P4 (Med) |
| TR-08 | Verifier capture/corruption (P8 oversight) | 5/2/2 = 40 | Separation of duties; rotating verifiers; staking + slashing; external audits | Red-team bribery drills; audit independence checks; rotation compliance | P8 + Oversight (Low-Med) |
| TR-09 | Smart-contract bug/exploit causes lockout or drain (P6) | 5/3/3 = 45 | Staged execution; formal verification; rate limits; narrow emergency pause; restitution | Fuzzing; exploit rehearsal; pause/restore drills; restitution SLA | P6 + P8 (Med) |
| TR-10 | Emergency pause abused to centralize control (P8) | 5/2/3 = 30 | Narrow scope; time limits; multi-sig; mandatory post-mortem; independent review | Simulated abuse scenarios; pause audit trails; restoration integrity tests | P8 + Judiciary (Low-Med) |
| TR-11 | Sybil identities harvest LC/CC at scale (P3) | 5/3/2 = 60 | Proof-of-personhood; periodic re-verification; fraud analytics; accessible recovery | Sybil-resistance benchmarks; false-rejection audits; accessibility reviews | P3 (Med) |
| TR-12 | Account takeover / identity theft (P3/P6) | 4/3/3 = 36 | Risk scoring; recovery protocols; optional hardware/biometrics; partitioned escrows | Pen tests; recovery-path drills; takeover response-time metrics | P3 + P6 (Low-Med) |
| TR-13 | Demographic resource extraction via housing (P6/P2) | 4/3/3 = 36 | Per-person floor + hard household cap; composition verification period before space expansion; births/medical emergencies exempt from delay; needs-neutral review for accessibility/caregiving exceptions | Composition-change audit trail; space-expansion trigger monitoring; verification-lag compliance tests; anomaly detection on rapid household growth correlated with allocation increases | P6 + P2 (Low-Med) |

---
