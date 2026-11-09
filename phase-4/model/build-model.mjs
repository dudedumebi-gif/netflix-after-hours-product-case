import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "/workspace/scratch/8a2fa3cfd9a2/outputs/netflix-after-hours-phase4";
const previewDir = "/tmp/after-hours-phase4/previews";
const font = "Arial";
const navy = "#172033";
const red = "#B91C1C";
const orange = "#C2410C";
const lightOrange = "#FFEDD5";
const paleYellow = "#FEF3C7";
const paleRed = "#FEE2E2";
const paleGreen = "#DCFCE7";
const green = "#166534";
const grey = "#E5E7EB";
const darkGrey = "#4B5563";
const blueInput = "#0000FF";
const greenLink = "#008000";

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(previewDir, { recursive: true });

const workbook = Workbook.create();
const summary = workbook.worksheets.add("Summary");
const assumptions = workbook.worksheets.add("Assumptions");
const build = workbook.worksheets.add("Value build");

summary.tabColor = navy;
assumptions.tabColor = orange;
build.tabColor = "#9CA3AF";

for (const sheet of [summary, assumptions, build]) {
  sheet.showGridLines = false;
}

// Assumptions
assumptions.getRange("A2:F2").merge();
assumptions.getRange("A2").values = [["Netflix After Hours — Phase 4 value assumptions"]];
assumptions.getRange("A2").format.font = { name: font, size: 15, bold: true, color: navy };
assumptions.getRange("A3:F3").format.borders = { bottom: { style: "thin", color: orange } };

assumptions.getRange("A5:F5").values = [["Normalized scope", "Value", "Unit", "Classification", "Source / reason", "Editable"]];
assumptions.getRange("A6:F8").values = [
  ["Eligible late-night sessions per month", 100000, "sessions", "Scenario normalization", "Not Netflix volume; enables comparable unit analysis", "Yes"],
  ["Months per year", 12, "months", "Calendar convention", "Standard annualization", "No"],
  ["Financial horizon", 3, "years", "Scenario assumption", "Editable model horizon", "Yes"],
];

assumptions.getRange("A10:E10").values = [["Physical-value scenarios", "Low", "Base", "High", "Classification"]];
assumptions.getRange("A11:E13").values = [
  ["Timer activation rate", 0.10, 0.25, 0.40, "Illustrative scenario; not observed"],
  ["Controlled-stop rate among activations", 0.70, 0.80, 0.90, "Illustrative scenario; not observed"],
  ["Avoided continuation minutes per controlled stop", 10, 20, 30, "Illustrative scenario; requires experiment"],
];

assumptions.getRange("A15:F15").values = [["Internal financial inputs", "Value", "Unit", "Classification", "Requirement", "Editable"]];
assumptions.getRange("A16:F21").values = [
  ["Marginal delivery value per avoided stream-hour", null, "currency / hour", "Unavailable", "Authorized internal economics", "Yes"],
  ["One-time implementation and certification cost", null, "currency", "Unavailable", "Engineering and partner estimate", "Yes"],
  ["Annual operating, compliance and support cost", null, "currency / year", "Unavailable", "Operating estimate", "Yes"],
  ["Implementation-cost amortization period", 3, "years", "Scenario assumption", "Editable allocation period", "Yes"],
  ["Annual retention contribution", 0, "currency / year", "Conservative assumption", "Zero until observed causal evidence", "No"],
  ["Annual Premium conversion contribution", 0, "currency / year", "Conservative assumption", "Zero until observed conversion", "No"],
];

assumptions.getRange("A23:F25").values = [
  ["Evidence rules", null, null, null, null, null],
  ["Synthetic Phase 3 metrics are excluded from forecast inputs.", null, null, null, null, null],
  ["A positive Gate 4 conclusion requires complete cost inputs and a defensible monetization input.", null, null, null, null, null],
];

