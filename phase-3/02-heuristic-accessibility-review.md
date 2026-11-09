# Heuristic and Accessibility Review

**Review date:** 2026-11-08  
**Artifact:** `prototype/index.html`  
**Evidence label:** Expert and static technical review — not customer evidence

## Outcome

No critical or high-severity issue remains in the reviewed prototype source. The automated static audit passed 22 of 22 checks, and the inline JavaScript passed syntax compilation.

This outcome does not represent a WCAG certification, assistive-technology user test, browser compatibility certification, or production accessibility approval.

## Review basis

The review considered Nielsen-style usability principles and WCAG-oriented implementation checks relevant to the concept:

- system-status visibility;
- match between system and user expectations;
- user control and cancellation;
- error prevention and recovery;
- recognition rather than recall;
- consistency and clarity;
- keyboard operability;
- accessible names and landmarks;
- focus management;
- motion preferences;
- responsive-width safeguards;
- readable secondary text; and
- independence and evidence-integrity language.

## Findings and dispositions

| ID | Severity before correction | Finding | Disposition | Residual status |
| --- | --- | --- | --- | --- |
| UX-001 | High | The flow inferred that the viewer had fallen asleep. | Replaced with a neutral choice between timer checkpoint and standard position. | Closed |
| UX-002 | High | Wearable auto-detection and Premium packaging appeared in the pilot. | Removed; pilot explicitly states that it uses no wearable or health data. | Closed |
| UX-003 | High | “Deep Sleep,” “Power Nap,” low-pass, and frequency-filter language exceeded the evidence. | Replaced with neutral duration, countdown, and controlled-stop language. | Closed |
| UX-004 | High | Prototype branding could be interpreted as an official Netflix experience. | Added visible non-affiliation copy and neutralized the internal demo brand and fictionalized content. | Closed |
| UX-005 | Medium | Icon-only player controls lacked accessible names. | Added `aria-label` values. | Closed |
| UX-006 | Medium | Timer overlay lacked dialog semantics and focus entry/return. | Added dialog attributes, labelled title, focus entry, Escape close, focus return, and Tab containment. | Closed in source; browser verification remains |
| UX-007 | Medium | Motion did not respect reduced-motion preference. | Added a reduced-motion media query. | Closed in source |
| UX-008 | Medium | Status messages were not announced programmatically. | Added polite live-region semantics to the toast and transition state. | Closed in source |
| UX-009 | Medium | Several small secondary labels used a lower-contrast grey. | Increased affected labels from zinc-500 to zinc-400. | Closed in source; measured contrast review remains |
| UX-010 | Medium | Fixed device widths could overflow smaller screens. | Bounded mobile, tablet, and TV frames to viewport width. | Closed in source; browser verification remains |
| UX-011 | Medium | Checkpoint recovery did not preserve the standard playback position as an explicit option. | Added both choices with clear positions. | Closed |
| UX-012 | Low | Checkpoint state was hard-coded and non-persistent. | Added versioned, expiring local prototype state with corrupt-state fallback. | Closed for prototype evidence |

## Static audit result

The reproducible audit checks:

- duplicate IDs;
- button and input accessible names;
- language, viewport, landmark, and heading structure;
- timer dialog semantics and trigger relationship;
- disclaimer presence;
- rejected-claim absence;
- both resume choices;
- checkpoint versioning and expiry;
- health-data exclusion;
- Escape, focus containment, reduced motion, and responsive width;
- safe icon-library failure; and
- disclosure of external prototype dependencies.

**Result: 22 passed, 0 failed.**

## Unresolved limitations

| Limitation | Gate treatment |
| --- | --- |
| Browser interaction and screenshots could not be executed because the available runner lacked a browser binary and the cloud-browser allowance was unavailable. | Carry-forward verification; does not convert the static result into a browser pass. |
| No screen-reader, switch-control, voice-control, or magnification user session was performed. | Required before any claim of accessibility conformance. |
| Tailwind, Lucide, Google Fonts, and Unsplash remain external prototype dependencies. | Acceptable for this portfolio artifact only; not acceptable as production architecture. |
| Visual contrast was improved but not certified using a rendered-browser audit. | Must be measured during browser/assistive review. |
| No Netflix customer or representative participated. | Product desirability remains unvalidated. |

## Review conclusion

The source-level experience has no identified critical blocker to continuing the portfolio case. Gate 3 should retain real-browser and assistive-technology verification as explicit conditions rather than treating this review as full accessibility validation.

