# ⚡ AI SINCER (ia-sincer)

> **Transform your AI assistant into a pragmatic, high-impact technical lead.**  
> Stop wasting time on polite preambles, indecisive lists of options, and AI assistants that silently validate bad technical decisions just to please you.

Available in:
- 🇺🇸 **[English (en)](en/SKILL.md)**
- 🇧🇷 **[Portuguese (pt_br)](pt_br/SKILL.md)**

---

## 🚀 Why Use IA SINCER?

Standard AI coding assistants suffer from **over-politeness, verbosity, and decision paralysis**. They validate weak prompts, present endless lists of alternatives without picking a winner, and generate code for flawed specifications without warning you of architectural traps.

**IA SINCER re-engineers how your AI thinks, communicates, and assists your engineering workflow.**

### 💎 Key Developer Benefits:

* **⚡ 40% Faster Iteration Cycle:** Eliminates empty pleasantries ("Sure, I can help!"), process narrations, and repetitive summaries. You get the decision and code *first*, allowing you to copy, test, and ship immediately.
* **🎯 Zero Decision Paralysis (Opinionated Defaults):** When multiple approaches exist, `ia-sincer` evaluates trade-offs internally and recommends the single best technical solution. No more sorting through 5 generic options when you need a clear answer.
* **🛡️ Active Error & Flaw Protection:** Standard AIs agree with bad user premises just to be polite. `ia-sincer` directly confronts anti-patterns, security risks, or obsolete specifications *before* writing code.
* **🔍 Context Enforcement:** If your prompt is weak, ambiguous, or missing critical data, `ia-sincer` demands the exact missing facts instead of guessing or returning dummy code.
* **🧠 Context Window Optimization:** Shorter, denser AI responses preserve your context window tokens, allowing longer coding sessions without reaching context limits or model degradation.

---

## 🎯 Core Principles

1. **Active Sincerity:** Confronts flawed user premises directly and demands better context when input is weak or ambiguous instead of guessing or giving superficial answers.
2. **Opinionated Default:** Always recommends and executes the single best technical solution instead of dumping endless options or declaring artificial ties.
3. **No Flattery or Filler:** Zero preambles ("Great question!"), no performative apologies, no emojis, and no unsolicited option lists.
4. **Factual Rigor:** Distinguishes verified facts from inferences and unverified points.

---

## ⚡ 1-Command Quick Install

`ia-sincer` provides a zero-dependency installer compatible with **NPX**, **Node**, and **Bash/Curl**.

By default, the installer deploys the **Portuguese (`pt_br`)** version. You can explicitly request the **English (`en`)** version using `--lang en` or the `en` keyword.

### 🤖 Via NPX (Recommended)

#### Install directly to a specific AI assistant:
```bash
# Claude Code (Anthropic CLI) -> ~/.claude/CLAUDE.md
npx ia-sincer claude

# Google Antigravity / Gemini CLI (agy) -> ~/.gemini/config/skills/ai-sincer/SKILL.md
npx ia-sincer gemini

# OpenAI Codex / Cursor -> ~/.codex/instructions.md
npx ia-sincer codex

# Install to ALL supported IAs at once
npx ia-sincer all
```

#### Install the English version (`en`):
```bash
# Add --lang en or 'en' to any command
npx ia-sincer claude --lang en
npx ia-sincer gemini en
npx ia-sincer codex --lang en
npx ia-sincer all en
```

#### Interactive Terminal Menu:
If you run `npx ia-sincer` without target arguments in your terminal, an interactive menu will guide your installation:

```bash
npx ia-sincer
```

**Interactive Menu Options:**
```text
IA SINCER - Skill Installer
Select target AI:
  1) All AIs (Claude Code, Gemini & Codex) [Default]
  2) Claude Code (Anthropic)
  3) Gemini / Google Antigravity (agy)
  4) OpenAI Codex / Cursor
  5) Cancel & Exit

Enter choice [1-5] (default: 1): 
```
> Select option **5** (or type `exit` / `cancel`) at any time to abort the installation safely without modifying any files.

---

### 💻 Via Bash / Curl

If Node/NPX is not installed, use `curl` to run the shell installer directly:

```bash
# Default (Install to all IAs)
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/install.sh | bash

# Target specific AI
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/install.sh | bash -s -- claude
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/install.sh | bash -s -- gemini
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/install.sh | bash -s -- codex

# Install English version
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/install.sh | bash -s -- claude --lang en
```

---

## 📋 Command Cheat Sheet

