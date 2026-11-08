# Pilot Scope v0.1

## Status

Candidate scope for research testing. This is not an implementation commitment. Gate 2 evidence and a technical feasibility spike will determine the final pilot.

## Pilot customer promise

**Help late-night viewers stop playback intentionally and return to the point where they were last actively watching.**

## Proposed in-scope capabilities

| Capability | Reason for inclusion |
| --- | --- |
| Player-level After Hours control | Creates a discoverable entry point |
| 15-, 30-, and 45-minute timers | Supports simple, explicit control |
| End-of-episode option | Avoids arbitrary interruption |
| Gradual display dimming | Tests whether a gentler transition adds value |
| Any-input cancellation | Preserves user and co-viewer control |
| Local sleep checkpoint | Protects the recovery point during network loss |
| Next-session recovery card | Delivers the core continuity benefit |
| Basic event instrumentation | Measures adoption, cancellation, unintended playback, and recovery |

## Proposed out-of-scope capabilities

- Wearable sleep detection
- Raw health or biometric data
- Binaural or brainwave audio
- Advanced audio DSP
- Audio-only background streaming
- Premium upsell prompts
- Global multi-device conflict resolution
- Broad international rollout
- Claims of sleep improvement

## Platform decision

Research must compare TV-first and mobile-first use cases. The implementation pilot should begin on the smallest platform set that can test the customer promise and collect valid behavioural data. Android mobile is a candidate for early technical validation because manual timer controls can be isolated, while TV remains essential to the customer problem and must be represented in usability research.

## Pilot event model

- `after_hours_control_viewed`
- `after_hours_timer_started`
- `after_hours_end_episode_selected`
- `after_hours_transition_started`
- `after_hours_transition_cancelled`
- `after_hours_playback_stopped`
- `after_hours_checkpoint_saved`
- `after_hours_recovery_card_viewed`
- `after_hours_recovery_resumed`
- `after_hours_recovery_dismissed`
- `after_hours_manual_search_after_resume`

No event should contain raw health data or free-text viewing information.

## Candidate pilot metrics

### Primary customer outcome

Successful next-session recovery without rewind, fast-forward, or episode searching.

### Supporting metrics

- Eligible-session feature adoption
- Timer completion rate
- Cancellation rate
- Estimated unintended playback minutes avoided
- Recovery-card view-to-resume rate
- Time from next-session start to resumed playback
- Post-session usefulness rating

### Guardrails

- Playback stopped while an awake viewer intended to continue
- Failed or missing checkpoint
- Accessibility complaint
- Household or co-viewer conflict
- Increase in playback errors
- Material reduction in intended viewing

## Entry criteria

- Gate 2 confirms meaningful problem frequency, severity, and desirability.
- Round 2 usability meets critical-task thresholds.
- Technical spike validates checkpoint persistence and immediate cancellation.
- Privacy review approves the event model.
- Economic model shows a plausible conservative pathway.

## Exit decision

- **Scale:** Customer outcome and guardrails meet precommitted thresholds.
- **Iterate:** Value signal exists but experience or reliability needs correction.
- **Narrow:** Strong value exists only in a specific segment or platform.
- **Stop:** Problem, adoption, safety, or economics do not justify further investment.

