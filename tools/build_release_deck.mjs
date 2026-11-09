import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const workspaceDir = path.resolve(".");
const buildDir = path.join(workspaceDir, ".deck-build");
const outDir = path.join(workspaceDir, "release-package");
const FINAL_PPTX = path.join(outDir, "Netflix_After_Hours_Executive_Release_Deck.pptx");
const screenshot = path.join(workspaceDir, "case-study", "assets", "prototype-deployed.jpg");
const screenshotBytes = await fs.readFile(screenshot);
const FONT = "Arial";
const BG = "#0B0C10", INK = "#F7F7F4", MUTED = "#A7A9B3", ORANGE = "#F25C2A", PANEL = "#1A1B22", LINE = "#393B45", LIGHT = "#F3F4F6", DARK = "#262833";

await fs.mkdir(buildDir, { recursive: true });
await fs.mkdir(outDir, { recursive: true });

const p = Presentation.create({ slideSize: { width: 1280, height: 720 } });

function text(slide, value, x, y, w, h, size=20, color=INK, bold=false, name="text", align="left") {
  const s = slide.shapes.add({ name, geometry:"textbox", position:{left:x,top:y,width:w,height:h}, fill:"none", line:{style:"solid",fill:"none",width:0} });
  s.text = value;
  s.text.style = { fontFamily:FONT, fontSize:`${size}pt`, color, bold, alignment:align };
  return s;
}
function rect(slide,x,y,w,h,fill,line=fill,name="shape") {
  return slide.shapes.add({name,geometry:"rect",position:{left:x,top:y,width:w,height:h},fill,line:{style:"solid",fill:line,width:1}});
}
function base(title, subtitle, number) {
  const s = p.slides.add(); s.background.fill = "#FFFFFF";
  text(s, String(number).padStart(2,"0"), 72, 44, 48, 24, 11, ORANGE, true, "page-number");
  text(s, title, 72, 70, 1136, 68, 31, "#050507", true, "slide-title");
  if (subtitle) text(s, subtitle, 72, 142, 1120, 54, 16, "#52545D", false, "slide-subtitle");
  rect(s,72,682,1136,2,"#E4E5E9","#E4E5E9","footer-rule");
  text(s,"INDEPENDENT PORTFOLIO CASE  ·  CHIDUMEBI NKWO",72,690,1136,16,8,"#7B7D86",true,"footer");
  return s;
}
function table(slide, headers, rows, x,y,w,h,widths) {
  const values=[headers,...rows];
  const t=slide.tables.add({rows:values.length,columns:headers.length,left:x,top:y,width:w,height:h,values,columnWidths:widths});
  t.borders.assign({style:"solid",fill:"#D9D9D9",width:1});
  for(let r=0;r<values.length;r++) for(let c=0;c<headers.length;c++){
    const cell=t.getCell(r,c);
    cell.fill = r===0 ? DARK : (r%2===0 ? "#F3F4F6" : "#FFFFFF");
    cell.text.style={fontFamily:FONT,fontSize:r===0?"15pt":"14pt",bold:r===0,color:r===0?"#FFFFFF":"#202126"};
  }
  return t;
}
function notes(slide, sources){ slide.speakerNotes.text = sources; }

// 1 Cover
{
  const s=p.slides.add(); s.background.fill=BG;
  rect(s,72,82,6,520,ORANGE,ORANGE,"accent-line");
  text(s,"INDEPENDENT PRODUCT MANAGEMENT CASE",110,96,800,28,12,"#FF9B67",true,"eyebrow");
  text(s,"Netflix\nAfter Hours",110,148,760,168,48,INK,true,"cover-title");
  text(s,"Evidence aligned late night viewing concept and deployment ready interactive prototype",110,344,820,70,21,MUTED,false,"cover-subtitle");
  text(s,"Final release  ·  November 2026",110,520,680,30,14,"#D4D5DA",true,"cover-date");
  text(s,"Not affiliated with, endorsed by, or produced for Netflix",110,570,760,24,11,"#8C8E98",false,"cover-disclaimer");
  text(s,"CHIDUMEBI NKWO  ·  AI PRODUCT MANAGER",110,640,920,22,10,"#8C8E98",true,"cover-author");
  notes(s,"Source: Final case study and repository decision log. All claims retain their evidence classification.");
}

// 2 Decision
{
  const s=base("Executive decision","The case is complete. A positive financial case remains unproven.",2);
  text(s,"Proceed only as a small, instrumented learning pilot if an authorized organization sponsors further validation.",72,208,1120,58,22,"#17181C",true,"decision-statement");
  table(s,["Decision area","Final position"],[
    ["Viewer need","Directionally supported by independent secondary evidence"],
    ["Pilot experience","Manual timer, cancellable stop, local checkpoint, and resume choice"],
    ["Customer validation","Not completed"],
    ["Economic result","Positive case not demonstrated"],
    ["Portfolio outcome","Completed independent concept to decision case"],
  ],72,300,1136,320,[310,826]);
  notes(s,"Sources: phase-4/03-gate-4-decision.md; PROJECT_STATUS.md; phase-1/00-decision-log.md.");
}

