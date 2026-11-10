import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const workspaceDir = path.resolve(".");
const buildDir = path.join(workspaceDir, ".launch-build");
const outDir = path.join(workspaceDir, "launch-package");
const FINAL_PPTX = path.join(outDir, "Netflix_After_Hours_5_Minute_Case_Presentation_Final.pptx");
const screenshotPath = path.join(workspaceDir, "case-study", "assets", "prototype-deployed.jpg");
const screenshotBytes = await fs.readFile(screenshotPath);
const FONT = "Arial";
const BG = "#0B0C10";
const INK = "#F7F7F4";
const MUTED = "#A7A9B3";
const ORANGE = "#F25C2A";
const GREEN = "#173F35";
const DARK = "#262833";

await fs.mkdir(buildDir, { recursive: true });
await fs.mkdir(outDir, { recursive: true });

const presentation = Presentation.create({ slideSize: { width: 1280, height: 720 } });

function addText(slide, value, left, top, width, height, size = 20, color = "#111217", bold = false, name = "text", alignment = "left") {
  const shape = slide.shapes.add({
    name,
    geometry: "textbox",
    position: { left, top, width, height },
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
  });
  shape.text = value;
  shape.text.style = { fontFamily: FONT, fontSize: `${size}pt`, color, bold, alignment };
  return shape;
}

function addRule(slide, left, top, width, fill = ORANGE, name = "rule") {
  return slide.shapes.add({
    name,
    geometry: "rect",
    position: { left, top, width, height: 3 },
    fill,
    line: { style: "solid", fill, width: 0 },
  });
}

function standardSlide(title, number, subtitle = "") {
  const slide = presentation.slides.add();
  slide.background.fill = "#FFFFFF";
  addText(slide, String(number).padStart(2, "0"), 72, 44, 44, 24, 11, ORANGE, true, "page-number");
  addText(slide, title, 72, 76, 1136, 60, 31, "#050507", true, "slide-title");
  if (subtitle) addText(slide, subtitle, 72, 145, 1120, 48, 16, "#555761", false, "slide-subtitle");
  addRule(slide, 72, 680, 1136, "#E4E5E9", "footer-rule");
  addText(slide, "INDEPENDENT PORTFOLIO CASE  ·  CHIDUMEBI NKWO", 72, 690, 1136, 16, 8, "#7B7D86", true, "footer");
  return slide;
}

function addTable(slide, headers, rows, left, top, width, height, columnWidths) {
  const values = [headers, ...rows];
  const table = slide.tables.add({ rows: values.length, columns: headers.length, left, top, width, height, values, columnWidths });
  table.borders.assign({ style: "solid", fill: "#D9D9D9", width: 1 });
  for (let row = 0; row < values.length; row += 1) {
    for (let column = 0; column < headers.length; column += 1) {
      const cell = table.getCell(row, column);
      cell.fill = row === 0 ? DARK : row % 2 === 0 ? "#F3F4F6" : "#FFFFFF";
      cell.text.style = { fontFamily: FONT, fontSize: row === 0 ? "15pt" : "14pt", bold: row === 0, color: row === 0 ? "#FFFFFF" : "#202126" };
    }
  }
  return table;
}

// 1. Cover
{
  const slide = presentation.slides.add();
  slide.background.fill = BG;
  addRule(slide, 82, 88, 6, ORANGE, "accent");
  addText(slide, "INDEPENDENT PRODUCT MANAGEMENT CASE", 112, 100, 840, 30, 12, "#FF9B67", true, "eyebrow");
  addText(slide, "Netflix\nAfter Hours", 112, 152, 790, 170, 49, INK, true, "cover-title");
  addText(slide, "How evidence narrowed a broad idea into a bounded pilot and an honest product decision", 112, 350, 860, 92, 22, MUTED, false, "cover-subtitle");
  addText(slide, "Five-minute case walkthrough", 112, 525, 620, 32, 16, "#D4D5DA", true, "cover-format");
  addText(slide, "Not affiliated with, endorsed by, or produced for Netflix", 112, 574, 780, 24, 11, "#8C8E98", false, "cover-disclaimer");
  addText(slide, "CHIDUMEBI NKWO  ·  AI PRODUCT MANAGER", 112, 640, 920, 22, 10, "#8C8E98", true, "cover-author");
  slide.speakerNotes.text = "About 35 seconds. Open by stating that this is an independent portfolio case and not work performed inside Netflix. Explain the product question: could a streaming service improve late-night viewing for people who fall asleep while watching? The point of the case is the product decision process. It shows how evidence changed the scope and how unsupported commercial claims stayed out of the final recommendation. Source: repository README and decision log.";
}

