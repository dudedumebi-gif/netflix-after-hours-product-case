# Economic Model Assumptions Register

## Objective

Translate viewer value into transparent revenue or margin pathways without presenting unavailable Netflix economics as fact.

## Value pathways

### 1. Subscription revenue preservation

`Eligible subscribers × baseline churn × relative churn reduction × monthly plan revenue × retained months`

The research may support satisfaction and retention intent. It cannot validate churn reduction without an observed experiment or internal longitudinal data.

### 2. Premium conversion

`Eligible non-Premium subscribers × incremental upgrade rate × monthly price difference × retained Premium months`

Stated willingness to upgrade will be treated as a directional signal. The model must apply a conservative intent-to-behaviour adjustment until observed conversion exists.

### 3. Avoided unattended playback

`Affected sessions × avoided playback minutes × average delivery rate × marginal delivery cost`

Public cloud egress prices must not be used as Netflix's actual marginal delivery cost. Until internal data exist, the model will show the physical reduction in stream-hours and data volume, then use labelled low, base, and high cost assumptions.

### 4. Implementation and operating cost

`One-time product and engineering cost + device certification + research and compliance + annual support and monitoring + partner costs`

## Assumption register

| ID | Variable | Status | Initial treatment | Validation source |
| --- | --- | --- | --- | --- |
| E-001 | Eligible late-night viewer population | Unknown | Scenario variable | Survey incidence plus disclosed subscriber scenario |
| E-002 | Fall-asleep event frequency | Unknown | Research output | Survey |
| E-003 | Unattended minutes per affected event | Unknown | Research output with sensitivity | Survey, then telemetry experiment |
| E-004 | Pilot adoption rate | Unknown | Low/base/high scenario | Survey intent adjusted by usability and later experiment |
| E-005 | Successful recovery rate | Target, not result | Use approved pilot target only | Usability, then instrumented experiment |
| E-006 | Retention effect | Unvalidated hypothesis | Zero in conservative case | Later longitudinal experiment |
| E-007 | Premium upgrade effect | Unvalidated hypothesis | Discount stated intent heavily | Choice test, then experiment |
| E-008 | Monthly price difference | Public-plan input at time of analysis | Region-specific | Current official pricing |
| E-009 | Marginal delivery cost | Unavailable | Confidential scenario range | Internal data required for real investment case |
| E-010 | Engineering effort | Unknown | Range estimate after feasibility spike | Engineering estimation |
| E-011 | Device certification cost | Unknown | Excluded until platform scope set | Partner and engineering input |
| E-012 | Wearable integration cost | Outside initial pilot | Separate option case | Technical spike and partner terms |
| E-013 | Privacy and legal cost | Unknown | Include contingency | Privacy and legal assessment |
| E-014 | Cannibalization or downgrade risk | Unknown | Guardrail scenario | Pricing research and experiment |

## Scenario rules

- **Conservative:** No retention lift, no Premium lift, low adoption, full estimated cost.
- **Base:** Evidence-supported adoption and modest economic proxy conversion.
- **High:** Strong but plausible values; never described as forecast certainty.
- Show break-even values for adoption, avoided minutes, conversion, and retention.
- Identify the five assumptions with the largest effect through sensitivity analysis.

## Model release gate

The economic case may be called “positive” only when:

1. Every material input is sourced or explicitly labelled as an assumption.
2. The conservative scenario does not depend on unvalidated retention or Premium conversion.
3. Sensitivity analysis shows where the conclusion changes.
4. Implementation and operating costs are included.
5. The output distinguishes revenue, cost avoidance, margin, and non-financial customer value.

