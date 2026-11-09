from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.enum.section import WD_SECTION
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.enum.style import WD_STYLE_TYPE
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "case-study"
OUT.mkdir(exist_ok=True)
DOCX = OUT / "Netflix_After_Hours_Final_Case_Study.docx"
IMAGE = ROOT / "prototype-deployed.jpg"

doc = Document()
sec = doc.sections[0]
sec.page_width, sec.page_height = Inches(8.5), Inches(11)
sec.top_margin = Inches(.65)
sec.bottom_margin = Inches(.65)
sec.left_margin = Inches(.75)
sec.right_margin = Inches(.75)

styles = doc.styles
styles["Normal"].font.name = "Aptos"
styles["Normal"].font.size = Pt(10.5)
styles["Normal"].font.color.rgb = RGBColor.from_string("24252A")
styles["Normal"].paragraph_format.space_after = Pt(7)
styles["Normal"].paragraph_format.line_spacing = 1.12
for s, size in [("Title", 30), ("Heading 1", 20), ("Heading 2", 13)]:
    styles[s].font.name = "Aptos Display"
    styles[s].font.size = Pt(size)
    styles[s].font.bold = True
    styles[s].font.color.rgb = RGBColor(0, 0, 0)
    styles[s].paragraph_format.space_before = Pt(8)
    styles[s].paragraph_format.space_after = Pt(8)

if "Eyebrow" not in styles:
    eyebrow = styles.add_style("Eyebrow", WD_STYLE_TYPE.PARAGRAPH)
    eyebrow.font.name = "Aptos"
    eyebrow.font.size = Pt(8)
    eyebrow.font.bold = True
    eyebrow.font.color.rgb = RGBColor.from_string("D64F20")
    eyebrow.paragraph_format.space_after = Pt(7)

def shade(cell, fill):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = tcPr.find(qn("w:shd"))
    if shd is None:
        shd = OxmlElement("w:shd")
        tcPr.append(shd)
    shd.set(qn("w:fill"), fill)

def borders(table, color="D9D9D9"):
    tblPr = table._tbl.tblPr
    el = tblPr.find(qn("w:tblBorders"))
    if el is None:
        el = OxmlElement("w:tblBorders")
        tblPr.append(el)
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        node = OxmlElement(f"w:{edge}")
        node.set(qn("w:val"), "single")
        node.set(qn("w:sz"), "4")
        node.set(qn("w:color"), color)
        el.append(node)

def set_cell_margin(cell, top=110, start=120, bottom=110, end=120):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    tcMar = tcPr.first_child_found_in("w:tcMar")
    if tcMar is None:
        tcMar = OxmlElement("w:tcMar")
        tcPr.append(tcMar)
    for m, v in (("top", top), ("start", start), ("bottom", bottom), ("end", end)):
        node = tcMar.find(qn(f"w:{m}"))
        if node is None:
            node = OxmlElement(f"w:{m}")
            tcMar.append(node)
        node.set(qn("w:w"), str(v))
        node.set(qn("w:type"), "dxa")

def add_table(headers, rows, widths=None):
    table = doc.add_table(rows=1, cols=len(headers))
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    borders(table)
    for i, h in enumerate(headers):
        c = table.rows[0].cells[i]
        c.text = h
        shade(c, "262833")
        c.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
        for r in c.paragraphs[0].runs:
            r.font.bold = True; r.font.color.rgb = RGBColor(255,255,255); r.font.size = Pt(9)
    for ri, row in enumerate(rows):
        cells = table.add_row().cells
        for i, value in enumerate(row):
            cells[i].text = str(value)
            cells[i].vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
            if ri % 2: shade(cells[i], "F4F5F7")
            for p in cells[i].paragraphs:
                p.paragraph_format.space_after = Pt(0)
                for r in p.runs: r.font.size = Pt(8.7)
    if widths:
        for row in table.rows:
            for i, width in enumerate(widths): row.cells[i].width = Inches(width)
    for row in table.rows:
        for c in row.cells: set_cell_margin(c)
    doc.add_paragraph().paragraph_format.space_after = Pt(0)
    return table

def bullet(text):
    p = doc.add_paragraph(style="List Bullet")
    p.add_run(text)
    p.paragraph_format.space_after = Pt(4)
    return p

def page_title(number, title, intro):
    p = doc.add_paragraph(f"{number}  PRODUCT CASE", style="Eyebrow")
    p = doc.add_paragraph(title, style="Heading 1")
    p.paragraph_format.keep_with_next = True
    doc.add_paragraph(intro)