// 2. Problem and judgment
{
  const slide = standardSlide("Viewer problem and product judgment", 2, "The context was credible. The original solution was too broad for the available evidence.");
  addText(slide, "Viewer problem", 72, 226, 260, 28, 14, ORANGE, true, "problem-label");
  addText(slide, "A viewer can fall asleep, wake several episodes ahead, and lose the true stopping point.", 72, 270, 480, 150, 26, "#111217", true, "problem-copy");
  addRule(slide, 625, 220, 3, "#D8D9DE", "divider");
  addText(slide, "Product decision", 690, 226, 260, 28, 14, GREEN, true, "decision-label");
  addText(slide, "Keep the customer promise. Remove features and commercial claims that the evidence cannot support.", 690, 270, 480, 150, 26, "#111217", true, "decision-copy");
  addText(slide, "Evidence boundary", 72, 498, 210, 28, 14, ORANGE, true, "boundary-label");
  addText(slide, "Secondary research supported bedtime viewing and familiar timer controls. It did not establish problem frequency, product desirability, retention, conversion, or savings.", 72, 536, 1090, 84, 17, "#555761", false, "boundary-copy");
  slide.speakerNotes.text = "About 50 seconds. Describe the viewer problem in plain language. Then explain the key judgment: I did not treat a plausible problem as proof of demand. Independent secondary evidence supported the context and timer pattern, but it could not validate the incidence of the problem or Netflix-specific outcomes. That distinction forced a smaller pilot and prevented the case from presenting targets as measured results. Sources: phase-2 deep research findings and baseline validation matrix.";
}

// 3. Pilot and prototype
{
  const slide = standardSlide("Bounded pilot experience", 3, "One release promise connects timer setup, a controlled stop, and transparent recovery.");
  slide.images.add({
    blob: screenshotBytes,
    contentType: "image/jpeg",
    alt: "After Hours interactive prototype showing bedtime timer controls",
    fit: "contain",
    position: { left: 72, top: 205, width: 790, height: 420 },
  });
  addText(slide, "1  Set a timer", 905, 230, 290, 34, 19, "#111217", true, "step-1");
  addText(slide, "15, 30, 45 minutes, or episode end", 905, 272, 290, 52, 15, "#555761", false, "step-1-copy");
  addText(slide, "2  Stop gently", 905, 350, 290, 34, 19, "#111217", true, "step-2");
  addText(slide, "Dim, show a countdown, cancel on input", 905, 392, 290, 52, 15, "#555761", false, "step-2-copy");
  addText(slide, "3  Resume clearly", 905, 470, 290, 34, 19, "#111217", true, "step-3");
  addText(slide, "Choose the checkpoint or latest position", 905, 512, 290, 52, 15, "#555761", false, "step-3-copy");
  addText(slide, "Public prototype", 905, 590, 290, 26, 13, ORANGE, true, "prototype-status");
  slide.speakerNotes.text = "About 60 seconds. Walk through the prototype from left to right. The viewer starts the feature deliberately. The interface dims and warns before stopping, and any input cancels the stop. The prototype stores a local checkpoint and lets the viewer choose where to resume next time. The release avoids wearables, health claims, premium prompts, and cross-device synchronization. It is a self-contained front-end prototype, not a production Netflix service. Source: pilot scope, prototype alignment assessment, and public prototype.";
}

// 4. Evidence and economics
{
  const slide = standardSlide("Evidence and economic conclusion", 4, "The case records what the evidence supports and leaves unavailable outcomes at zero or unresolved.");
  addTable(slide, ["Decision area", "Final position"], [
    ["Viewer context", "Directionally supported by independent evidence"],
    ["Customer desirability", "Not validated"],
    ["Retention contribution", "Zero in the conservative case"],
    ["Premium conversion", "Zero in the conservative case"],
    ["Avoided stream hours", "Computable under labelled assumptions"],
    ["Positive financial case", "Not demonstrated"],
  ], 72, 220, 1136, 382, [370, 766]);
  addText(slide, "Gate 4 closed the evidence review. It did not approve an investment case.", 72, 622, 1080, 36, 20, "#111217", true, "gate-conclusion");
  slide.speakerNotes.text = "About 60 seconds. This slide shows the discipline of the decision. I could calculate physical stream hours under assumptions, but I could not translate that into defensible revenue or margin without internal marginal-value and cost inputs. I held retention and premium conversion at zero because there was no causal evidence. Gate 4 therefore closed as not demonstrated. That is a useful outcome because it identifies the exact evidence required before anyone should make an investment claim. Sources: phase-4 value-case methodology, normalized scenario results, and Gate 4 decision.";
}

