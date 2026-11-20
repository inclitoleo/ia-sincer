#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const files = ['en/SKILL.md', 'pt_br/SKILL.md'];
const measurements = [];

for (const relativePath of files) {
  const content = fs.readFileSync(path.join(root, relativePath), 'utf8').replace(/\r\n/g, '\n');
  const frontmatter = content.match(/^---\n([\s\S]*?)\n---\n/);

  if (!frontmatter) throw new Error(`${relativePath}: missing YAML frontmatter`);
  if (!/^name: ai-sincer$/m.test(frontmatter[1])) {
    throw new Error(`${relativePath}: expected name: ai-sincer`);
  }

  const description = frontmatter[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();
  if (!description) throw new Error(`${relativePath}: missing description`);
  if (description.length > 500) {
    throw new Error(`${relativePath}: description is too broad (${description.length}/500 characters)`);
  }

  const words = content.trim().split(/\s+/u).length;
  if (words > 1200) {
    throw new Error(`${relativePath}: context budget exceeded (${words}/1200 words)`);
  }

  measurements.push({ relativePath, words });
}

const [english, portuguese] = measurements;
const parityDelta = Math.abs(english.words - portuguese.words) / Math.max(english.words, portuguese.words);
if (parityDelta > 0.1) {
  throw new Error(`language versions diverged by ${(parityDelta * 100).toFixed(1)}%`);
}

console.log(
  `Skills valid: ${measurements.map(({ relativePath, words }) => `${relativePath}=${words} words`).join(', ')}`,
);
