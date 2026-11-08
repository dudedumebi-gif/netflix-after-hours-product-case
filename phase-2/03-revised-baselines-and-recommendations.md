# Revised Baselines and Product Recommendations

**Phase 2 recommendation:** Continue the portfolio case, narrow the pilot, and rebuild the business case as an experiment-backed scenario rather than a forecast.

## Revised evidence baseline

The case may now state:

1. Watching video near bedtime is common across adult populations.
2. Streaming and binge viewing can conflict with intended bedtime, although the relationship with sleep outcomes is contextual and mostly associative.
3. Sleep timers, bedtime reminders, autoplay controls, and device sleep timers are established patterns.
4. A timer by itself is not sufficiently differentiated.
5. A checkpoint-and-recovery experience is a plausible differentiation, but its incidence, desirability, and usability are not yet validated.
6. Wearable automation, advanced audio, retention lift, Premium conversion, and Netflix-specific delivery savings remain unvalidated.

## Recommended first viable release

### Include

- User-invoked 15-, 30-, and 45-minute timers;
- End-of-episode stop;
- Clear pre-stop countdown;
- Immediate cancellation through ordinary controller or touch input;
- Local checkpoint captured before the transition;
- Next-session recovery card showing what will resume and why;
- Explicit “continue from Netflix position” and “resume from checkpoint” choices;
- Accessibility-safe visual treatment;
- Instrumentation specification for activation, cancellation, stop, resume, and correction events.

### Conditional

- Gradual dimming, only as a comfort preference and only after readability/accessibility review;
- Remembered personal timer preference, with easy opt-out;
- Cross-device checkpoint synchronization after a separate privacy and architecture review.

### Exclude from the pilot

- Wearable sleep-stage triggers;
- Claims based on N1/N2 detection;
- Binaural beats and deep-sleep claims;
- Low-pass audio presented as a sleep intervention;
- Premium upsell;
- Fixed global 11 PM–3 AM activation;
- Ad-deferral promises;
- Financial claims based on 25% unattended traffic or 12% bandwidth reduction.

## Revised value proposition

**Viewer value:** Stop intentionally, avoid losing the real stopping point, and resume with confidence.

**Business mechanism:** If the feature is adopted and reduces genuinely unattended playback without interrupting intended viewing, it may improve viewer trust and reduce avoidable delivery volume. Retention, conversion, and monetary savings remain later experiment questions.

## Revised metric hierarchy

### North-star candidate

**Successful recovery rate**  
Percentage of affected sessions in which the viewer resumes the intended content position without manual episode search, rewind, or fast-forward beyond a defined tolerance.

This is a candidate metric, not a measured result.

### Primary pilot measures

| Measure | Definition |
| --- | --- |
| Timer activation | Eligible sessions with a user-set timer |
| Stop completion | Activated timers that reach a controlled stop |
| Cancellation rate | Activated transitions cancelled before stopping |
| Recovery-card engagement | Recovery cards opened or acted upon next session |
| Successful recovery | Recovery task completed without corrective search or navigation |
| Position correction | Viewer rejects or materially adjusts the proposed checkpoint |
| Avoided continuation minutes | Counterfactual playback minutes avoided after controlled stop |

### Guardrails

- Unwanted interruption reports;
- Cancellation failure;
- subtitle/readability issues;
- accessibility defects;
- co-viewer disruption;
- checkpoint error;
- playback or application reliability regression;
- privacy complaints.

## Revised economic model

### Conservative case

- Retention lift: 0
- Premium conversion: 0
- Monetized delivery savings: 0 unless an internal marginal-cost input is supplied
- Value shown as successful recoveries and avoided stream-minutes
- Full implementation, certification, compliance, and operating cost included

### Scenario case

`Eligible sessions × activation × controlled-stop success × avoided continuation minutes`

This produces avoided stream-minutes. Financial translation requires an authorized internal marginal-cost range. A separate retention or plan-conversion case may be added only after an observed experiment.

## Phase 3 recommendation

Phase 3 should be **prototype evidence and feasibility**, not another round of broad concept expansion.

1. Refactor the prototype to the evidence-backed pilot.
2. Add neutral portfolio research language and remove health claims.
3. Run an expert heuristic and accessibility review that does not require Netflix-user recruitment.
4. Perform technical spikes for local checkpoint reliability and multi-profile/co-viewer behaviour.
5. Create a synthetic event model and analysis notebook for the proposed experiment, clearly labelled as simulated.
6. Define what evidence would be required for an authorized future customer test.

## Gate 2 decision

**Recommended decision: Conditional pass.**

The problem context and product pattern are credible enough to continue building the case. The evidence is not sufficient to claim customer-problem incidence, customer desirability, usability success, revenue, retention, or savings.

The project should proceed only under these conditions:

- use the narrowed manual pilot;
- retire unsupported percentages and therapeutic claims;
- treat checkpoint-and-recovery value as the primary unresolved hypothesis;
- keep economic outcomes scenario-based; and
- preserve the independent, unaffiliated portfolio disclaimer.

