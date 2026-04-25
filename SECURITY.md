# Security Policy

## Scope

This repository contains a constitutional systems design and a reader application. "Security" in this context primarily means **design vulnerabilities** — mechanisms that a motivated bad actor could exploit to undermine the protocol's core protections (instrument separation, survival access, governance integrity) — plus ordinary software vulnerabilities in the reader app or tooling.

## Reporting a design vulnerability

If you identify a critical design flaw that:

- Could be weaponized before a public patch is issued
- Affects the non-negotiable invariants (dignity, due process, non-coercion, instrument separation)
- Represents a novel exploit surface not already documented in the Threat Register

Please report it privately before opening a public issue.

**Contact:** Open a [private security advisory](https://github.com/Sczitzo/humane-constitution/security/advisories/new) via GitHub's built-in reporting tool.

Include:
- The specific clause, annex, or mechanism affected
- The exploit mechanism — how a bad actor would use this
- The conditions required for the exploit to succeed
- Your proposed mitigation direction, if any

## Response commitment

- Acknowledgement within 7 days
- Assessment and triage within 30 days
- If confirmed critical: a patch proposal will be drafted and added to the Threat Register before public disclosure

## Out of scope

- Philosophical objections to the protocol's goals
- Disagreements with design trade-offs already documented in the Patch Log
- Threats already listed in the Threat Register with an ACTIVE or PROPOSED patch

For those, open a standard Issue.
