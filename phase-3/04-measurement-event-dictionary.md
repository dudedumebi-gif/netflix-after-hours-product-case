# Pilot Measurement and Event Dictionary

**Status:** Gate 3 measurement design  
**Evidence label:** Proposed instrumentation and simulated computation — not Netflix telemetry

## Measurement objective

Determine whether the pilot helps viewers stop intentionally and resume confidently without increasing unwanted interruption.

## Event dictionary

| Event | Trigger | Required properties |
| --- | --- | --- |
| `timer_menu_opened` | Viewer opens timer choices | anonymous session, profile scope, platform, experiment arm, synthetic flag |
| `timer_set` | Viewer selects duration/end of episode | timer option, content type, remaining duration |
| `stop_transition_started` | Countdown begins | checkpoint candidate, transition treatment |
| `stop_transition_cancelled` | Viewer provides cancel input | elapsed transition time, input class |
| `checkpoint_save_succeeded` | Atomic checkpoint write succeeds | schema version, storage class, checkpoint age bucket |
| `checkpoint_save_failed` | Write fails | non-sensitive reason class |
| `playback_controlled_stop` | Playback stops after timer | timer option, stop position bucket |
| `recovery_card_shown` | Valid checkpoint is offered | checkpoint age bucket, same-device flag |
| `recovery_option_selected` | Viewer selects checkpoint or standard position | option, position-difference bucket |
| `position_corrected` | Viewer searches/rewinds/fast-forwards beyond tolerance | correction direction and magnitude bucket |
| `rapid_restart_after_stop` | Playback restarts within 60 seconds | restart delay bucket |
| `checkpoint_dismissed` | Viewer dismisses the proposal | checkpoint age bucket |
| `checkpoint_expired` | Expiry suppresses the proposal | age bucket |

Do not collect health, wearable, sleep-stage, biometric, diagnostic free text, or raw personally identifying data.

## Metric definitions

| Metric | Formula | Interpretation |
| --- | --- | --- |
| Timer activation rate | `timer_set / eligible treatment sessions` | Reach of the optional control |
| Controlled-stop rate | `playback_controlled_stop / timer_set` | Completion after activation |
| Transition cancellation rate | `stop_transition_cancelled / timer_set` | Control usage; not automatically a negative outcome |
| Recovery-card reach | `recovery_card_shown / valid controlled stops with a next session` | Availability of the recovery journey |
| Successful recovery rate | recoveries without correction beyond the approved tolerance / recovery cards shown | Candidate north-star outcome |
| Position-correction rate | `position_corrected / recovery_card_shown` | Checkpoint accuracy guardrail |
| Rapid-restart rate | `rapid_restart_after_stop / playback_controlled_stop` | Unwanted-interruption proxy |
| Avoided continuation minutes | randomized control mean post-trigger minutes minus treatment mean | Requires an authorized controlled experiment |

## Causal and economic restrictions

- Do not call post-stop minutes “saved” without a valid counterfactual.
- Do not monetize avoided minutes without an authorized internal marginal-cost input.
- Do not infer retention or Premium conversion from activation or recovery.
- Report intention-to-treat and treatment-on-treated views separately.
- Pre-register correction tolerance, rapid-restart window, eligible sessions, exclusions, and stopping rules.
- A cancellation may indicate successful viewer control rather than product failure.

## Synthetic computation check

The repository includes a deterministic simulation with 200 synthetic control sessions and 200 synthetic treatment sessions. Seed 2408 generated:

| Simulated measure | Value |
| --- | ---: |
| Timer activations | 127 |
| Controlled stops | 108 |
| Transition cancellations | 19 |
| Recovery cards shown | 95 |
| Successful recoveries | 73 |
| Position corrections | 7 |
| Rapid restarts | 3 |
| Simulated activation rate | 63.50% |
| Simulated successful recovery rate | 76.84% |
| Simulated rapid-restart rate | 2.78% |
| Simulated control post-trigger mean | 32.54 minutes |
| Simulated treatment post-trigger mean | 14.59 minutes |
| Simulated intention-to-treat difference | 17.95 minutes |

These values are deliberately synthetic. They prove that the proposed formulas can be computed; they do not estimate real behaviour or validate a target.