def new_page():
    doc.add_page_break()

def add_footer(section):
    footer = section.footer
    p = footer.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run("NETFLIX AFTER HOURS  ·  INDEPENDENT PORTFOLIO CASE  ·  CHIDUMEBI NKWO")
    run.font.name = "Aptos"; run.font.size = Pt(7); run.font.color.rgb = RGBColor.from_string("777982")

add_footer(sec)

# Cover
doc.add_paragraph("INDEPENDENT PRODUCT MANAGEMENT CASE STUDY", style="Eyebrow")
t = doc.add_paragraph("Netflix After Hours", style="Title")
t.paragraph_format.space_after = Pt(3)
p = doc.add_paragraph("Evidence aligned late night viewing concept and deployment ready interactive prototype")
p.style = styles["Subtitle"]
p.runs[0].font.color.rgb = RGBColor.from_string("5D5F68")
doc.add_paragraph("Chidumebi Nkwo  |  AI Product Manager  |  November 2026")
doc.add_paragraph().add_run().add_picture(str(IMAGE), width=Inches(6.95))
cap = doc.add_paragraph("The evidence-aligned release shows a manual bedtime timer, controlled stop, local checkpoint, and two explicit resume choices.")
cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
cap.runs[0].font.size = Pt(8); cap.runs[0].font.italic = True; cap.runs[0].font.color.rgb = RGBColor.from_string("666872")
doc.add_paragraph("This is an independent portfolio concept. It was not produced for or with Netflix and does not represent Netflix customer research, telemetry, economics, UAT, or production delivery.")

new_page()
page_title("01", "Executive decision", "The case closes with a credible viewer problem and a deliberately bounded pilot, but without a demonstrated positive financial case.")
doc.add_heading("Decision", level=2)
doc.add_paragraph("Proceed only as a small, instrumented learning pilot if an authorized organization chooses to sponsor further validation. Do not use the current model to claim revenue, savings, ROI, or a Netflix investment decision.")
add_table(["Decision area", "Final position"], [
    ["Viewer need", "Directionally supported by independent secondary evidence"],
    ["Pilot experience", "Manual timer, cancellable dim and stop, local checkpoint, and resume choice"],
    ["Customer validation", "Not completed; future authorized research required"],
    ["Economic result", "Positive case not demonstrated"],
    ["Portfolio outcome", "Completed independent concept to decision case"],
], [1.65, 5.1])
doc.add_heading("What this case demonstrates", level=2)
bullet("Evidence governance that separates facts, hypotheses, targets, simulations, and missing inputs.")
bullet("A product-scope correction made when the original concept exceeded the available evidence.")
bullet("A complete chain from problem framing through research, prototype, measurement design, and investment decision.")
bullet("The willingness to close a gate honestly when a favourable answer cannot be supported.")

new_page()
page_title("02", "Problem and opportunity", "Late-night viewers can wake several episodes ahead, lose their true stopping point, or continue playback unintentionally. The product opportunity is to make that moment gentler and more recoverable.")
doc.add_heading("Customer job", level=2)
doc.add_paragraph("When I watch in bed and may fall asleep, help me stop playback without a disruptive interruption and return later without guessing where I was.")
doc.add_heading("Original opportunity thesis", level=2)
doc.add_paragraph("The original suite combined manual sleep controls, display dimming, sleep-point recovery, optional audio transitions, wearable automation, Premium positioning, and delivery-cost savings. It offered a broad vision but treated several unvalidated mechanisms as if they belonged in one release.")
doc.add_heading("Evidence-led reframing", level=2)
add_table(["Original assumption", "Evidence decision"], [
    ["Wearables can infer sleep reliably", "Deferred to a future feasibility track"],
    ["Advanced audio improves sleep", "Removed; no therapeutic or sleep-quality claim"],
    ["Premium prompts create conversion", "Removed from pilot and held at zero in the model"],
    ["Unattended playback creates measurable savings", "Retained only as a measurable operational hypothesis"],
    ["A fixed late-night window fits all viewers", "Replaced with user-initiated controls"],
], [2.45, 4.3])

