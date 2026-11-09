import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const source = await readFile('index.html', 'utf8');
const built = await readFile('dist/index.html', 'utf8');
const prototype = await readFile('prototype/index.html', 'utf8');

test('build output matches the repository deploy entry', () => {
  const hash = value => createHash('sha256').update(value).digest('hex');
  assert.equal(hash(built), hash(source));
  assert.equal(hash(prototype), hash(source));
});

test('prototype has no external runtime dependencies', () => {
  assert.doesNotMatch(source, /<(script|link)[^>]+(?:src|href)=["']https?:/i);
  assert.doesNotMatch(source, /url\(["']?https?:/i);
});

test('prototype exposes all release journeys and independence statement', () => {
  for (const marker of ['scene-timer', 'scene-transition', 'scene-resume', 'timerDialog', 'Not affiliated with']) {
    assert.match(source, new RegExp(marker));
  }
});

test('dialog and device controls expose accessible state', () => {
  assert.match(source, /role="dialog"/);
  assert.match(source, /aria-modal="true"/);
  assert.match(source, /aria-pressed=/);
  assert.match(source, /prefers-reduced-motion/);
});
