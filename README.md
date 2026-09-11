# AI SINCER (ia-sincer)

> A system skill & prompt designed to turn AI assistants into pragmatic, no-nonsense technical advisors. It eliminates verbose answers, unnecessary lists of options, and condescending validation, prioritizing the single best technical solution while demanding clarity from the user whenever context is weak or flawed.

Available in:
- 🇺🇸 **[English (en)](en/SKILL.md)** (Default)
- 🇧🇷 **[Portuguese (pt_br)](pt_br/SKILL.md)**

---

## ⚡ 1-Command Quick Install

Run the interactive installer or specify your target AI directly in the command:

### 🤖 Via NPX (NPM Registry)
```bash
# Interactive menu (Default: English)
npx ia-sincer

# Install to a specific AI assistant
npx ia-sincer claude
npx ia-sincer gemini
npx ia-sincer codex
npx ia-sincer all
```

> 💡 **Language Selection:** By default, the installer deploys the English version. To install the Portuguese version, add `pt` to the command (e.g. `npx ia-sincer claude pt`).

---

### 💻 Via Curl / Bash
```bash
# Interactive menu
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/install.sh | bash

# Target-specific install
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/install.sh | bash -s -- claude
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/install.sh | bash -s -- gemini
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/install.sh | bash -s -- codex
```

---

## 🎯 Core Principles

1. **Active Sincerity:** Confronts flawed premises directly and demands better context when input is weak or ambiguous.
2. **Opinionated Default:** Always recommends and executes the single best technical solution instead of dumping endless options.
3. **No Flattery or Filler:** Zero preambles, no performative apologies, no emojis, and no unsolicited option lists.
4. **Factual Rigor:** Distinguishes verified facts from inferences and unverified points.

---

## 🛠️ Manual Installation Guide

### 1. 🤖 Claude Code (Anthropic CLI)
Append the skill instructions to your global or project `CLAUDE.md`:
```bash
mkdir -p ~/.claude
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/en/SKILL.md >> ~/.claude/CLAUDE.md
```

### 2. ♊ Google Antigravity / Gemini CLI (`agy`)
Save the skill file to your global Antigravity skills directory:
```bash
mkdir -p ~/.gemini/config/skills/ai-sincer
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/en/SKILL.md -o ~/.gemini/config/skills/ai-sincer/SKILL.md
```

### 3. 💻 OpenAI Codex / Custom System Prompts
Append the skill instructions to your global Codex instructions file:
```bash
mkdir -p ~/.codex
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/en/SKILL.md >> ~/.codex/instructions.md
```

### 4. 🐳 DeepSeek (Web UI, API, Open-WebUI, Ollama)
Copy the content of [en/SKILL.md](en/SKILL.md) (or [pt_br/SKILL.md](pt_br/SKILL.md)) into your Custom Instructions or API `system` message parameter.

---

## 📁 Repository Structure

```
ia-sincer/
├── README.md
├── install.sh        # Interactive Bash installer
├── package.json      # Node CLI config
├── bin/
│   └── cli.js        # Interactive Node CLI
├── en/
│   └── SKILL.md      # English Skill (Default)
└── pt_br/
    └── SKILL.md      # Portuguese Skill
```

---

## 📄 License

MIT License - feel free to use, modify, and distribute.
