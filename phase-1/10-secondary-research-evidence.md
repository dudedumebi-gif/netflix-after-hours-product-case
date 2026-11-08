# Secondary Research Evidence Review

**Review status:** Initial evidence scan  
**Review date:** 2026-11-08  
**Purpose:** Establish what public evidence can and cannot support before primary research

## Evidence summary

| ID | Evidence | Relevance | Limitation | Hypotheses informed |
| --- | --- | --- | --- | --- |
| SR-001 | An American Academy of Sleep Medicine survey of 2,003 U.S. adults reported that 88% had lost sleep at least rarely by staying up past bedtime to watch multiple episodes or a streaming series; 25% reported doing so often. | Demonstrates that streaming and bedtime conflict is widespread. | Measures staying awake to binge, not falling asleep during playback or unattended continuation. Fielded in 2019. | H-001, H-015 |
| SR-002 | A web survey of college students reported that 86.7% watched TV shows as a pre-sleep behaviour at least weekly and 51.3% used TV shows to facilitate sleep onset. | Supports the existence of a bedtime-viewing segment. | College-student sample limits generalization; perceived efficacy and unintended playback were not the main outcomes. | H-001, H-003, H-006 |
| SR-003 | A longitudinal adolescent study reported roughly half of participants sometimes or often fell asleep while watching TV. | Shows that falling asleep during viewing is measurable behaviour. | Adolescent population and traditional TV context are not equivalent to adult paid-streaming users. | H-001 |
| SR-004 | The 2011 National Sleep Foundation poll found watching TV was the most common activity in the hour before bed, reported at least a few nights a week by 79% of respondents. | Supports pre-sleep viewing as an established behaviour. | Old data predating the current streaming environment; does not measure falling asleep or product need. | H-001, H-003 |
| SR-005 | Multiple technology publications reported that Netflix tested an Android sleep timer in 2021 with 15-, 30-, and 45-minute options plus end-of-title stopping, initially for adult profiles. | Confirms that a basic timer pattern was previously considered and closely matches part of the concept. | Secondary reporting; no current official availability, adoption result, or expansion decision located in the initial scan. | H-004, H-011, H-020 |
| SR-006 | Apple states that HealthKit requires explicit per-data-type permission and that health data is locally encrypted; apps may be unable to read it in the background while the device is locked. | Establishes privacy obligations and a material feasibility constraint for real-time wearable triggering. | Documentation confirms platform rules, not user willingness or streaming-product eligibility. | H-012, H-013, H-019 |
| SR-007 | Apple's documented sleep categories include awake, core, deep, and REM sleep, with potential gaps at the start or end of recorded samples. | Challenges the concept's assumption that an Apple Watch will provide a clean real-time N1 or N2 trigger. | API behaviour and device data timing require a technical spike; documentation does not prove impossibility. | H-012, H-018, H-020 |
| SR-008 | Android Health Connect protects sleep sessions with explicit `READ_SLEEP` and `WRITE_SLEEP` permissions and describes background execution constraints. | Confirms permission and background-processing requirements for Android sleep integration. | Documentation concerns sleep-tracking applications; product-policy eligibility and real-time latency remain unresolved. | H-012, H-013, H-018 |

## Initial interpretation

Public evidence supports three directional statements:

1. Viewing around bedtime is common.
2. A meaningful segment uses video as part of winding down or attempting to fall asleep.
3. A manual sleep-timer pattern has precedent.

The evidence does **not** yet establish:

- The adult incidence of falling asleep while paid streaming continues
- Average unintended playback minutes
- Frequency of lost position or spoilers
- Demand for a recovery card
- Retention impact
- Premium conversion
- Netflix-specific delivery savings
- Reliability or policy eligibility of real-time wearable triggering

Therefore, the Gate 2 decision still requires primary research.

## Architecture implications identified early

- Replace Apple-specific N1/N2 language with platform-supported sleep-state terminology until a spike confirms available timing and granularity.
- Treat wearable automation as a later option, not a pilot dependency.
- Require explicit permission, revocation handling, and a no-health-data fallback.
- Keep medical or sleep-improvement claims outside the product proposition.
- Separate basic timer precedent from the differentiated checkpoint-and-recovery hypothesis.

## Sources

1. American Academy of Sleep Medicine, *Sleep Prioritization Survey 2019 - Binge-Watching Results*: https://aasm.org/wp-content/uploads/2019/11/sleep-prioritization-survey-2019-binge-watching-results.pdf
2. *A Comprehensive Assessment of Bedtime Routines and Strategies to Aid Sleep Onset in College Students*: https://pmc.ncbi.nlm.nih.gov/articles/PMC11417809/
3. *Short Sleep Duration and Screen-Based Activities: A Longitudinal Multilevel Analysis*: https://pmc.ncbi.nlm.nih.gov/articles/PMC6993096/
4. *The Sleep and Technology Use of Americans: Findings from the National Sleep Foundation's 2011 Sleep in America Poll*: https://pmc.ncbi.nlm.nih.gov/articles/PMC3836340/
5. TechRadar, *Netflix is testing a sleep timer on Android*: https://www.techradar.com/news/netflix-is-testing-a-sleep-timer-on-android-in-case-you-fall-asleep-during-headspace
6. Engadget, *Netflix is testing a sleep timer on Android*: https://www.engadget.com/netflix-sleep-timer-test-android-181916376.html
7. Apple Developer, *HealthKit*: https://developer.apple.com/documentation/healthkit/
8. Apple Developer, *Protecting user privacy*: https://developer.apple.com/documentation/healthkit/protecting-user-privacy
9. Apple Developer, *HKCategoryValueSleepAnalysis*: https://developer.apple.com/documentation/healthkit/hkcategoryvaluesleepanalysis
10. Android Developers, *Develop Sleep Experiences with Health Connect*: https://developer.android.com/health-and-fitness/health-connect/experiences/sleep

