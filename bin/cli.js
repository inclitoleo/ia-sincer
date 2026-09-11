#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const os = require('os');
const readline = require('readline');

const homeDir = os.homedir();
const args = process.argv.slice(2).map((a) => a.toLowerCase().trim());

// Language resolution: default to 'en' if not specified or if 'en' is requested, 'pt_br' if requested
let lang = 'en';
let langSetExplicitly = false;

if (args.includes('pt') || args.includes('pt_br') || args.includes('portuguese') || args.includes('--pt') || args.includes('--pt_br')) {
  lang = 'pt_br';
  langSetExplicitly = true;
}
if (args.includes('en') || args.includes('english') || args.includes('--en') || args.includes('--english')) {
  lang = 'en';
  langSetExplicitly = true;
}

// Support positional args or flags: 'gemini', 'claude', 'codex', 'all'
let targetArg = null;
if (args.includes('gemini') || args.includes('--gemini')) targetArg = 'gemini';
if (args.includes('claude') || args.includes('--claude')) targetArg = 'claude';
if (args.includes('codex') || args.includes('--codex')) targetArg = 'codex';
if (args.includes('all') || args.includes('--all')) targetArg = 'all';

const targetIdx = args.findIndex((a) => a === '--target' || a.startsWith('--target='));
if (targetIdx !== -1) {
  if (args[targetIdx].includes('=')) {
    targetArg = args[targetIdx].split('=')[1];
  } else if (args[targetIdx + 1]) {
    targetArg = args[targetIdx + 1];
  }
}

function fetchSkill(url, selectedLang) {
  return new Promise((resolve, reject) => {
    const localPath = path.join(__dirname, '..', selectedLang, 'SKILL.md');
    if (fs.existsSync(localPath)) {
      return resolve(fs.readFileSync(localPath, 'utf8'));
    }

    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          return reject(new Error(`Failed to download skill: HTTP ${res.statusCode}`));
        }
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      })
      .on('error', reject);
  });
}

function promptInteractive() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log(`\x1b[36m\x1b[1m\nIA SINCER - Skill Installer / Instalador de Skill\x1b[0m`);
    console.log(`Select target AI / Selecione a IA de destino:`);
    console.log(`  \x1b[1m1)\x1b[0m All AIs / Todas (Claude Code, Gemini & Codex) [Default/Padrão]`);
    console.log(`  \x1b[1m2)\x1b[0m Claude Code (Anthropic)`);
    console.log(`  \x1b[1m3)\x1b[0m Gemini / Google Antigravity (\`agy\`)`);
    console.log(`  \x1b[1m4)\x1b[0m OpenAI Codex / Cursor`);
    console.log(`  \x1b[1m5)\x1b[0m Cancel & Exit / Sair`);

    rl.question(`\nEnter choice / Digite a opção [1-5] (default: 1): `, (answer) => {
      answer = answer.trim().toLowerCase();
      if (answer === '5' || answer === 's' || answer === 'q' || answer === 'exit' || answer === 'sair' || answer === 'cancel') {
        rl.close();
        return resolve({ targets: null, selectedLang: lang });
      }

      let targets = { gemini: true, claude: true, codex: true };
      if (answer === '2') targets = { gemini: false, claude: true, codex: false };
      else if (answer === '3') targets = { gemini: true, claude: false, codex: false };
      else if (answer === '4') targets = { gemini: false, claude: false, codex: true };

      if (!langSetExplicitly) {
        console.log(`\nSkill Language / Idioma da Skill:`);
        console.log(`  \x1b[1m1)\x1b[0m English [Default]`);
        console.log(`  \x1b[1m2)\x1b[0m Português (Brasil)`);
        rl.question(`Choose language / Escolha o idioma [1-2] (default: 1): `, (langAns) => {
          langAns = langAns.trim();
          rl.close();
          const selectedLang = langAns === '2' ? 'pt_br' : 'en';
          resolve({ targets, selectedLang });
        });
      } else {
        rl.close();
        resolve({ targets, selectedLang: lang });
      }
    });
  });
}

