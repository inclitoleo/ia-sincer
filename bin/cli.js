#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const os = require('os');

const homeDir = os.homedir();
const args = process.argv.slice(2);

let lang = 'pt_br';
if (args.includes('--en') || args.includes('--english')) {
  lang = 'en';
}

const rawUrl = `https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/${lang}/SKILL.md`;

console.log(`\x1b[34m\x1b[1m🚀 Installing IA SINCER (${lang})...\x1b[0m`);

function fetchSkill(url) {
  return new Promise((resolve, reject) => {
    // Try local file first if running inside local repo
    const localPath = path.join(__dirname, '..', lang, 'SKILL.md');
    if (fs.existsSync(localPath)) {
      return resolve(fs.readFileSync(localPath, 'utf8'));
    }

    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download skill: HTTP ${res.statusCode}`));
      }
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  try {
    const content = await fetchSkill(rawUrl);
    let installed = 0;

    // 1. Antigravity / Gemini
    const geminiDir = path.join(homeDir, '.gemini', 'config', 'skills', 'ai-sincer');
    fs.mkdirSync(geminiDir, { recursive: true });
    fs.writeFileSync(path.join(geminiDir, 'SKILL.md'), content, 'utf8');
    console.log(`  \x1b[32m✓\x1b[0m Installed to Gemini/Antigravity: \x1b[1m${path.join(geminiDir, 'SKILL.md')}\x1b[0m`);
    installed++;

    // 2. Claude Code
    const claudeDir = path.join(homeDir, '.claude');
    const claudeFile = path.join(claudeDir, 'CLAUDE.md');
    fs.mkdirSync(claudeDir, { recursive: true });
    let claudeExisting = fs.existsSync(claudeFile) ? fs.readFileSync(claudeFile, 'utf8') : '';
    if (!claudeExisting.includes('AI SINCER')) {
      fs.appendFileSync(claudeFile, `\n\n# AI SINCER SKILL\n\n${content}`, 'utf8');
      console.log(`  \x1b[32m✓\x1b[0m Appended to Claude Code global instructions: \x1b[1m${claudeFile}\x1b[0m`);
    } else {
      console.log(`  \x1b[33mℹ\x1b[0m Claude Code instructions already contain IA SINCER.`);
    }
    installed++;

    // 3. OpenAI Codex
    const codexDir = path.join(homeDir, '.codex');
    const codexFile = path.join(codexDir, 'instructions.md');
    fs.mkdirSync(codexDir, { recursive: true });
    let codexExisting = fs.existsSync(codexFile) ? fs.readFileSync(codexFile, 'utf8') : '';
    if (!codexExisting.includes('AI SINCER')) {
      fs.appendFileSync(codexFile, `\n\n# AI SINCER SKILL\n\n${content}`, 'utf8');
      console.log(`  \x1b[32m✓\x1b[0m Appended to Codex global instructions: \x1b[1m${codexFile}\x1b[0m`);
    } else {
      console.log(`  \x1b[33mℹ\x1b[0m Codex instructions already contain IA SINCER.`);
    }
    installed++;

    console.log(`\n\x1b[32m\x1b[1m✨ Installation complete! (${installed} target(s) configured)\x1b[0m`);
  } catch (err) {
    console.error(`\x1b[31mError during installation:\x1b[0m`, err.message);
    process.exit(1);
  }
}

run();