new_page()
page_title("03", "Research strategy", "Direct Netflix customer research was not appropriate for an independent portfolio project, so Phase 2 used public secondary evidence to test the baselines without implying sponsorship or access.")
doc.add_heading("Research governance", level=2)
bullet("No respondent was represented as a Netflix customer recruited for this project.")
bullet("No internal Netflix data, product metrics, costs, or confidential information were used.")
bullet("Public evidence established context and adjacent interaction patterns, not product-specific outcomes.")
doc.add_heading("Baseline result", level=2)
add_table(["Baseline", "Disposition", "Implication"], [
    ["Bedtime viewing is a credible context", "Supported", "Continue the customer-problem track"],
    ["Manual timers are an established pattern", "Supported", "Use a familiar user-controlled interaction"],
    ["Falling asleep during paid streaming is frequent", "Unresolved", "Do not claim incidence"],
    ["Recovery choices improve satisfaction", "Unresolved", "Test desirability and correction rate"],
    ["Retention or conversion improves", "Unsupported", "Set financial contribution to zero"],
    ["Delivery savings are material", "Unresolved", "Require internal marginal-value inputs"],
], [2.3, 1.15, 3.3])
doc.add_paragraph("Gate 2 therefore passed conditionally: the context was credible enough to prototype, but severity, frequency, desirability, and economics remained unvalidated.")

new_page()
page_title("04", "Pilot product", "The first viable release is intentionally small. It tests whether viewers value intentional stopping and transparent recovery before the product takes on device integrations or commercial packaging.")
doc.add_heading("Release promise", level=2)
doc.add_paragraph("Set a simple bedtime stop, receive a low-disruption warning, and return later with two clear choices about where to resume.")
add_table(["Included", "Deferred or excluded"], [
    ["15, 30, and 45 minute timers", "Wearable sleep detection"],
    ["End of episode option", "Cross-device checkpoint synchronization"],
    ["Gradual display dimming", "Binaural or therapeutic audio"],
    ["Immediate cancellation through input", "Premium upsell"],
    ["Local checkpoint", "Fixed global late-night activation"],
    ["Checkpoint and latest-position choices", "Quantified retention, conversion, or savings claims"],
], [3.15, 3.55])
doc.add_heading("Safety and trust principles", level=2)
bullet("User initiation and immediate cancellation take priority over automation.")
bullet("Recovery choices explain their source instead of silently changing playback history.")
bullet("Local state is sufficient for the concept; cloud synchronization requires a separate privacy and feasibility decision.")

new_page()
page_title("05", "Experience design", "The prototype demonstrates three linked user journeys across TV, tablet, and mobile layouts. Each state is fictional and instrumented only in the browser session.")
doc.add_paragraph().add_run().add_picture(str(IMAGE), width=Inches(6.95))
add_table(["Journey", "User action", "Product response"], [
    ["Set timer", "Choose 15, 30, 45 minutes, or episode end", "Confirm the choice without leaving playback"],
    ["Stop gently", "Allow the countdown or cancel through input", "Dim, show a clear countdown, then save locally"],
    ["Resume clearly", "Choose checkpoint or latest position", "Resume from the explicitly selected state"],
], [1.25, 2.45, 3.0])

new_page()
page_title("06", "Prototype verification", "The release was rebuilt as a self-contained static application so it can be audited, deployed, and reviewed without third-party runtime dependencies.")
add_table(["Verification area", "Result"], [
    ["Build parity", "Root, prototype mirror, and static deployment output match"],
    ["Runtime dependencies", "No external scripts, fonts, images, APIs, analytics, or storage calls"],
    ["Interaction paths", "Timer, controlled stop, resume choice, and device switching rendered successfully"],
    ["Keyboard and dialog behaviour", "Focus state, Escape close, focus trap, and reduced-motion support implemented"],
    ["Browser console", "No application errors observed; extension-only messages excluded"],
    ["Deployment", "Private sandbox deployment completed; repository remains host-ready"],
], [2.1, 4.65])
doc.add_heading("Maturity boundary", level=2)
doc.add_paragraph("Deployment verifies the front-end interaction package. It does not establish a production service, Netflix integration, telemetry pipeline, cloud synchronization, device certification, security review, or UAT completion.")
doc.add_heading("Repository release", level=2)
doc.add_paragraph("The active release is available in the public GitHub repository with a one-command check, static-host instructions, archived original artifacts, and the full decision trail.")

new_page()
page_title("07", "Measurement and experiment design", "The pilot is designed to learn whether viewers use the control, accept the stop, recover successfully, and avoid unwanted interruptions. Targets are decision thresholds, not results.")
add_table(["Question", "Primary measure", "Decision use"], [
    ["Do eligible viewers activate it?", "Activation rate", "Desirability and discoverability"],
    ["Does the timer complete as intended?", "Controlled-stop completion", "Core interaction value"],
    ["Is the stop unwanted?", "Cancellation and immediate restart", "Guardrail and trust"],
    ["Does recovery help?", "Checkpoint selection and correction", "Resume-value validation"],
    ["Does behaviour change?", "Avoided continuation minutes", "Operational value input"],
    ["Does it affect retention?", "Experiment retention delta", "Future commercial evidence only"],
], [2.0, 2.25, 2.5])
doc.add_heading("Evidence labels", level=2)
doc.add_paragraph("Observed telemetry, experiment estimates, model assumptions, research benchmarks, and product targets must remain separate fields in any dashboard or decision memo. Synthetic metrics can validate computation but cannot validate customer behaviour.")

