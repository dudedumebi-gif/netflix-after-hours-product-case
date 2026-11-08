# Phase 3 Prototype Evidence and Feasibility Charter

**Status:** In progress  
**Gate authorization:** Gate 2 approved on 2026-11-08  
**Project posture:** Independent portfolio product case; no Netflix affiliation or customer validation implied

## Objective

Convert the broad concept into an evidence-aligned, testable pilot and determine whether its proposed interaction and checkpoint design have any critical usability, accessibility, privacy, or technical-feasibility blocker.

## Pilot promise

> Help a late-night viewer stop intentionally, preserve a transparent checkpoint, and choose where to resume next time.

## In scope

1. Manual 15-, 30-, and 45-minute timers;
2. End-of-episode stopping;
3. Countdown and immediate cancellation;
4. Optional gradual dimming as a comfort preference;
5. Local checkpoint creation;
6. Next-session choice between the timer checkpoint and standard playback position;
7. Expert heuristic and accessibility review;
8. Checkpoint persistence and failure-mode analysis;
9. Synthetic event and experiment measurement design.

## Out of scope

- Wearable sleep-stage detection;
- health-data access;
- binaural beats or advanced DSP;
- claims that the experience improves sleep;
- fixed global late-night activation;
- Premium upsell;
- measured retention, conversion, savings, UAT, or deployment claims;
- public recruitment represented as Netflix research.

## Workstreams

| Workstream | Deliverable | Completion evidence |
| --- | --- | --- |
| Prototype alignment | Revised interactive prototype | Rejected claims removed; pilot paths functional |
| Heuristic review | Issue register with severity and recommendation | All critical/high findings dispositioned |
| Accessibility review | WCAG-oriented assessment | Keyboard, focus, contrast, labels, motion, and readability evaluated |
| Checkpoint feasibility | State model and technical spike | Persistence, profile isolation, expiry, conflict, and recovery cases defined |
| Measurement design | Event dictionary and synthetic analysis | Metrics computable without presenting simulation as customer data |

## Evidence labels

Every Phase 3 output must use one or more of these labels:

- **Secondary evidence:** Published or official external evidence;
- **Expert finding:** Structured review judgment;
- **Technical finding:** Observed prototype or spike behaviour;
- **Simulated result:** Output from synthetic data;
- **Hypothesis:** Unvalidated expected customer or business outcome.

Only authorized primary research or real telemetry may be labelled customer evidence.

## Gate 3 entry criteria

Gate 3 review may begin when:

1. The pilot prototype contains no unsupported health or financial claim;
2. Timer, cancellation, controlled stop, checkpoint, and both resume choices are represented;
3. No unresolved critical accessibility or heuristic issue remains;
4. Checkpoint persistence and failure behaviour are specified;
5. The metric dictionary distinguishes observed, synthetic, and hypothetical values;
6. Known limitations are visible in the project record.

## Gate 3 decision

Gate 3 will determine whether the proposed pilot experience and implementation have a critical usability, privacy, accessibility, or feasibility blocker. It will not certify production readiness or UAT completion.

