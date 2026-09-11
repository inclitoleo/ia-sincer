#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const os = require('os');
const readline = require('readline');

const homeDir = os.homedir();
const args = process.argv.slice(2);

let lang = 'pt_br';
if (args.includes('--en') || args.includes('--english')) {
  lang = 'en';
}

// Check if specific target flag is provided
let targetArg = null;
const targetIdx = args.findIndex((a) => a === '--target' || a.startsWith('--target='));
if (targetIdx !== -1) {
  if (args[targetIdx].includes('=')) {
    targetArg = args[targetIdx].split('=')[1];
  } else if (args[targetIdx + 1]) {
    targetArg = args[targetIdx + 1];
  }
}

// Flags like --gemini, --claude, --codex
if (args.includes('--gemini')) targetArg = 'gemini';
if (args.includes('--claude')) targetArg = 'claude';
if (args.includes('--codex')) targetArg = 'codex';
if (args.includes('--all')) targetArg = 'all';

const rawUrl = `https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/${lang}/SKILL.md`;

function fetchSkill(url) {
  return new Promise((resolve, reject) => {
    const localPath = path.join(__dirname, '..', lang, 'SKILL.md');
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

function promptSelection() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log(`\x1b[36m\x1b[1m\nPara qual IA você deseja instalar a skill IA SINCER?\x1b[0m`);
    console.log(`  \x1b[1m1)\x1b[0m Todas (Gemini/Antigravity, Claude Code e Codex) [Padrão]`);
    console.log(`  \x1b[1m2)\x1b[0m Apenas Gemini / Google Antigravity (\`agy\`)`);
    console.log(`  \x1b[1m3)\x1b[0m Apenas Claude Code`);
    console.log(`  \x1b[1m4)\x1b[0m Apenas OpenAI Codex / Cursor`);
    console.log(`  \x1b[1m5)\x1b[0m Personalizar escolha`);

    rl.question(`\nDigite a opção desejada [1-5] (padrão: 1): `, (answer) => {
      answer = answer.trim();
      if (answer === '2') {
        rl.close();
        resolve({ gemini: true, claude: false, codex: false });
      } else if (answer === '3') {
        rl.close();
        resolve({ gemini: false, claude: true, codex: false });
      } else if (answer === '4') {
        rl.close();
        resolve({ gemini: false, claude: false, codex: true });
      } else if (answer === '5') {
        rl.question(`  Deseja instalar no Gemini/Antigravity? [S/n]: `, (ansGem) => {
          const gem = ansGem.trim().toLowerCase() !== 'n';
          rl.question(`  Deseja instalar no Claude Code? [S/n]: `, (ansCla) => {
            const cla = ansCla.trim().toLowerCase() !== 'n';
            rl.question(`  Deseja instalar no Codex/Cursor? [S/n]: `, (ansCod) => {
              const cod = ansCod.trim().toLowerCase() !== 'n';
              rl.close();
              resolve({ gemini: gem, claude: cla, codex: cod });
            });
          });
        });
      } else {
        // Default to all
        rl.close();
        resolve({ gemini: true, claude: true, codex: true });
      }
    });
  });
}

async function run() {
  try {
    let targets = { gemini: true, claude: true, codex: true };

    if (targetArg) {
      if (targetArg === 'gemini') targets = { gemini: true, claude: false, codex: false };
      else if (targetArg === 'claude') targets = { gemini: false, claude: true, codex: false };
      else if (targetArg === 'codex') targets = { gemini: false, claude: false, codex: true };
      else if (targetArg === 'all') targets = { gemini: true, claude: true, codex: true };
    } else if (process.stdin.isTTY) {
      targets = await promptSelection();
    }

    console.log(`\n\x1b[34m\x1b[1m🚀 Instalando IA SINCER (${lang})...\x1b[0m`);
    const content = await fetchSkill(rawUrl);
    let installed = 0;

    // 1. Antigravity / Gemini
    if (targets.gemini) {
      const geminiDir = path.join(homeDir, '.gemini', 'config', 'skills', 'ai-sincer');
      fs.mkdirSync(geminiDir, { recursive: true });
      fs.writeFileSync(path.join(geminiDir, 'SKILL.md'), content, 'utf8');
      console.log(`  \x1b[32m✓\x1b[0m Instalado em Gemini/Antigravity: \x1b[1m${path.join(geminiDir, 'SKILL.md')}\x1b[0m`);
      installed++;
    }

    // 2. Claude Code
    if (targets.claude) {
      const claudeDir = path.join(homeDir, '.claude');
      const claudeFile = path.join(claudeDir, 'CLAUDE.md');
      fs.mkdirSync(claudeDir, { recursive: true });
      let claudeExisting = fs.existsSync(claudeFile) ? fs.readFileSync(claudeFile, 'utf8') : '';
      if (!claudeExisting.includes('AI SINCER')) {
        fs.appendFileSync(claudeFile, `\n\n# AI SINCER SKILL\n\n${content}`, 'utf8');
        console.log(`  \x1b[32m✓\x1b[0m Adicionado às instruções globais do Claude Code: \x1b[1m${claudeFile}\x1b[0m`);
      } else {
        console.log(`  \x1b[33mℹ\x1b[0m Instruções do Claude Code já contêm a skill IA SINCER.`);
      }
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
        console.log(`  \x1b[32m✓\x1b[0m Adicionado às instruções globais do Codex: \x1b[1m${codexFile}\x1b[0m`);
      } else {
        console.log(`  \x1b[33mℹ\x1b[0m Instruções do Codex já contêm a skill IA SINCER.`);
      }
      installed++;
    }

    if (installed === 0) {
      console.log(`\n\x1b[33mNenhum destino foi selecionado para instalação.\x1b[0m`);
    } else {
      console.log(`\n\x1b[32m\x1b[1m✨ Instalação concluída! (${installed} IA(s) configurada(s))\x1b[0m`);
    }
  } catch (err) {
    console.error(`\x1b[31mErro durante a instalação:\x1b[0m`, err.message);
    process.exit(1);
  }
}

run();