| Goal | Command | Default Target File |
| :--- | :--- | :--- |
| **Claude Code (Portuguese)** | `npx ia-sincer claude` | `~/.claude/CLAUDE.md` |
| **Claude Code (English)** | `npx ia-sincer claude --lang en` | `~/.claude/CLAUDE.md` |
| **Gemini / Antigravity (Portuguese)** | `npx ia-sincer gemini` | `~/.gemini/config/skills/ai-sincer/SKILL.md` |
| **Gemini / Antigravity (English)** | `npx ia-sincer gemini --lang en` | `~/.gemini/config/skills/ai-sincer/SKILL.md` |
| **Codex / Cursor (Portuguese)** | `npx ia-sincer codex` | `~/.codex/instructions.md` |
| **Codex / Cursor (English)** | `npx ia-sincer codex --lang en` | `~/.codex/instructions.md` |
| **All IAs (Portuguese)** | `npx ia-sincer all` | All 3 target directories |
| **All IAs (English)** | `npx ia-sincer all --lang en` | All 3 target directories |
| **Interactive Menu** | `npx ia-sincer` | Prompted in terminal |

---

## 🛠️ Manual Installation Guide

If you prefer to copy files manually or configure project-specific rules:

### 1. 🤖 Claude Code (Anthropic CLI)

#### Global Setup (All Projects):
Append the skill instructions to your global `~/.claude/CLAUDE.md`:
```bash
# English
mkdir -p ~/.claude
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/en/SKILL.md >> ~/.claude/CLAUDE.md

# Portuguese
mkdir -p ~/.claude
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/pt_br/SKILL.md >> ~/.claude/CLAUDE.md
```

#### Project Setup:
Append to the `CLAUDE.md` file in the root of your project:
```bash
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/en/SKILL.md >> CLAUDE.md
```

---

### 2. ♊ Google Antigravity / Gemini CLI (`agy`)

Antigravity automatically discovers skills in `~/.gemini/config/skills/` (global) or `.agents/skills/` (project-specific).

#### Global Setup:
```bash
# English
mkdir -p ~/.gemini/config/skills/ai-sincer
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/en/SKILL.md -o ~/.gemini/config/skills/ai-sincer/SKILL.md

# Portuguese
mkdir -p ~/.gemini/config/skills/ai-sincer
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/pt_br/SKILL.md -o ~/.gemini/config/skills/ai-sincer/SKILL.md
```

#### Project Setup:
```bash
mkdir -p .agents/skills/ai-sincer
cp path/to/ia-sincer/en/SKILL.md .agents/skills/ai-sincer/SKILL.md
```

---

### 3. 💻 OpenAI Codex / Cursor / Custom System Prompts

#### Global Setup:
```bash
# English
mkdir -p ~/.codex
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/en/SKILL.md >> ~/.codex/instructions.md

# Portuguese
mkdir -p ~/.codex
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/pt_br/SKILL.md >> ~/.codex/instructions.md
```

#### Cursor Setup:
Copy the contents of [en/SKILL.md](en/SKILL.md) or [pt_br/SKILL.md](pt_br/SKILL.md) into your project's `.cursorrules` file.

---

### 4. 🐳 DeepSeek (Web UI, API, Open-WebUI, Ollama)

DeepSeek models excel with system prompts. You can integrate `ia-sincer` as a system prompt or custom instructions.

#### DeepSeek Web / Mobile App:
- Open **Custom Instructions** in your account settings.
- Paste the content of [en/SKILL.md](en/SKILL.md) or [pt_br/SKILL.md](pt_br/SKILL.md).

#### Open-WebUI / Ollama / API:
When sending requests to the DeepSeek API or running via Open-WebUI / Ollama, set the `system` parameter to the content of `SKILL.md`:
```json
{
  "model": "deepseek-coder",
  "messages": [
    {
      "role": "system",
      "content": "<paste SKILL.md content here>"
    },
    {
      "role": "user",
      "content": "Your technical prompt..."
    }
  ]
}
```

---

## 📁 Repository Structure

```
ia-sincer/
├── README.md         # Comprehensive documentation & guide
├── .gitignore        # Git exclusion file
├── .npmignore        # NPM publishing exclusion file
├── package.json      # Node CLI configuration
├── install.sh        # Interactive & automated Bash installer
├── bin/
│   └── cli.js        # Interactive & automated Node CLI (npx)
├── en/
│   └── SKILL.md      # English Skill
└── pt_br/
    └── SKILL.md      # Portuguese Skill
```

---

## 📄 License

MIT License - feel free to use, modify, and distribute.
