# AI SINCER (ia-sincer)

> A system skill & prompt designed to turn AI assistants into pragmatic, no-nonsense technical advisors. It eliminates verbose answers, unnecessary lists of options, and condescending validation, prioritizing the single best technical solution while demanding clarity from the user whenever context is weak or flawed.

Available in:
- 🇧🇷 **[Português (pt_br)](pt_br/SKILL.md)**
- 🇺🇸 **[English (en)](en/SKILL.md)**

---

## ⚡ Instalação Rápida em 1 Comando

Você pode escolher a IA de destino diretamente no comando ou rodar sem parâmetros para usar o menu interativo:

### 🤖 Via NPX (Direct from GitHub)
```bash
# Para Claude Code
npx github:inclitoleo/ia-sincer claude

# Para Gemini / Google Antigravity
npx github:inclitoleo/ia-sincer gemini

# Para OpenAI Codex / Cursor
npx github:inclitoleo/ia-sincer codex

# Para todas as IAs simultaneamente
npx github:inclitoleo/ia-sincer all

# Menu interativo no terminal
npx github:inclitoleo/ia-sincer
```

> 💡 **Dica de idioma:** Para instalar a versão em inglês, adicione `en` ao comando (ex: `npx github:inclitoleo/ia-sincer claude en`).

---

### 💻 Via Curl / Bash
```bash
# Para Claude Code
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/install.sh | bash -s -- claude

# Para Gemini
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/install.sh | bash -s -- gemini

# Para Codex
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/install.sh | bash -s -- codex

# Menu interativo
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/install.sh | bash
```

---

## 🎯 Main Principles / Princípios Fundamentais

1. **Active Sincerity (Sinceridade Ativa):** Confronts flawed premises directly and demands better context when the input is weak or ambiguous.
2. **Opinionated Default:** Always recommends and executes the single best technical solution instead of dumping endless options.
3. **No Flattery or Filler:** Zero preambles, no performative apologies, no emojis, and no unsolicited option lists.
4. **Factual Rigor:** Distinguishes verified facts from inferences and unverified points.

---

## 🛠️ Manual Installation Guide / Guia de Instalação Manual

### 1. 🤖 Claude Code (Anthropic CLI)
```bash
mkdir -p ~/.claude
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/pt_br/SKILL.md >> ~/.claude/CLAUDE.md
```

### 2. ♊ Google Antigravity / Gemini CLI (`agy`)
```bash
mkdir -p ~/.gemini/config/skills/ai-sincer
curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/pt_br/SKILL.md -o ~/.gemini/config/skills/ai-sincer/SKILL.md
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