// 3 Scope correction
{
  const s=base("Evidence changed the scope","The original suite exceeded the available evidence, so the pilot became smaller and user controlled.",3);
  table(s,["Original assumption","Evidence decision"],[
    ["Wearables infer sleep reliably","Deferred to a separate feasibility track"],
    ["Advanced audio improves sleep","Removed with all therapeutic claims"],
    ["Premium prompts create conversion","Removed from pilot; contribution held at zero"],
    ["Unattended playback creates savings","Retained only as a measurable operational hypothesis"],
    ["One late night window fits everyone","Replaced with user initiated controls"],
  ],72,225,1136,390,[470,666]);
  notes(s,"Sources: phase-2/02-baseline-validation-matrix.md; phase-2/03-revised-baselines-and-recommendations.md.");
}

// 4 Evidence matrix
{
  const s=base("Research outcome","Secondary evidence established context and interaction precedent. It did not validate product specific outcomes.",4);
  table(s,["Baseline","Disposition","Product implication"],[
    ["Bedtime viewing context","Supported","Continue problem track"],
    ["Manual timer pattern","Supported","Use a familiar interaction"],
    ["Problem frequency","Unresolved","Do not claim incidence"],
    ["Recovery value","Unresolved","Test correction and desirability"],
    ["Retention or conversion","Unsupported","Hold contribution at zero"],
    ["Delivery savings","Unresolved","Require internal marginal value"],
  ],72,215,1136,420,[390,220,526]);
  notes(s,"Sources: phase-2/01-deep-research-findings.md; phase-2/02-baseline-validation-matrix.md.");
}

// 5 Pilot experience
{
  const s=base("Pilot experience","One release promise connects timer setup, a controlled stop, and transparent recovery.",5);
  const steps=[
    ["01","Set timer","15, 30, 45 minutes, or episode end"],
    ["02","Stop gently","Dim, show countdown, cancel on input"],
    ["03","Resume clearly","Choose checkpoint or latest position"],
  ];
  steps.forEach((d,i)=>{
    const x=72+i*386;
    rect(s,x,245,350,270,i===1?"#FFF4EE":"#F5F5F7",i===1?"#F25C2A":"#D8D9DE",`step-${i+1}`);
    text(s,d[0],x+24,270,70,32,14,ORANGE,true,`step-num-${i+1}`);
    text(s,d[1],x+24,322,300,45,24,"#111217",true,`step-title-${i+1}`);
    text(s,d[2],x+24,388,300,80,16,"#53555E",false,`step-body-${i+1}`);
  });
  text(s,"Release boundary",72,565,210,26,14,"#111217",true,"boundary-title");
  text(s,"Manual controls, local state, no wearable or commercial claim",300,563,850,30,16,"#53555E",false,"boundary-copy");
  notes(s,"Sources: phase-1/09-pilot-scope-v0.1.md; phase-3/01-prototype-alignment-assessment.md.");
}

// 6 Prototype
{
  const s=base("Deployment ready prototype","The self contained release runs without external scripts, fonts, images, APIs, analytics, or storage calls.",6);
  s.images.add({blob:screenshotBytes,contentType:"image/jpeg",alt:"After Hours evidence aligned prototype showing the timer journey",fit:"contain",position:{left:72,top:205,width:830,height:420}});
  text(s,"Verified journeys",942,220,260,28,15,"#111217",true,"verify-head");
  text(s,"Timer selection\n\nCancellable stop\n\nLocal checkpoint resume\n\nTV and mobile layouts\n\nKeyboard and dialog states",942,268,260,260,16,"#4C4E56",false,"verify-list");
  text(s,"Sandbox deployed\nRepository host ready",942,560,260,54,16,ORANGE,true,"deployment-status");
  notes(s,"Source: deployed prototype screenshot and release verification completed 2026-11-09.");
}

// 7 Measurement
{
  const s=base("Measurement framework","Targets guide decisions. They do not represent measured results.",7);
  table(s,["Question","Primary measure","Decision use"],[
    ["Do viewers activate it?","Activation rate","Desirability"],
    ["Does the timer complete?","Controlled stop completion","Core value"],
    ["Is the stop unwanted?","Cancel and immediate restart","Trust guardrail"],
    ["Does recovery help?","Checkpoint choice and correction","Resume value"],
    ["Does behaviour change?","Avoided continuation minutes","Operational input"],
    ["Does retention change?","Experiment retention delta","Future evidence only"],
  ],72,215,1136,420,[390,390,356]);
  notes(s,"Sources: phase-3/04-measurement-event-dictionary.md; phase-1/07-analysis-framework.md.");
}

