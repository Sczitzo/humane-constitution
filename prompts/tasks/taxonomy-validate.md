# Task: Taxonomy Validate

You are doing a read-only validation of `docs/annexes/TAXONOMY.md` against the actual annex corpus. Do not modify any files.

## Checks to perform

### 1. Label accuracy

For every row in the TAXONOMY.md decimal map, read the corresponding `docs/annexes/ANNEX_XX.md` file and check that the Title column in TAXONOMY.md matches (or is a close paraphrase of) the actual H1 heading in that file.

Flag any mismatch. Record: decimal code, legacy ID, TAXONOMY.md label, actual H1 title.

### 2. Coverage completeness

List every `docs/annexes/ANNEX_*.md` file. Verify each appears exactly once in TAXONOMY.md. Flag any missing or duplicated entry.

### 3. Count consistency

Count the annexes per Title group in TAXONOMY.md. Verify the count table at the bottom of TAXONOMY.md matches. Flag any discrepancy.

### 4. ANNEX_D instrument note

Verify that ANNEX_D (decimal 4.1) is marked as the Commons Return and Universal Stake instrument in TAXONOMY.md. Flag any active claim that it is the sole demurrage instrument.

### 5. No corpus-registration artifacts

Verify TAXONOMY.md does not reference any P-NNN, T-NNN, or FC-NNN identifiers that would trigger validator failures. (The validator scans all `*.md` files under `docs/annexes/`.)

### 6. Cross-reference notes completeness

For each annex listed in the Cross-reference notes section of TAXONOMY.md, verify: the annex exists on disk; the primary Title assignment matches the decimal map; the secondary relevance note is non-empty.

## Output format

```
## Taxonomy Validation Report

### Label accuracy
[table of mismatches, or "All labels match"]

### Coverage completeness
[missing/duplicated entries, or "Complete"]

### Count consistency
[discrepancies, or "Counts match"]

### ANNEX_D instrument note
[CRUS PRESENT / STALE DEMURRAGE / MISSING]

### Corpus-registration artifacts
[P/T/FC identifiers found, or "None"]

### Cross-reference notes
[issues, or "All consistent"]

### Summary
PASS / HOLD / FAIL

Verdict explanation: [one sentence]
```

Do not modify any files. Stop and report if you encounter ambiguity.
