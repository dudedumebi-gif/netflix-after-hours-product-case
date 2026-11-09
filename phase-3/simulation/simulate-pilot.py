"""Generate a deterministic synthetic Phase 3 measurement example.

The output is a computation check, not customer evidence, a forecast, or a
representation of Netflix data.
"""

import json
import random
import statistics


SEED = 2408
SESSIONS_PER_ARM = 200
rng = random.Random(SEED)


def continuation_minutes():
    return max(0.0, min(90.0, rng.gauss(32.0, 17.0)))


control = []
treatment = []

for index in range(SESSIONS_PER_ARM):
    control.append({
        "session_id": f"synthetic-control-{index + 1:03d}",
        "arm": "control",
        "synthetic": True,
        "post_trigger_playback_minutes": continuation_minutes(),
    })

for index in range(SESSIONS_PER_ARM):
    counterfactual = continuation_minutes()
    activated = rng.random() < 0.62
    cancelled = activated and rng.random() < 0.18
    controlled_stop = activated and not cancelled
    actual_minutes = counterfactual if not controlled_stop else 0.0
    recovery_shown = controlled_stop and rng.random() < 0.85
    successful_recovery = recovery_shown and rng.random() < 0.82
    correction = recovery_shown and rng.random() < 0.09
    rapid_restart = controlled_stop and rng.random() < 0.04
    treatment.append({
        "session_id": f"synthetic-treatment-{index + 1:03d}",
        "arm": "treatment",
        "synthetic": True,
        "activated": activated,
        "cancelled": cancelled,
        "controlled_stop": controlled_stop,
        "recovery_shown": recovery_shown,
        "successful_recovery": successful_recovery,
        "correction": correction,
        "rapid_restart": rapid_restart,
        "counterfactual_playback_minutes": counterfactual,
        "post_trigger_playback_minutes": actual_minutes,
    })


def count(field):
    return sum(1 for row in treatment if row[field])


activated = count("activated")
cancelled = count("cancelled")
stopped = count("controlled_stop")
recovery_shown = count("recovery_shown")
successful = count("successful_recovery")
corrections = count("correction")
rapid_restarts = count("rapid_restart")
control_mean = statistics.mean(row["post_trigger_playback_minutes"] for row in control)
treatment_mean = statistics.mean(row["post_trigger_playback_minutes"] for row in treatment)

result = {
    "label": "SIMULATED RESULT — NOT CUSTOMER OR NETFLIX DATA",
    "seed": SEED,
    "sessions": {"control": len(control), "treatment": len(treatment)},
    "counts": {
        "timer_activations": activated,
        "transition_cancellations": cancelled,
        "controlled_stops": stopped,
        "recovery_cards_shown": recovery_shown,
        "successful_recoveries": successful,
        "position_corrections": corrections,
        "rapid_restarts": rapid_restarts,
    },
    "rates": {
        "activation_rate": round(activated / len(treatment), 4),
        "controlled_stop_rate_among_activated": round(stopped / activated, 4),
        "cancellation_rate_among_activated": round(cancelled / activated, 4),
        "successful_recovery_rate": round(successful / recovery_shown, 4),
        "position_correction_rate": round(corrections / recovery_shown, 4),
        "rapid_restart_guardrail_rate": round(rapid_restarts / stopped, 4),
    },
    "playback_minutes": {
        "control_mean_post_trigger": round(control_mean, 2),
        "treatment_mean_post_trigger": round(treatment_mean, 2),
        "simulated_intention_to_treat_difference": round(control_mean - treatment_mean, 2),
    },
    "interpretation_limit": "The simulation proves metric computability only. It does not estimate adoption, customer value, causal impact, retention, conversion, cost, or savings."
}

print(json.dumps(result, indent=2))