// 5. Product process
{
  const slide = standardSlide("Product management process", 5, "Four gates turned a broad concept into a traceable product decision.");
  const rows = [
    ["Gate 1", "Research design", "Define hypotheses, methods, and evidence standards"],
    ["Gate 2", "Problem evidence", "Narrow the concept when baselines remain unresolved"],
    ["Gate 3", "Experience review", "Verify the pilot and carry forward explicit conditions"],
    ["Gate 4", "Value decision", "Close without overstating missing economic evidence"],
  ];
  rows.forEach(([gate, title, result], index) => {
    const top = 220 + index * 98;
    addText(slide, gate, 72, top, 150, 32, 17, ORANGE, true, `gate-${index + 1}`);
    addText(slide, title, 240, top, 300, 32, 20, "#111217", true, `gate-title-${index + 1}`);
    addText(slide, result, 555, top, 615, 50, 16, "#555761", false, `gate-result-${index + 1}`);
    addRule(slide, 240, top + 65, 930, "#E1E2E6", `gate-rule-${index + 1}`);
  });
  slide.speakerNotes.text = "About 55 seconds. Explain that the gated process made the work auditable. Gate 1 established the evidence rules. Gate 2 used public research because independent recruitment could create legal and affiliation risk. Gate 3 tested the bounded experience and captured unresolved accessibility conditions. Gate 4 evaluated the value logic and stopped short of a positive financial claim. The decision log preserves every approval and scope correction. Sources: phase-1 decision log and project status.";
}

// 6. Outcome
{
  const slide = standardSlide("Final outcome and next focus", 6, "The case is complete as v1.0 Final. Future customer research remains parked until an authorized route exists.");
  addText(slide, "Completed release", 72, 232, 300, 28, 14, ORANGE, true, "outcome-label");
  addText(slide, "Public prototype\nFinal case study\nExecutive release package\nTraceable decision record", 72, 278, 430, 200, 25, "#111217", true, "outcome-list");
  addRule(slide, 620, 220, 3, "#D8D9DE", "outcome-divider");
  addText(slide, "Leadership reflection", 690, 232, 300, 28, 14, GREEN, true, "reflection-label");
  addText(slide, "Good product work can end with a smaller pilot and an unresolved business case. The value is a safer next decision.", 690, 278, 470, 150, 23, "#111217", true, "reflection-copy");
  addText(slide, "Next active portfolio build", 690, 490, 360, 28, 14, ORANGE, true, "next-label");
  addText(slide, "Raphah Lead Engine + Delivery Factory", 690, 535, 470, 72, 22, "#111217", true, "next-copy");
  slide.speakerNotes.text = "About 40 seconds. Close with the release outcome: the prototype, case study, executive package, and decision trail are complete. Phase 5 remains preserved in Jira but parked until an authorized sponsor and governance route exist. My main lesson is that strong product management does not force every idea into a positive business case. It reduces uncertainty and makes the next decision safer. My next active portfolio focus is the Raphah Lead Engine and Delivery Factory. Sources: CHANGELOG, project status, and Jira epic DR-39.";
}

for (const [index, slide] of presentation.slides.items.entries()) {
  const png = await presentation.export({ slide, format: "png", scale: 1 });
  await fs.writeFile(path.join(buildDir, `slide-${String(index + 1).padStart(2, "0")}.png`), new Uint8Array(await png.arrayBuffer()));
}
const montage = await presentation.export({ format: "webp", montage: true, scale: 1 });
await fs.writeFile(path.join(buildDir, "montage.webp"), new Uint8Array(await montage.arrayBuffer()));

const SKILL_DIR = "/home/agent/.codex/skills/builtins/presentations";
const { finalizePresentation } = await import(pathToFileURL(path.join(SKILL_DIR, "container_tools/artifact_tool_utils.mjs")).href);
const stagingDir = path.join(workspaceDir, ".codex-finalizer");
await fs.mkdir(stagingDir, { recursive: true });
const candidatePath = path.join(stagingDir, "five-minute-candidate.pptx");
await (await PresentationFile.exportPptx(presentation)).save(candidatePath);
const requirements = {
  explicitTotalSlideCount: 6,
  requiredNativeTableOwnerSlides: [4],
  requiredNativeChartOwnerSlides: [],
};
await finalizePresentation({
  ...requirements,
  workspaceDir,
  candidatePath,
  finalPath: FINAL_PPTX,
  pythonExecutable: process.env.CODEX_PRIMARY_RUNTIME_PYTHON,
  integrityValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_layout_geometry.py"),
  layoutArgs: ["--expected-slide-size-emu", "12192000,6858000", "--validate-heading-fit", "--require-native-table-slide", "4"],
  requiredNativeTableOwnerSlides: requirements.requiredNativeTableOwnerSlides,
  fontPolicy: { basis: "design", families: [FONT] },
  verifyArtifactToolImport: true,
  receiptPath: path.join(stagingDir, "five-minute-case-presentation-final.validation.json"),
});

console.log(FINAL_PPTX);
