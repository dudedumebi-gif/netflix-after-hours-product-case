# Netflix After Hours

**Status:** Completed independent product case — Phase 5 evidence backlog active  
**Current stage:** Gate 4 disposition approved; Phase 5 authorized on 2026-11-10  
**Role:** AI Product Manager and product case author

Netflix After Hours is an independent, portfolio-grade product innovation case exploring how a streaming service could improve the late-night viewing experience for people who fall asleep while watching.

The evidence-aligned pilot combines manual sleep controls, a cancellable dim-and-stop transition, a local sleep-point checkpoint, and explicit resume choices. The central product objective is a better viewer experience. Retention, conversion, and cost-reduction pathways remain hypotheses—not measured outcomes.

> **Important:** This project was not produced for or with Netflix. It is not affiliated with, endorsed by, or based on confidential information from Netflix. Netflix names and marks belong to their respective owner.

## Product problem

Late-night viewers can wake several episodes ahead, lose their true stopping point, or leave video playing after they fall asleep. Netflix After Hours explores a gentler and more recoverable bedtime viewing journey.

## Current product position

- The product is a concept with a self-contained, deployable front-end prototype.
- Existing percentages and financial outcomes are hypotheses or targets, not measured results.
- No UAT, production-service implementation, or Netflix-customer validation has been completed.
- Phase 2 used independent public evidence to test the concept baselines without implying Netflix-sponsored research.

## Proposed pilot direction

The first viable release is expected to focus on a small, testable customer promise:

- Manual 15-, 30-, and 45-minute timers
- End-of-episode option
- Gradual display dimming
- Immediate cancellation through user input
- Locally saved sleep checkpoint
- Next-session recovery card

Wearable integrations and distributed multi-device synchronization remain later feasibility tracks. Binaural audio, therapeutic sleep claims, premium prompts, and fixed global late-night activation have been removed from the first viable release.

## Repository map

| Area | Contents |
| --- | --- |
| `index.html` | Repository-deployable interactive prototype |
| `prototype/` | Mirrored prototype entry for portfolio browsing |
| `dist/` | Verified static deployment output |
| `archive/original-concept-superseded/` | Original PRD, technical, delivery, strategy, and prototype artifacts |
| `phase-1/` | Research charter, hypotheses, instruments, pilot scope, and economic assumptions |
| `phase-2/` | Secondary-evidence charter, research synthesis, validation matrix, and revised recommendations |
| `phase-3/` | Prototype refactor, expert review, feasibility evidence, and simulated measurement design |
| `phase-4/` | Normalized value model, methodology, scenario results, and Gate 4 decision |
| [Jira Phase 5 epic](https://dumsworkspace-37513198.atlassian.net/browse/DR-39) | Future evidence backlog and Gate 5 decision path |
| `DEPLOYMENT.md` | Verification and static-host deployment instructions |
| `PROJECT_STATUS.md` | Current maturity, evidence position, and approved next phase |
| `DISCLAIMER.md` | Independence, trademark, evidence, and use statements |

## Product lifecycle coverage

The current artifact set covers:

1. Product vision and customer problem
2. Personas and experience design
3. Interactive prototyping
4. Technical architecture
5. Experimentation and feature flags
6. Sprint planning and shift-left governance
7. Operational telemetry and service objectives
8. Release management
9. Go-to-market strategy
10. Executive communication

## Final decision

Gate 4 disposition was approved on 2026-11-09. Physical stream-hours can be calculated under labelled assumptions, but a positive financial case is not demonstrated because marginal delivery value, implementation cost, and operating cost are unavailable. Retention and Premium contribution remain zero. Approval closes the evidence review; it does not approve a positive investment case.

## Prototype verification

The release has no external runtime dependencies and includes contract tests for build parity, release journeys, independence labelling, accessible dialog state, device controls, and reduced-motion support. Run `npm run check` before deployment. See [`DEPLOYMENT.md`](DEPLOYMENT.md).

## Phase 5

Phase 5 was authorized on 2026-11-10 as a future-evidence phase. Its Jira epic contains 12 linked stories covering research governance, problem validation, usability, instrumentation, behavioral evidence, operational effect, authorized economic inputs, accessibility, deferred feasibility tracks, and the Gate 5 decision. Authorization does not change the Gate 4 conclusion or authorize Netflix-branded participant recruitment.

## Author

**Chidumebi (Dumebi) Nkwo**  
AI Product Manager | Business Systems Analyst | AI Builder  
[Portfolio](https://dumebi-ai-ba-portfolio.dudedumebi.chatgpt.site/) | [LinkedIn](https://linkedin.com/in/chidumebi-nkwo-00b500b7) | [GitHub](https://github.com/dudedumebi-gif)

