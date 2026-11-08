# Baseline Validation Matrix

**Verdict date:** 2026-11-08  
**Purpose:** Reconcile concept claims with public evidence and define their permitted future use.

| ID | Original baseline or assumption | Verdict | Evidence judgment | Required treatment |
| --- | --- | --- | --- | --- |
| B-001 | Late-night and bedtime viewing are common. | Supported | Large adult studies and current Canadian viewing data support material evening and pre-sleep use. | Retain as the contextual problem basis. |
| B-002 | At least 30% of qualified viewers fall asleep while streaming twice per month. | Unresolved | Direct adult paid-streaming incidence was not established. Related student, adolescent, and bedtime-viewing evidence is not equivalent. | Keep as H-001; do not present 30% as a baseline. |
| B-003 | Falling asleep commonly creates lost position, spoilers, or episode progression. | Unresolved | Plausible through autoplay, but no robust public incidence or severity evidence was located. | Keep as the central customer hypothesis requiring authorized primary or behavioural validation. |
| B-004 | 59% of viewing occurs after 7 PM. | Retired as a baseline | Current evidence shows evening concentration but does not reproduce this exact cross-market number. | Replace with sourced time-of-day context; do not reuse 59%. |
| B-005 | The active window is 11 PM–3 AM, 10 PM–4 AM, or 11 PM–2 AM. | Contradicted or overstated | Bedtime context varies; evidence does not support one global window. | Use manual activation and personal preference. |
| B-006 | A manual sleep timer addresses a recognized use case. | Supported | YouTube and Apple TV offer sleep timers; Netflix reportedly tested one in 2021. | Retain timer controls, but do not claim they are unique. |
| B-007 | Existing timers do not preserve a viewer's true stopping point. | Partially supported | Official timer patterns stop after a duration; public documentation does not establish a recovery workflow equivalent to the concept. | Differentiate through checkpoint and recovery; validate actual value later. |
| B-008 | A recovery card will reduce searching and rewind/fast-forward effort. | Unresolved | No public causal evidence located. | Retain as the primary usability hypothesis and candidate north-star outcome. |
| B-009 | 85% recovery success, or +20%/+22% improvement, has been achieved. | Retired as a baseline | Values are concept targets with no completed test. | Define one future task-success target and a separate experimental lift measure. |
| B-010 | Dimming improves comfort during late-night viewing. | Partially supported | Lower evening light is biologically plausible, but product-specific comfort and accessibility are untested. | Retain as optional pilot treatment; test readability, control, and preference. |
| B-011 | True-black dimming eliminates blue light and protects circadian rhythm. | Contradicted or overstated | Display output, ambient light, timing, and individual response vary; clinical evidence does not support this absolute claim. | Replace with non-clinical comfort language. |
| B-012 | Low-pass audio or a 3 Hz binaural layer prevents awakening or promotes deep sleep. | Contradicted or overstated | Evidence is mixed, small, and not specific to this intervention; no basis for the exact claim was found. | Remove from pilot and retire therapeutic copy. |
| B-013 | Wearables can provide reliable real-time N1/N2 triggers for playback control. | Contradicted or overstated | Public platform models and APIs do not establish this low-latency signal; privacy and background constraints apply. | Move to a later technical spike; use no N1/N2 promise. |
| B-014 | Minimal sleep-state tokens can reduce privacy concern. | Partially supported | Data minimization is a sound privacy principle, but user willingness and partner data paths are untested. | Retain as a design principle, not a validated adoption benefit. |
| B-015 | Up to 25% of 11 PM–3 AM bandwidth is non-interactive or unattended. | Retired as a baseline | No public Netflix evidence was located for the percentage, time window, or definition. | Use no percentage; define and measure unattended-playback criteria in a future experiment. |
| B-016 | The feature will reduce bandwidth by 12%. | Retired as a baseline | No telemetry, adoption, or counterfactual model supports the number. | Use avoided stream-minutes and GB only after measurement; 12% may appear only as a labelled stress-test scenario. |
| B-017 | Reduced unattended playback creates economic benefit. | Partially supported | Physical delivery volume would decline, but material marginal cost depends on confidential architecture economics. | Retain as a plausible margin pathway; financial value remains a scenario. |
| B-018 | Premium conversion will be 1.5%, 1.8%, or 8%. | Retired as a baseline | No pricing or conversion experiment supports any of the conflicting values. | Use zero Premium lift in the conservative case. |
| B-019 | The product will improve retention. | Unresolved | No public causal evidence links these features to churn reduction. | Use zero retention lift in the conservative case; test later if authorized. |
| B-020 | A five- or fifteen-second co-viewer warning is sufficient. | Unresolved | Conflicting concept values and no comprehension test. | Define as a design variable; immediate remote/controller input must cancel. |
| B-021 | The product is UAT complete or deployment ready. | Rejected | It is a concept and interactive prototype. | Continue to label it as a portfolio product case. |
| B-022 | Manual controls and recovery can test the core value without wearables. | Supported as product logic | Competitor patterns and platform constraints make a manual, privacy-light pilot the most defensible first release. | Adopt as the pilot architecture. |

## Hypothesis status changes

| Hypothesis | Phase 1 status | Phase 2 status | Rationale |
| --- | --- | --- | --- |
| H-001 bedtime fall-asleep incidence | U | P | Bedtime viewing is supported; target incidence is not. |
| H-003 light/audio as secondary problem | U | P | Light context has partial support; exact product value and audio claims remain untested. |
| H-004 alternative timer inadequacy | U | P | Timers exist; recovery differentiation remains plausible but unvalidated. |
| H-010 fixed-window exclusion | U | P | Evidence supports variation and argues against a global fixed window. |
| H-011 manual pilot sufficiency | U | P | Stronger after competitor and platform review. |
| H-012 wearable demand | U | U | No user-demand evidence. |
| H-013 wearable privacy proposition | U | P | Data minimization is defensible; acceptance is unmeasured. |
| H-016 unattended playback reduction | U | U | Mechanism plausible; baseline and effect unmeasured. |
| H-019 advanced audio value | U | R | Evidence does not justify pilot complexity or wellness claims. |
| All desirability, usability, retention, conversion, and cost hypotheses | U | U | Secondary evidence cannot validate product-specific outcomes. |

## Evidence-integrity rule

“Partially supported” means the research supports a direction or design choice. It does not mean the product has been validated with Netflix customers or has produced a measured result.