async function run() {
  try {
    let targets = { gemini: true, claude: true, codex: true };
    let selectedLang = lang;

    if (targetArg) {
      if (targetArg === 'gemini') targets = { gemini: true, claude: false, codex: false };
      else if (targetArg === 'claude') targets = { gemini: false, claude: true, codex: false };
      else if (targetArg === 'codex') targets = { gemini: false, claude: false, codex: true };
      else if (targetArg === 'all') targets = { gemini: true, claude: true, codex: true };
    } else if (process.stdin.isTTY) {
      const res = await promptInteractive();
      targets = res.targets;
      selectedLang = res.selectedLang;
    }

    if (!targets) {
      console.log(`\x1b[33mInstallation cancelled by user / Instalação cancelada.\x1b[0m`);
      process.exit(0);
    }

    const rawUrl = `https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/${selectedLang}/SKILL.md`;
    console.log(`\n\x1b[34m\x1b[1m🚀 Installing IA SINCER (${selectedLang})...\x1b[0m`);
    const content = await fetchSkill(rawUrl, selectedLang);
    let installed = 0;

    // 1. Claude Code
    if (targets.claude) {
      const claudeDir = path.join(homeDir, '.claude');
      const claudeFile = path.join(claudeDir, 'CLAUDE.md');
      fs.mkdirSync(claudeDir, { recursive: true });
      let claudeExisting = fs.existsSync(claudeFile) ? fs.readFileSync(claudeFile, 'utf8') : '';
      if (!claudeExisting.includes('AI SINCER')) {
        fs.appendFileSync(claudeFile, `\n\n# AI SINCER SKILL\n\n${content}`, 'utf8');
        console.log(`  \x1b[32m✓\x1b[0m Appended to Claude Code instructions: \x1b[1m${claudeFile}\x1b[0m`);
      } else {
        console.log(`  \x1b[33mℹ\x1b[0m Claude Code instructions already contain IA SINCER.`);
      }
      installed++;
    }

    // 2. Antigravity / Gemini
    if (targets.gemini) {
      const geminiDir = path.join(homeDir, '.gemini', 'config', 'skills', 'ai-sincer');
      fs.mkdirSync(geminiDir, { recursive: true });
      fs.writeFileSync(path.join(geminiDir, 'SKILL.md'), content, 'utf8');
      console.log(`  \x1b[32m✓\x1b[0m Installed to Gemini/Antigravity: \x1b[1m${path.join(geminiDir, 'SKILL.md')}\x1b[0m`);
      installed++;
    }

    // 3. OpenAI Codex
    if (targets.codex) {
      const codexDir = path.join(homeDir, '.codex');
      const codexFile = path.join(codexDir, 'instructions.md');
      fs.mkdirSync(codexDir, { recursive: true });
      let codexExisting = fs.existsSync(codexFile) ? fs.readFileSync(codexFile, 'utf8') : '';
      if (!codexExisting.includes('AI SINCER')) {
        fs.appendFileSync(codexFile, `\n\n# AI SINCER SKILL\n\n${content}`, 'utf8');
        console.log(`  \x1b[32m✓\x1b[0m Appended to Codex instructions: \x1b[1m${codexFile}\x1b[0m`);
      } else {
        console.log(`  \x1b[33mℹ\x1b[0m Codex instructions already contain IA SINCER.`);
      }
      installed++;
    }

    if (installed === 0) {
      console.log(`\n\x1b[33mNo installation target selected.\x1b[0m`);
    } else {
      console.log(`\n\x1b[32m\x1b[1m✨ Installation complete! (${installed} target(s) configured)\x1b[0m`);
    }
  } catch (err) {
    console.error(`\x1b[31mError during installation:\x1b[0m`, err.message);
    process.exit(1);
  }
}

run();