// Value build
build.getRange("A2:D2").merge();
build.getRange("A2").values = [["Normalized value build"]];
build.getRange("A2").format.font = { name: font, size: 15, bold: true, color: navy };
build.getRange("A3:D3").format.borders = { bottom: { style: "thin", color: orange } };
build.getRange("A5:D5").values = [["Metric", "Low", "Base", "High"]];
build.getRange("A6:A21").values = [
  ["Eligible sessions per month"],
  ["Timer activation rate"],
  ["Controlled-stop rate"],
  ["Avoided minutes per controlled stop"],
  ["Activated sessions per month"],
  ["Controlled stops per month"],
  ["Avoided stream-hours per month"],
  ["Avoided stream-hours per year"],
  ["Marginal delivery value per hour"],
  ["Annual delivery contribution"],
  ["Annual retention contribution"],
  ["Annual Premium contribution"],
  ["Total quantified annual benefit"],
  ["Annualized implementation cost"],
  ["Annual operating and support cost"],
  ["Net annual contribution"],
];
build.getRange("B6:D6").formulas = [["=Assumptions!$B$6", "=Assumptions!$B$6", "=Assumptions!$B$6"]];
build.getRange("B7:D9").formulas = [
  ["=Assumptions!B11", "=Assumptions!C11", "=Assumptions!D11"],
  ["=Assumptions!B12", "=Assumptions!C12", "=Assumptions!D12"],
  ["=Assumptions!B13", "=Assumptions!C13", "=Assumptions!D13"],
];
build.getRange("B10").formulas = [["=B6*B7"]];
build.getRange("B10:D10").fillRight();
build.getRange("B11").formulas = [["=B10*B8"]];
build.getRange("B11:D11").fillRight();
build.getRange("B12").formulas = [["=B11*B9/60"]];
build.getRange("B12:D12").fillRight();
build.getRange("B13").formulas = [["=B12*Assumptions!$B$7"]];
build.getRange("B13:D13").fillRight();
build.getRange("B14:D14").formulas = [["=Assumptions!$B$16", "=Assumptions!$B$16", "=Assumptions!$B$16"]];
build.getRange("B15").formulas = [["=IF(B14=\"\",0,B13*B14)"]];
build.getRange("B15:D15").fillRight();
build.getRange("B16:D16").formulas = [["=Assumptions!$B$20", "=Assumptions!$B$20", "=Assumptions!$B$20"]];
build.getRange("B17:D17").formulas = [["=Assumptions!$B$21", "=Assumptions!$B$21", "=Assumptions!$B$21"]];
build.getRange("B18").formulas = [["=SUM(B15:B17)"]];
build.getRange("B18:D18").fillRight();
build.getRange("B19:D19").formulas = [["=IF(Assumptions!$B$17=\"\",\"\",Assumptions!$B$17/Assumptions!$B$19)", "=IF(Assumptions!$B$17=\"\",\"\",Assumptions!$B$17/Assumptions!$B$19)", "=IF(Assumptions!$B$17=\"\",\"\",Assumptions!$B$17/Assumptions!$B$19)"]];
build.getRange("B20:D20").formulas = [["=Assumptions!$B$18", "=Assumptions!$B$18", "=Assumptions!$B$18"]];
build.getRange("B21").formulas = [["=IF(COUNTBLANK(Assumptions!$B$17:$B$18)>0,\"\",B18-B19-B20)"]];
build.getRange("B21:D21").fillRight();

build.getRange("A23:D23").values = [["Break-even marginal value per avoided stream-hour", "Low", "Base", "High"]];
build.getRange("A24").values = [["Required value when complete cost inputs are entered"]];
build.getRange("B24").formulas = [["=IF(COUNTBLANK(Assumptions!$B$17:$B$18)>0,\"\",((Assumptions!$B$17/Assumptions!$B$19)+Assumptions!$B$18-Assumptions!$B$20-Assumptions!$B$21)/B13)"]];
build.getRange("B24:D24").fillRight();

// Summary
summary.getRange("A2:H2").merge();
summary.getRange("A2").values = [["Netflix After Hours — Phase 4 value case"]];
summary.getRange("A2").format.font = { name: font, size: 15, bold: true, color: navy };
summary.getRange("A3:H3").format.borders = { bottom: { style: "thin", color: orange } };

summary.getRange("A5:B8").values = [
  ["Gate 4 status", null],
  ["Financial result", null],
  ["Evidence position", "Physical stream-hours can be calculated under labelled assumptions."],
  ["Decision", "Do not claim a positive investment case until internal cost and marginal-value inputs are supplied."],
];
summary.getRange("B5").formulas = [["=IF(COUNTBLANK(Assumptions!$B$16:$B$18)>0,\"NOT DEMONSTRATED - internal inputs missing\",IF('Value build'!C21>0,\"POSITIVE UNDER ENTERED INPUTS\",\"NOT POSITIVE UNDER ENTERED INPUTS\"))"]];
summary.getRange("B6").formulas = [["=IF(COUNTBLANK(Assumptions!$B$17:$B$18)>0,\"Not calculable\",'Value build'!C21)"]];

