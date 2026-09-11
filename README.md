# AI SINCER (ia-sincer)

> A system skill & prompt designed to turn AI assistants into pragmatic, no-nonsense technical advisors. It eliminates verbose answers, unnecessary lists of options, and condescending validation, prioritizing the single best technical solution while demanding clarity from the user whenever context is weak or flawed.

Available in:
- 🇧🇷 **[Português (pt_br)](pt_br/SKILL.md)**
- 🇺🇸 **[English (en)](en/SKILL.md)**

---

## ⚡ Instalação Rápida Interativa

Ao rodar o instalador sem flags, ele exibirá um **menu interativo no terminal** para você escolher em quais IAs deseja instalar:

### Via NPX (Direct from GitHub)
```bash
# Menu interativo
npx github:inclitoleo/ia-sincer

# Instalar em uma IA específica diretamente
npx github:inclitoleo/ia-sincer --gemini
npx github:inclitoleo/ia-sincer --claude
npx github:inclitoleo/ia-sincer --codex
npx github:inclitoleo/ia-sincer --all --en   # Em inglês
```

### Via Curl / Bash
```bash
# Menu interativo
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/install.sh | bash

# Instalar em uma IA específica diretamente
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/install.sh | bash -s -- --gemini
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/install.sh | bash -s -- --claude
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/install.sh | bash -s -- --codex
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

```bash
mkdir -p ~/.gemini/config/skills/ai-sincer
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/pt_br/SKILL.md -o ~/.gemini/config/skills/ai-sincer/SKILL.md
```

### 2. 🤖 Claude Code (Anthropic CLI)

```bash
mkdir -p ~/.claude
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/pt_br/SKILL.md >> ~/.claude/CLAUDE.md
```

### 3. 💻 OpenAI Codex / Custom System Prompts

```bash
mkdir -p ~/.codex
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/pt_br/SKILL.md >> ~/.codex/instructions.md
```

---

## 📁 Repository Structure

```
ia-sincer/
├── README.md
├── install.sh        # Interactive Bash installer
├── package.json      # Node CLI config
├── smithery.yaml     # Smithery.ai MCP configuration
├── bin/
│   └── cli.js        # Interactive Node CLI
├── pt_br/
│   └── SKILL.md      # Skill em Português
└── en/
    └── SKILL.md      # English Skill
```

---

## 📄 License

MIT License - feel free to use, modify, and distribute.
