# Value-Case Methodology

**Evidence label:** Scenario model and decision framework — not Netflix economics

## Model structure

The workbook separates:

- editable assumptions;
- normalized operational calculations;
- financial inputs that require authorization;
- conservative zero treatments;
- net contribution; and
- break-even marginal value.

## Physical model

`Eligible sessions × activation rate × controlled-stop rate × avoided minutes ÷ 60`

This produces avoided stream-hours. It does not produce monetary savings.

The normalized scenario assumptions are:

| Driver | Low | Base | High | Classification |
| --- | ---: | ---: | ---: | --- |
| Eligible sessions per month | 100,000 | 100,000 | 100,000 | Normalization unit |
| Timer activation | 10% | 25% | 40% | Illustrative |
| Controlled-stop rate | 70% | 80% | 90% | Illustrative |
| Avoided minutes per stop | 10 | 20 | 30 | Illustrative |

None of these values is a forecast or measured Netflix result.

## Financial model

`Annual delivery contribution = Annual avoided stream-hours × Marginal delivery value per hour`

`Net annual contribution = Delivery + Retention + Premium − Annualized implementation cost − Annual operating cost`

The current conservative treatment is:

| Input | Treatment | Reason |
| --- | --- | --- |
| Marginal delivery value | Missing; contribution defaults to zero | Netflix Open Connect marginal economics are unavailable |
| Retention contribution | Zero | No causal evidence |
| Premium contribution | Zero | No observed conversion evidence |
| Implementation cost | Missing | Requires engineering and partner estimate |
| Annual operating cost | Missing | Requires support, privacy, compliance, and monitoring estimate |

## Break-even model

Once cost inputs are entered, the workbook calculates:

`Required marginal value per avoided hour = (Annualized implementation cost + annual operating cost − retention contribution − Premium contribution) ÷ annual avoided stream-hours`

This is more defensible than importing public-cloud egress prices that do not represent Netflix's actual marginal architecture economics.

## Model controls

- Missing financial inputs produce “Not calculable,” not a false zero or positive result.
- Editable inputs are visually distinguished.
- Formula errors were scanned after recalculation and after XLSX re-import.
- A disposable input-response test confirmed that the status and net contribution update when complete inputs are supplied, then return to the missing-input state after restoration.
- Every scenario output remains traceable to the input and build sheets.