summary.getRange("A10:D10").values = [["Normalized physical value per 100,000 eligible sessions monthly", "Low", "Base", "High"]];
summary.getRange("A11:A14").values = [
  ["Activated sessions per month"],
  ["Controlled stops per month"],
  ["Avoided stream-hours per month"],
  ["Avoided stream-hours per year"],
];
summary.getRange("B11:D14").formulas = [
  ["='Value build'!B10", "='Value build'!C10", "='Value build'!D10"],
  ["='Value build'!B11", "='Value build'!C11", "='Value build'!D11"],
  ["='Value build'!B12", "='Value build'!C12", "='Value build'!D12"],
  ["='Value build'!B13", "='Value build'!C13", "='Value build'!D13"],
];

summary.getRange("A16:B20").values = [
  ["Conservative financial treatment", "Treatment"],
  ["Retention contribution", "Zero until observed causal evidence"],
  ["Premium conversion contribution", "Zero until observed conversion"],
  ["Delivery contribution", "Zero until marginal value is supplied"],
  ["Implementation and operating cost", "Required internal inputs; currently missing"],
];

summary.getRange("F5:G8").values = [
  ["Scenario", "Annual avoided stream-hours"],
  ["Low", null],
  ["Base", null],
  ["High", null],
];
summary.getRange("G6:G8").formulas = [["='Value build'!B13"], ["='Value build'!C13"], ["='Value build'!D13"]];

const chart = summary.charts.add("bar", summary.getRange("F5:G8"));
chart.title = "Annual avoided stream-hours (illustrative)";
chart.titleTextStyle.typeface = font;
chart.titleTextStyle.fontSize = 12;
chart.hasLegend = false;
chart.xAxis = { axisType: "textAxis", textStyle: { typeface: font, fontSize: 10 } };
chart.yAxis = { numberFormatCode: "#,##0", numberFormatSourceLinked: false, textStyle: { typeface: font, fontSize: 10 } };
chart.setPosition("F10", "M24");

// Shared formatting
for (const sheet of [summary, assumptions, build]) {
  const used = sheet.getUsedRange();
  used.format.font = { name: font, size: 10, color: "#111827" };
  used.format.verticalAlignment = "center";
}

for (const [sheet, ranges] of [
  [assumptions, ["A5:F5", "A10:E10", "A15:F15"]],
  [build, ["A5:D5", "A23:D23"]],
  [summary, ["A10:D10", "A16:B16", "F5:G5"]],
]) {
  for (const address of ranges) {
    sheet.getRange(address).format = {
      fill: navy,
      font: { name: font, size: 10, bold: true, color: "#FFFFFF" },
      horizontalAlignment: "center",
      verticalAlignment: "center",
      borders: { preset: "outside", style: "thin", color: navy },
    };
  }
}

assumptions.getRange("B6").format.font.color = blueInput;
assumptions.getRange("B8").format.font.color = blueInput;
assumptions.getRange("B11:D13").format.font.color = blueInput;
assumptions.getRange("B16:B19").format.font.color = blueInput;
assumptions.getRange("B16:B18").format.fill = paleYellow;
assumptions.getRange("B11:D12").format.numberFormat = "0.0%";
assumptions.getRange("B6").format.numberFormat = "#,##0";
assumptions.getRange("B13:D13").format.numberFormat = "0.0";
assumptions.getRange("B20:B21").format.numberFormat = "$#,##0;($#,##0);-";
assumptions.getRange("A23:F23").format = { fill: grey, font: { name: font, bold: true, color: navy } };
assumptions.getRange("A24:F25").merge(true);
assumptions.getRange("A24:F25").format.font = { name: font, size: 10, italic: true, color: darkGrey };

build.getRange("B6:D21").format.font.color = greenLink;
build.getRange("B7:D8").format.numberFormat = "0.0%";
build.getRange("B6:D6").format.numberFormat = "#,##0";
build.getRange("B9:D9").format.numberFormat = "0.0";
build.getRange("B10:D13").format.numberFormat = "#,##0.0";
build.getRange("B14:D21").format.numberFormat = "$#,##0;($#,##0);-";
build.getRange("B24:D24").format.numberFormat = "$0.0000";
build.getRange("A18:D18").format.font.bold = true;
build.getRange("A21:D21").format.font.bold = true;

summary.getRange("A5:A8").format.font.bold = true;
summary.getRange("B5").format = { fill: paleRed, font: { name: font, size: 10, bold: true, color: red }, wrapText: true };
summary.getRange("B6").format.font.bold = true;
summary.getRange("B7:B8").format.wrapText = true;
summary.getRange("A10:D10").format.wrapText = true;
summary.getRange("B11:D14").format.numberFormat = "#,##0.0";
summary.getRange("G6:G8").format.numberFormat = "#,##0";
summary.getRange("A17:A20").format.font.bold = true;

