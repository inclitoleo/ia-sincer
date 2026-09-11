#!/usr/bin/env bash

# ==========================================
# IA SINCER - Installer Script
# https://github.com/inclitoleo/ia-sincer
# ==========================================

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

LANG_CHOICE="pt_br"
INSTALL_GEMINI=true
INSTALL_CLAUDE=true
INSTALL_CODEX=true
CUSTOM_TARGET=false

# Parse positional arguments or flags
for arg in "$@"; do
  case $(echo "$arg" | tr '[:upper:]' '[:lower:]') in
    claude|--claude)
      INSTALL_GEMINI=false; INSTALL_CLAUDE=true; INSTALL_CODEX=false; CUSTOM_TARGET=true
      ;;
    gemini|--gemini)
      INSTALL_GEMINI=true; INSTALL_CLAUDE=false; INSTALL_CODEX=false; CUSTOM_TARGET=true
      ;;
    codex|--codex)
      INSTALL_GEMINI=false; INSTALL_CLAUDE=false; INSTALL_CODEX=true; CUSTOM_TARGET=true
      ;;
    all|--all)
      INSTALL_GEMINI=true; INSTALL_CLAUDE=true; INSTALL_CODEX=true; CUSTOM_TARGET=true
      ;;
    en|english|--en|--english)
      LANG_CHOICE="en"
      ;;
    pt|pt_br|portuguese|--pt|--pt_br)
      LANG_CHOICE="pt_br"
      ;;
    --help|-h)
      echo -e "${BOLD}IA SINCER Installer${NC}"
      echo "Usage: npx github:inclitoleo/ia-sincer [claude|gemini|codex|all] [en|pt]"
      echo ""
      echo "Examples:"
      echo "  npx github:inclitoleo/ia-sincer claude"
      echo "  npx github:inclitoleo/ia-sincer gemini"
      echo "  npx github:inclitoleo/ia-sincer codex"
      echo "  npx github:inclitoleo/ia-sincer all en"
      exit 0
      ;;
  esac
done

# Interactive menu if running in TTY without target args
if [[ "$CUSTOM_TARGET" == "false" && -t 0 ]]; then
  echo -e "${CYAN}${BOLD}\nPara qual IA você deseja instalar a skill IA SINCER?${NC}"
  echo -e "  ${BOLD}1)${NC} Todas (Gemini/Antigravity, Claude Code e Codex) [Padrão]"
  echo -e "  ${BOLD}2)${NC} Apenas Claude Code"
  echo -e "  ${BOLD}3)${NC} Apenas Gemini / Google Antigravity (agy)"
  echo -e "  ${BOLD}4)${NC} Apenas OpenAI Codex / Cursor"
  echo ""
  read -p "Digite a opção desejada [1-4] (padrão: 1): " OPTION
  case $OPTION in
    2) INSTALL_GEMINI=false; INSTALL_CLAUDE=true; INSTALL_CODEX=false ;;
    3) INSTALL_GEMINI=true; INSTALL_CLAUDE=false; INSTALL_CODEX=false ;;
    4) INSTALL_GEMINI=false; INSTALL_CLAUDE=false; INSTALL_CODEX=true ;;
    *) INSTALL_GEMINI=true; INSTALL_CLAUDE=true; INSTALL_CODEX=true ;;
  esac
fi

REPO_RAW_URL="https://raw.githubusercontent.com/inclitoleo/ia-sincer/main"
SKILL_URL="${REPO_RAW_URL}/${LANG_CHOICE}/SKILL.md"

echo -e "\n${BLUE}${BOLD}🚀 Instalando IA SINCER (${LANG_CHOICE})...${NC}"

# Fetch skill content into temporary file
TMP_FILE=$(mktemp)
trap 'rm -f "$TMP_FILE"' EXIT

if command -v curl >/dev/null 2>&1; then
  curl -fsSL "$SKILL_URL" -o "$TMP_FILE"
elif command -v wget >/dev/null 2>&1; then
  wget -qO "$TMP_FILE" "$SKILL_URL"
else
  if [ -f "${LANG_CHOICE}/SKILL.md" ]; then
    cp "${LANG_CHOICE}/SKILL.md" "$TMP_FILE"
  else
    echo -e "${YELLOW}Error: curl or wget required to fetch skill.${NC}"
    exit 1
  fi
fi

INSTALLED_COUNT=0

# 1. Install to Claude Code
if [[ "$INSTALL_CLAUDE" == "true" ]]; then
  CLAUDE_DIR="$HOME/.claude"
  CLAUDE_FILE="$CLAUDE_DIR/CLAUDE.md"
  mkdir -p "$CLAUDE_DIR"
  
  if [ ! -f "$CLAUDE_FILE" ] || ! grep -q "AI SINCER" "$CLAUDE_FILE"; then
    echo -e "\n# AI SINCER SKILL\n" >> "$CLAUDE_FILE"
    cat "$TMP_FILE" >> "$CLAUDE_FILE"
    echo -e "  ${GREEN}✓${NC} Adicionado às instruções globais do Claude Code: ${BOLD}$CLAUDE_FILE${NC}"
  else
    echo -e "  ${YELLOW}ℹ${NC} Instruções do Claude Code já contêm a skill IA SINCER."
  fi
  INSTALLED_COUNT=$((INSTALLED_COUNT + 1))
fi

# 2. Install to Google Antigravity / Gemini CLI
if [[ "$INSTALL_GEMINI" == "true" ]]; then
  GEMINI_DIR="$HOME/.gemini/config/skills/ai-sincer"
  mkdir -p "$GEMINI_DIR"
  cp "$TMP_FILE" "$GEMINI_DIR/SKILL.md"
  echo -e "  ${GREEN}✓${NC} Instalado em Gemini/Antigravity: ${BOLD}$GEMINI_DIR/SKILL.md${NC}"
  INSTALLED_COUNT=$((INSTALLED_COUNT + 1))
fi

# 3. Install to OpenAI Codex
if [[ "$INSTALL_CODEX" == "true" ]]; then
  CODEX_DIR="$HOME/.codex"
  CODEX_FILE="$CODEX_DIR/instructions.md"
  mkdir -p "$CODEX_DIR"
  
  if [ ! -f "$CODEX_FILE" ] || ! grep -q "AI SINCER" "$CODEX_FILE"; then
    echo -e "\n# AI SINCER SKILL\n" >> "$CODEX_FILE"
    cat "$TMP_FILE" >> "$CODEX_FILE"
    echo -e "  ${GREEN}✓${NC} Adicionado às instruções globais do Codex: ${BOLD}$CODEX_FILE${NC}"
  else
    echo -e "  ${YELLOW}ℹ${NC} Instruções do Codex já contêm a skill IA SINCER."
  fi
  INSTALLED_COUNT=$((INSTALLED_COUNT + 1))
fi

echo ""
echo -e "${GREEN}${BOLD}✨ Instalação concluída! (${INSTALLED_COUNT} IA(s) configurada(s))${NC}"
