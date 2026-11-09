const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));

  const fileUrl = `file://${path.resolve(__dirname, '../../prototype/index.html')}`;
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });

  const checks = [];
  const check = (name, pass, detail = '') => checks.push({ name, pass: Boolean(pass), detail });

  check('Independent disclaimer visible', await page.getByText('Independent portfolio concept').isVisible());
  check('Three pilot story tabs available', await page.locator('header button[id^="btn-us"]').count() === 3);

  await page.locator('#moon-timer-btn').focus();
  await page.locator('#moon-timer-btn').click();
  check('Timer opens as modal dialog', await page.locator('#timer-modal[role="dialog"][aria-modal="true"]').isVisible());
  check('Dialog focus moves to close control', await page.evaluate(() => document.activeElement?.id === 'close-timer-btn'));
  await page.keyboard.press('Escape');
  check('Escape closes timer dialog', await page.locator('#timer-modal').evaluate(el => el.classList.contains('hidden')));
  check('Focus returns to timer control', await page.evaluate(() => document.activeElement?.id === 'moon-timer-btn'));

  await page.locator('#moon-timer-btn').click();
  await page.getByRole('button', { name: /30 min/i }).click();
  check('Timer choice updates control label', (await page.locator('#active-timer-label').innerText()) === '30m Timer');

  await page.locator('#btn-us2').click();
  await page.getByRole('button', { name: /Checkpoint & Stop/i }).click();
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('after-hours-pilot-checkpoint-v1')));
  check('Controlled stop persists versioned local checkpoint', stored?.schemaVersion === 1 && stored?.checkpointSeconds === 860);

  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.locator('#btn-us3').click();
  check('Checkpoint survives reload', (await page.locator('#checkpoint-position').innerText()) === '14:20');
  check('Checkpoint choice available', await page.getByRole('button', { name: /Use checkpoint 14:20/i }).isVisible());
  check('Standard position choice available', await page.getByRole('button', { name: /Use standard position 42:15/i }).isVisible());

  const unnamedButtons = await page.locator('button').evaluateAll(buttons => buttons
    .filter(button => !((button.getAttribute('aria-label') || button.innerText || '').trim()))
    .map(button => button.outerHTML.slice(0, 160)));
  check('All buttons have accessible names', unnamedButtons.length === 0, JSON.stringify(unnamedButtons));

  const duplicateIds = await page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map(el => el.id);
    return [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  });
  check('No duplicate element IDs', duplicateIds.length === 0, JSON.stringify(duplicateIds));

  for (const [name, width, height, viewport] of [
    ['Mobile', 390, 844, 'mobile'],
    ['Tablet', 900, 700, 'tablet'],
    ['TV', 1440, 1000, 'tv']
  ]) {
    await page.setViewportSize({ width, height });
    await page.locator(`#btn-vp-${viewport}`).click();
    const frameFits = await page.locator('#device-frame').evaluate(el => el.getBoundingClientRect().width <= window.innerWidth);
    check(`${name} frame fits viewport width`, frameFits);
  }

  check('No uncaught JavaScript errors', pageErrors.length === 0, JSON.stringify(pageErrors));

  const failed = checks.filter(item => !item.pass);
  console.log(JSON.stringify({ summary: { total: checks.length, passed: checks.length - failed.length, failed: failed.length }, checks }, null, 2));
  await browser.close();
  process.exitCode = failed.length ? 1 : 0;
})();