summary.getRange("A5:B8").format.borders = { preset: "outside", style: "thin", color: grey };
summary.getRange("A10:D14").format.borders = { preset: "outside", style: "thin", color: grey };
summary.getRange("A16:B20").format.borders = { preset: "outside", style: "thin", color: grey };
assumptions.getRange("A5:F8").format.borders = { preset: "outside", style: "thin", color: grey };
assumptions.getRange("A10:E13").format.borders = { preset: "outside", style: "thin", color: grey };
assumptions.getRange("A15:F21").format.borders = { preset: "outside", style: "thin", color: grey };
build.getRange("A5:D21").format.borders = { preset: "outside", style: "thin", color: grey };
build.getRange("A23:D24").format.borders = { preset: "outside", style: "thin", color: grey };

summary.getRange("A1:M24").format.rowHeight = 20;
assumptions.getRange("A1:F25").format.rowHeight = 20;
build.getRange("A1:D24").format.rowHeight = 20;
summary.getRange("A2:H2").format.rowHeight = 28;
assumptions.getRange("A2:F2").format.rowHeight = 28;
build.getRange("A2:D2").format.rowHeight = 28;

summary.getRange("A:A").format.columnWidth = 50;
summary.getRange("B:B").format.columnWidth = 38;
summary.getRange("C:D").format.columnWidth = 14;
summary.getRange("E:E").format.columnWidth = 3;
summary.getRange("F:F").format.columnWidth = 16;
summary.getRange("G:G").format.columnWidth = 22;
summary.getRange("A7:B8").format.rowHeight = 32;
summary.getRange("A10:D10").format.rowHeight = 30;
assumptions.getRange("A:A").format.columnWidth = 44;
assumptions.getRange("B:D").format.columnWidth = 18;
assumptions.getRange("E:E").format.columnWidth = 42;
assumptions.getRange("F:F").format.columnWidth = 12;
build.getRange("A:A").format.columnWidth = 44;
build.getRange("B:D").format.columnWidth = 18;

assumptions.freezePanes.freezeRows(5);
build.freezePanes.freezeRows(5);

workbook.recalculate();

const summaryInspect = await workbook.inspect({ kind: "table", range: "Summary!A2:G20", include: "values,formulas", tableMaxRows: 24, tableMaxCols: 8 });
console.log(summaryInspect.ndjson);
const buildInspect = await workbook.inspect({ kind: "table", range: "Value build!A5:D24", include: "values,formulas", tableMaxRows: 24, tableMaxCols: 6 });
console.log(buildInspect.ndjson);
const errors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!", options: { useRegex: true, maxResults: 100 }, summary: "final formula error scan" });
console.log(errors.ndjson);

// Disposable input-response check. Restore missing internal inputs before export.
assumptions.getRange("B16:B18").values = [[1.5], [100000], [20000]];
workbook.recalculate();
const testStatus = summary.getRange("B5").values[0][0];
const testNet = summary.getRange("B6").values[0][0];
if (testStatus !== "POSITIVE UNDER ENTERED INPUTS" || !(testNet > 0)) {
  throw new Error(`Input-response verification failed: ${testStatus}, ${testNet}`);
}
console.log(JSON.stringify({ inputResponseCheck: "PASS", testStatus, testNet }));
assumptions.getRange("B16:B18").values = [[null], [null], [null]];
workbook.recalculate();
const restoredStatus = summary.getRange("B5").values[0][0];
if (restoredStatus !== "NOT DEMONSTRATED - internal inputs missing") {
  throw new Error(`Restore verification failed: ${restoredStatus}`);
}
console.log(JSON.stringify({ restoreCheck: "PASS", restoredStatus }));

for (const sheetName of ["Summary", "Assumptions", "Value build"]) {
  const preview = await workbook.render({ sheetName, autoCrop: "all", scale: 1.3, format: "png" });
  await fs.writeFile(`${previewDir}/${sheetName.replaceAll(" ", "-").toLowerCase()}.png`, new Uint8Array(await preview.arrayBuffer()));
}

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(`${outputDir}/Netflix_After_Hours_Phase_4_Value_Model.xlsx`);
console.log(JSON.stringify({ output: `${outputDir}/Netflix_After_Hours_Phase_4_Value_Model.xlsx`, previews: previewDir }));

