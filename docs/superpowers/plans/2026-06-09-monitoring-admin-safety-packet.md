# Monitoring Administrative Safety Packet Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the operating safety layer that must exist before monitoring streams, flags, dashboards, or raw-access reviews can operate.

**Architecture:** Keep the current Monitoring Repurposing Evidence Test Package as the test harness. Add a companion governance packet that defines pre-operation gates, data-access lanes, flag lifecycle, emergency limits, and evidence artifacts. Register it in the reader and cross-link it from the existing monitoring, dashboard, claims, and hardening documents.

**Tech Stack:** Markdown corpus documents, `scripts/export_corpus.py`, generated reader corpus.

---

### Task 1: Add Governance Packet

**Files:**
- Create: `docs/governance/Monitoring_Administrative_Safety_Packet.md`

- [ ] **Step 1: Draft the packet**

Create a plain-language governance document with:

- status boundary;
- purpose and governing rule;
- pre-operation gate;
- Monitoring Purpose Register schema;
- data lanes;
- flag lifecycle;
- appeal and helper rights;
- emergency use limits;
- dashboard publication limits;
- procurement/vendor controls;
- public-reader promise;
- evidence artifacts;
- Christ-centered dignity test;
- residual risk.

- [ ] **Step 2: Self-review**

Check the document for overclaiming. It must say the packet is designed, not proven.

### Task 2: Patch Existing Monitoring References

**Files:**
- Modify: `docs/governance/Monitoring_Repurposing_Evidence_Test_Package.md`
- Modify: `docs/governance/Capture_Dashboard_Specification.md`
- Modify: `docs/governance/Claims_Evidence_Register.md`
- Modify: `docs/governance/Hardening_Queue.md`

- [ ] **Step 1: Link the new packet from the evidence test package**

Add a companion-document note and make the Monitoring Purpose Register depend on the new packet.

- [ ] **Step 2: Link the dashboard controls**

Require dashboard data lanes, cleared-flag protection, and raw-access limits to follow the new packet.

- [ ] **Step 3: Update evidence and hardening rows**

Add the new packet to the monitoring claim basis and hardening references without strengthening the claim status.

### Task 3: Register In Reader Corpus

**Files:**
- Modify: `scripts/export_corpus.py`

- [ ] **Step 1: Add to `CORE_DOCS`**

Add `docs/governance/Monitoring_Administrative_Safety_Packet.md`.

- [ ] **Step 2: Add to registry section mapping**

Add the same path to the `section_for()` registry set.

- [ ] **Step 3: Feature it near monitoring evidence**

Add it near `Monitoring_Repurposing_Evidence_Test_Package.md` in `featured_paths`.

### Task 4: Regenerate And Verify

**Files:**
- Generated: `app/src/generated/corpus.ts`
- Generated: `app/public/generated/corpus.json`

- [ ] **Step 1: Regenerate corpus**

Run: `cd app && npm run generate:corpus`

- [ ] **Step 2: Validate corpus**

Run: `python3 scripts/validate_corpus.py`

- [ ] **Step 3: Check status consistency**

Run: `python3 scripts/check_status_consistency.py`

- [ ] **Step 4: Build reader app**

Run: `cd app && npm run build`

- [ ] **Step 5: Check generated corpus**

Run: `cd app && npm run check:corpus`

### Task 5: Commit And Push

**Files:**
- All modified files

- [ ] **Step 1: Review diff**

Run: `git diff --check` and inspect changed files.

- [ ] **Step 2: Commit**

Commit with message: `docs: add monitoring administrative safety packet`

- [ ] **Step 3: Push**

Push the commit to the current branch.