// 8 Value case
{
  const s=base("Gate 4 conclusion","The model can calculate stream hours under assumptions. Missing internal inputs prevent a positive financial conclusion.",8);
  table(s,["Value pathway","Conservative treatment","Reason"],[
    ["Retention","Zero","No causal evidence"],
    ["Premium conversion","Zero","No observed conversion"],
    ["Avoided stream hours","Computable","Requires behavioural assumptions"],
    ["Marginal delivery value","Unavailable","Not public evidence"],
    ["Build and operating cost","Unavailable","Requires authorized estimates"],
  ],72,220,1136,330,[360,320,456]);
  text(s,"Gate 4 closed as not demonstrated, rather than failed.",72,585,820,34,22,"#111217",true,"gate-conclusion");
  text(s,"Approval closes the evidence review. It does not approve an investment case.",72,625,1000,28,15,"#555761",false,"gate-caveat");
  notes(s,"Sources: phase-4/01-value-case-methodology.md; phase-4/02-normalized-scenario-results.md; phase-4/03-gate-4-decision.md.");
}

// 9 Roadmap
{
  const s=base("Future evidence roadmap","Each stage must produce the evidence needed for the next decision.",9);
  const rows=[
    ["1","Authorized discovery","Frequency, severity, desirability"],
    ["2","Usability pilot","Task success and correction"],
    ["3","Instrumented experiment","Activation, completion, avoided minutes"],
    ["4","Economic review","Marginal value and build and run costs"],
    ["5","Feasibility tracks","Privacy, sync, certification, reliability"],
  ];
  rows.forEach((d,i)=>{
    const y=215+i*82;
    text(s,d[0],72,y,52,42,18,ORANGE,true,`road-num-${i}`);
    text(s,d[1],138,y,350,42,18,"#111217",true,`road-title-${i}`);
    text(s,d[2],510,y,640,42,17,"#565861",false,`road-evidence-${i}`);
    rect(s,138,y+55,1010,1,"#E1E2E6","#E1E2E6",`road-line-${i}`);
  });
  notes(s,"Source: final case study roadmap and future evidence backlog.");
}

// 10 Close
{
  const s=base("Final portfolio position","A complete concept to decision case with a bounded pilot and an honest investment conclusion.",10);
  text(s,"Viewer problem",72,245,270,28,14,ORANGE,true,"close-label-1");
  text(s,"Credible context",72,282,300,46,25,"#111217",true,"close-value-1");
  text(s,"Pilot",455,245,200,28,14,ORANGE,true,"close-label-2");
  text(s,"Bounded and deployable",455,282,350,46,25,"#111217",true,"close-value-2");
  text(s,"Economics",850,245,200,28,14,ORANGE,true,"close-label-3");
  text(s,"Not demonstrated",850,282,330,46,25,"#111217",true,"close-value-3");
  rect(s,72,375,1136,1,"#D7D8DD","#D7D8DD","close-rule");
  text(s,"The original concept remains archived for traceability. The active release reflects the evidence.",72,425,1100,80,24,"#18191E",true,"close-statement");
  text(s,"github.com/dudedumebi-gif/netflix-after-hours-product-case",72,565,900,28,15,"#5E6069",false,"repo-link");
  notes(s,"Source: PROJECT_STATUS.md and final repository release.");
}

for (const [i,slide] of p.slides.items.entries()) {
  const blob=await p.export({slide,format:"png",scale:1});
  await fs.writeFile(path.join(buildDir,`slide-${String(i+1).padStart(2,"0")}.png`),new Uint8Array(await blob.arrayBuffer()));
}
const montage=await p.export({format:"webp",montage:true,scale:1});
await fs.writeFile(path.join(buildDir,"montage.webp"),new Uint8Array(await montage.arrayBuffer()));

const SKILL_DIR="/root/.codex/skills/builtins/presentations";
const { finalizePresentation } = await import(pathToFileURL(path.join(SKILL_DIR,"container_tools/artifact_tool_utils.mjs")).href);
const stagingDir=path.join(workspaceDir,".codex-finalizer");
await fs.mkdir(stagingDir,{recursive:true});
const candidatePath=path.join(stagingDir,"candidate.pptx");
await (await PresentationFile.exportPptx(p)).save(candidatePath);
const requirements={
  explicitTotalSlideCount:10,
  requiredNativeTableOwnerSlides:[2,3,4,7,8],
  requiredNativeChartOwnerSlides:[],
};
await finalizePresentation({
  ...requirements,
  workspaceDir,
  candidatePath,
  finalPath:FINAL_PPTX,
  pythonExecutable:process.env.CODEX_PRIMARY_RUNTIME_PYTHON,
  integrityValidatorPath:path.join(SKILL_DIR,"container_tools/inspect_presentation_package_integrity.py"),
  layoutValidatorPath:path.join(SKILL_DIR,"container_tools/inspect_presentation_layout_geometry.py"),
  layoutArgs:["--expected-slide-size-emu","12192000,6858000","--validate-heading-fit",...requirements.requiredNativeTableOwnerSlides.flatMap(n=>["--require-native-table-slide",String(n)])],
  requiredNativeTableOwnerSlides:requirements.requiredNativeTableOwnerSlides,
  fontPolicy:{basis:"design",families:[FONT]},
  verifyArtifactToolImport:true,
  receiptPath:path.join(stagingDir,"executive-release-deck.validation.json"),
});
console.log(FINAL_PPTX);
