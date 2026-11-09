import { cp, mkdir } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
await mkdir('prototype', { recursive: true });
await cp('index.html', 'dist/index.html');
await cp('index.html', 'prototype/index.html');
console.log('Built dist/index.html and prototype/index.html');