new_page()
page_title("08", "Value case", "The normalized model can calculate physical stream-hours under labelled assumptions, but it cannot support a positive financial conclusion without internal marginal-value and cost inputs.")
add_table(["Value pathway", "Conservative treatment", "Reason"], [
    ["Retention", "Zero", "No causal customer evidence"],
    ["Premium conversion", "Zero", "No observed conversion evidence"],
    ["Avoided stream-hours", "Computable", "Requires assumed activation, completion, and minutes"],
    ["Marginal delivery value", "Unavailable", "Not available from public evidence"],
    ["Implementation cost", "Unavailable", "Requires engineering and certification estimates"],
    ["Operating cost", "Unavailable", "Requires an authorized operating model"],
], [2.0, 1.6, 3.15])
doc.add_heading("Gate 4 conclusion", level=2)
doc.add_paragraph("Gate 4 closed as not demonstrated rather than failed. The product hypothesis was not disproven; the investment conclusion could not be evaluated responsibly with the evidence available to an independent portfolio case.")
doc.add_paragraph("Approval of this disposition records a completed decision process. It is not approval of a positive business case.")

new_page()
page_title("09", "Roadmap and future evidence", "Any future work should earn the right to expand the concept. Evidence precedes feature growth.")
add_table(["Stage", "Outcome", "Evidence required to advance"], [
    ["1  Authorized discovery", "Estimate frequency, severity, and desirability", "Recruitment approval and documented sample"],
    ["2  Usability pilot", "Validate timer and resume comprehension", "Task success, correction, unwanted-stop evidence"],
    ["3  Instrumented experiment", "Measure behaviour change", "Eligible sessions, activation, completion, avoided minutes"],
    ["4  Economic review", "Reopen Gate 4", "Marginal value plus build and run cost estimates"],
    ["5  Feasibility tracks", "Consider sync and wearables", "Privacy, platform, certification, and reliability proof"],
], [1.55, 2.2, 3.0])
doc.add_heading("Future evidence backlog", level=2)
doc.add_paragraph("The backlog should be managed as evidence work, not assumed delivery scope. Each item must name the decision it unlocks, the evidence class it produces, and the claim it is permitted to change.")

new_page()
page_title("10", "Product leadership reflection", "The strongest outcome of this case is not a favourable forecast. It is a more defensible product decision and a clear record of how the concept changed under evidence.")
doc.add_heading("What changed", level=2)
doc.add_paragraph("The original concept was broad and visually compelling, but it combined customer, technical, health, and commercial assumptions. Research narrowed the pilot to a user-controlled interaction that can be tested without making unsupported claims. The original suite remains archived as a traceable learning artifact.")
doc.add_heading("What I would do inside an authorized organization", level=2)
bullet("Partner with legal, research, privacy, finance, playback, and device-platform owners before recruitment or instrumentation.")
bullet("Run a small usability study before exposing any stop automation to live viewing sessions.")
bullet("Pre-register success and guardrail thresholds, then hold the financial gate until internal cost inputs exist.")
bullet("Use the first release to learn, not to justify the original concept retroactively.")
doc.add_heading("Final portfolio statement", level=2)
doc.add_paragraph("Netflix After Hours is a completed independent concept-to-decision product case with a deployment-ready interactive prototype. The viewer problem is credible, the first pilot is bounded, and the evidence gaps are explicit. Customer validation, production feasibility, and positive economics remain future work.")
doc.add_paragraph("Repository: https://github.com/dudedumebi-gif/netflix-after-hours-product-case")
doc.add_paragraph("Portfolio: https://dumebi-ai-ba-portfolio.dudedumebi.chatgpt.site/")

doc.core_properties.title = "Netflix After Hours Final Product Case Study"
doc.core_properties.subject = "Independent evidence aligned product management portfolio case"
doc.core_properties.author = "Chidumebi Nkwo"
doc.core_properties.keywords = "AI Product Manager, product strategy, research, prototype, business case"
doc.save(DOCX)
print(DOCX)
