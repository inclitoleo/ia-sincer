# AI SINCER (ia-sincer)

> A system skill & prompt designed to turn AI assistants into pragmatic, no-nonsense technical advisors. It eliminates verbose answers, unnecessary lists of options, and condescending validation, prioritizing the single best technical solution while demanding clarity from the user whenever context is weak or flawed.

Available in:
- 🇧🇷 **[Português (pt_br)](pt_br/SKILL.md)**
- 🇺🇸 **[English (en)](en/SKILL.md)**

---

## ⚡ 1-Command Quick Install / Instalação Rápida em 1 Comando

You can install `ia-sincer` across **Gemini/Antigravity**, **Claude Code**, and **OpenAI Codex** automatically with one command:

### Option A: Via Curl / Bash
```bash
# Português (Padrão)
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/install.sh | bash

# English
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/install.sh | bash -s -- --lang en
```

### Option B: Via NPX
```bash
# Português
npx ia-sincer

# English
npx ia-sincer --en
```

---

## 🎯 Main Principles / Princípios Fundamentais

1. **Active Sincerity (Sinceridade Ativa):** Confronts flawed premises directly and demands better context when the input is weak or ambiguous.
2. **Opinionated Default:** Always recommends and executes the single best technical solution instead of dumping endless options.
3. **No Flattery or Filler:** Zero preambles, no performative apologies, no emojis, and no unsolicited option lists.
4. **Factual Rigor:** Distinguishes verified facts from inferences and unverified points.

---

## 🛠️ Manual Installation Guide / Guia de Instalação Manual

### 1. ♊ Google Antigravity / Gemini CLI (`agy`)

Antigravity automatically discovers skills in `~/.gemini/config/skills/` (global) or `.agents/skills/` (project-specific).

#### Global Installation (All Projects):
```bash
# Português
mkdir -p ~/.gemini/config/skills/ai-sincer
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/pt_br/SKILL.md -o ~/.gemini/config/skills/ai-sincer/SKILL.md

# English
mkdir -p ~/.gemini/config/skills/ai-sincer
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/en/SKILL.md -o ~/.gemini/config/skills/ai-sincer/SKILL.md
```

#### Project-Specific Installation:
```bash
mkdir -p .agents/skills/ai-sincer
cp path/to/ia-sincer/pt_br/SKILL.md .agents/skills/ai-sincer/SKILL.md
```

---

### 2. 🤖 Claude Code (Anthropic CLI)

Claude Code supports custom project and global instructions via `CLAUDE.md`.

#### Global Setup:
Append the contents of `SKILL.md` (Portuguese or English) to your global `CLAUDE.md`:
```bash
mkdir -p ~/.claude
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/pt_br/SKILL.md >> ~/.claude/CLAUDE.md
```

#### Project Setup:
Create or append to the `CLAUDE.md` file in the root of your project:
```bash
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/pt_br/SKILL.md >> CLAUDE.md
```

---

### 3. 💻 OpenAI Codex / Custom System Prompts

For OpenAI Codex CLI, Custom Instructions, or API integrations:

#### System Prompt / `.codex/instructions.md`:
1. Copy the text from [pt_br/SKILL.md](pt_br/SKILL.md) or [en/SKILL.md](en/SKILL.md).
2. Paste it into your project's custom instructions file (e.g., `.codex/instructions.md` or `.cursorrules` / `.github/copilot-instructions.md`).

#### Quick Command:
```bash
mkdir -p .codex
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/en/SKILL.md -o .codex/instructions.md
```

---

### 4. 🐳 DeepSeek (Web UI, API, Open-WebUI, Ollama)

DeepSeek models excel with system prompts. You can integrate `ia-sincer` as a system prompt or custom instructions.

#### DeepSeek Web / Mobile App:
- Open **Custom Instructions** (Instruções Personalizadas) in your account settings.
- Paste the content of [pt_br/SKILL.md](pt_br/SKILL.md) or [en/SKILL.md](en/SKILL.md).

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
├── README.md
├── install.sh        # Installer script (Bash)
├── package.json      # Node CLI config
├── bin/
│   └── cli.js        # Installer CLI (NPX)
├── pt_br/
│   └── SKILL.md      # Skill em Português
└── en/
    └── SKILL.md      # English Skill
```

---

## 📄 License

MIT License - feel free to use, modify, and distribute.
