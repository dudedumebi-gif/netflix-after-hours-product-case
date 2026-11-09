"""Static Gate 3 audit for the single-file portfolio prototype.

This audit does not replace assistive-technology or real-browser testing.
"""

from pathlib import Path
from lxml import html
import json
import re
import sys


prototype = Path(__file__).resolve().parents[2] / "prototype" / "index.html"
source = prototype.read_text(encoding="utf-8")
doc = html.fromstring(source)
checks = []


def record(name, passed, detail=""):
    checks.append({"name": name, "passed": bool(passed), "detail": detail})


ids = doc.xpath("//*[@id]/@id")
duplicates = sorted({item for item in ids if ids.count(item) > 1})
record("No duplicate IDs", not duplicates, str(duplicates))

unnamed_buttons = []
for index, button in enumerate(doc.xpath("//button")):
    text = " ".join("".join(button.itertext()).split())
    name = (button.get("aria-label") or text).strip()
    if not name:
        unnamed_buttons.append(index)
record("All buttons have accessible names", not unnamed_buttons, str(unnamed_buttons))

unnamed_inputs = []
for index, input_element in enumerate(doc.xpath("//input")):
    if not (input_element.get("aria-label") or input_element.get("aria-labelledby")):
        unnamed_inputs.append(index)
record("All inputs have accessible names", not unnamed_inputs, str(unnamed_inputs))

record("Document language declared", doc.get("lang") == "en")
record("Responsive viewport declared", bool(doc.xpath("//meta[@name='viewport']")))
record("Single main landmark", len(doc.xpath("//main")) == 1)
record("Single primary heading", len(doc.xpath("//h1")) == 1)

dialog = doc.xpath("//*[@id='timer-modal']")
dialog = dialog[0] if dialog else None
record("Timer uses modal dialog semantics", dialog is not None and dialog.get("role") == "dialog" and dialog.get("aria-modal") == "true")
label_id = dialog.get("aria-labelledby") if dialog is not None else None
record("Timer dialog has programmatic title", bool(label_id and doc.xpath(f"//*[@id='{label_id}']")))
record("Timer trigger declares dialog relationship", bool(doc.xpath("//*[@id='moon-timer-btn'][@aria-haspopup='dialog'][@aria-controls='timer-modal']")))

record("Visible independence disclaimer present", "Independent portfolio concept" in source and "Not affiliated with Netflix" in source)
forbidden = ["Deep Sleep", "Power Nap", "Auto-detect sleep", "Low Pass", "Frequency Cutoff", "PREMIUM"]
present = [term for term in forbidden if term.lower() in source.lower()]
record("Rejected product claims absent", not present, str(present))

record("Checkpoint and standard resume choices present", "Use checkpoint 14:20" in source and "Use standard position 42:15" in source)
record("Versioned local checkpoint represented", "schemaVersion: 1" in source and "checkpointStorageKey" in source)
record("Checkpoint expiry represented", "expiresAt" in source and "localStorage.removeItem" in source)
record("No health-data collection represented", "No wearable or health data is used" in source)
record("Escape close implemented", "event.key === 'Escape'" in source)
record("Modal focus containment implemented", "event.key === 'Tab'" in source and "focusable" in source)
record("Reduced-motion preference implemented", "prefers-reduced-motion: reduce" in source)
record("Responsive frame width bounded", source.count("calc(100vw - 32px)") >= 3)
record("Third-party scripts fail safely", source.count("if (window.lucide)") >= 2)

external_dependencies = doc.xpath("//script[@src]/@src") + re.findall(r"url\(['\"]?(https://[^)'\"]+)", source)
record("External prototype dependencies documented", bool(external_dependencies), json.dumps(external_dependencies))

failed = [item for item in checks if not item["passed"]]
result = {
    "evidence_type": "static expert/technical audit",
    "summary": {"total": len(checks), "passed": len(checks) - len(failed), "failed": len(failed)},
    "checks": checks,
    "limitations": [
        "No assistive-technology user test was performed.",
        "No real-browser visual or responsive session was available in the execution environment.",
        "External CDN and image dependencies remain acceptable only for the portfolio prototype, not a production pilot."
    ]
}
print(json.dumps(result, indent=2))
sys.exit(1 if failed else 0)
