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

LANG_CHOICE="en"
LANG_SET_EXPLICITLY=false
INSTALL_GEMINI=true
INSTALL_CLAUDE=true
INSTALL_CODEX=true
CUSTOM_TARGET=false

SKIP_RTK=false
FORCE_INSTALL_RTK=false

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
      LANG_SET_EXPLICITLY=true
      ;;
    pt|pt_br|portuguese|--pt|--pt_br)
      LANG_CHOICE="pt_br"
      LANG_SET_EXPLICITLY=true
      ;;
    --skip-rtk|--no-rtk)
      SKIP_RTK=true
      ;;
    --install-rtk)
      FORCE_INSTALL_RTK=true
      ;;
    --help|-h)
      echo -e "${BOLD}IA SINCER Installer${NC}"
      echo "Usage: ./install.sh [claude|gemini|codex|all] [--lang en] [--skip-rtk] [--install-rtk]"
      echo ""
      echo "Examples:"
      echo "  ./install.sh claude"
      echo "  ./install.sh gemini --lang en"
      echo "  ./install.sh all --install-rtk"
      exit 0
      ;;
  esac
done

check_rtk() {
  if command -v rtk >/dev/null 2>&1; then
    RTK_VER=$(rtk --version 2>/dev/null || echo "installed")
    echo -e "  ${GREEN}✓${NC} RTK detected: ${BOLD}${RTK_VER}${NC} (CLI Token Saver Active)"
    return 0
  else
    return 1
  fi
}

install_rtk() {
  echo -e "\n${BLUE}${BOLD}⚡ Installing RTK (Rust Token Killer)...${NC}"
  if curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/main/install.sh | sh; then
    echo -e "  ${GREEN}✓${NC} RTK installed successfully!\n"
  else
    echo -e "  ${YELLOW}ℹ${NC} Failed to install RTK automatically. You can install manually: curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/main/install.sh | sh\n"
  fi
}


# Interactive menu if running in TTY without target args
if [[ "$CUSTOM_TARGET" == "false" && -t 0 ]]; then
  echo -e "${CYAN}${BOLD}\nWhich AI do you want to install the IA SINCER skill for?${NC}"
  echo -e "  ${BOLD}1)${NC} All (Claude Code, Gemini, and Codex) [Default]"
  echo -e "  ${BOLD}2)${NC} Claude Code only"
  echo -e "  ${BOLD}3)${NC} Gemini / Google Antigravity (agy) only"
  echo -e "  ${BOLD}4)${NC} OpenAI Codex / Cursor only"
  echo -e "  ${BOLD}5)${NC} Exit / Cancel"
  echo ""
  read -p "Enter choice [1-5] (default: 1): " OPTION
  case $(echo "$OPTION" | tr '[:upper:]' '[:lower:]') in
    5|s|q|exit|sair|cancel|cancelar)
      echo -e "${YELLOW}Installation cancelled by user.${NC}"
      exit 0
      ;;
    2) INSTALL_GEMINI=false; INSTALL_CLAUDE=true; INSTALL_CODEX=false ;;
    3) INSTALL_GEMINI=true; INSTALL_CLAUDE=false; INSTALL_CODEX=false ;;
    4) INSTALL_GEMINI=false; INSTALL_CLAUDE=false; INSTALL_CODEX=true ;;
    *) INSTALL_GEMINI=true; INSTALL_CLAUDE=true; INSTALL_CODEX=true ;;
  esac

  if [[ "$LANG_SET_EXPLICITLY" == "false" ]]; then
    echo -e "\nSkill Language:"
    echo -e "  ${BOLD}1)${NC} English [Default]"
    echo -e "  ${BOLD}2)${NC} Português (Brasil)"
    read -p "Choose language [1-2] (default: 1): " LANG_OPT
    if [[ "$LANG_OPT" == "2" ]]; then
      LANG_CHOICE="pt_br"
    else
      LANG_CHOICE="en"
    fi
  fi
fi

# RTK Dependency Check & Setup
if [[ "$SKIP_RTK" == "false" ]]; then
  if ! check_rtk; then
    if [[ "$FORCE_INSTALL_RTK" == "true" ]]; then
      install_rtk
    elif [[ -t 0 ]]; then
      echo -e "${YELLOW}${BOLD}\n⚡ RTK (Rust Token Killer) is recommended for 60-90% token savings on CLI operations.${NC}"
      read -p "Would you like to install RTK now? [Y/n]: " RTK_ANS
      RTK_ANS_LOWER=$(echo "$RTK_ANS" | tr '[:upper:]' '[:lower:]')
      if [[ "$RTK_ANS_LOWER" == "" || "$RTK_ANS_LOWER" == "y" || "$RTK_ANS_LOWER" == "yes" || "$RTK_ANS_LOWER" == "s" || "$RTK_ANS_LOWER" == "sim" ]]; then
        install_rtk
      else
        echo -e "  ${YELLOW}ℹ${NC} Continuing without RTK. (Token savings will rely on prompt rules only)"
      fi
    else
      echo -e "  ${YELLOW}ℹ${NC} RTK not found. Install RTK for 60-90% CLI token savings: ${CYAN}curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/main/install.sh | sh${NC}"
    fi
  fi
fi

REPO_RAW_URL="https://raw.githubusercontent.com/inclitoleo/ia-sincer/main"
SKILL_URL="${REPO_RAW_URL}/${LANG_CHOICE}/SKILL.md"

echo -e "\n${BLUE}${BOLD}🚀 Installing IA SINCER (${LANG_CHOICE})...${NC}"

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
    echo -e "  ${GREEN}✓${NC} Added to Claude Code global instructions: ${BOLD}$CLAUDE_FILE${NC}"
  else
    echo -e "  ${YELLOW}ℹ${NC} Claude Code instructions already contain the IA SINCER skill."
  fi
  INSTALLED_COUNT=$((INSTALLED_COUNT + 1))
fi

# 2. Install to Google Antigravity / Gemini CLI
if [[ "$INSTALL_GEMINI" == "true" ]]; then
  GEMINI_DIR="$HOME/.gemini/config/skills/ai-sincer"
  mkdir -p "$GEMINI_DIR"
  cp "$TMP_FILE" "$GEMINI_DIR/SKILL.md"
  echo -e "  ${GREEN}✓${NC} Installed in Gemini/Antigravity: ${BOLD}$GEMINI_DIR/SKILL.md${NC}"
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
    echo -e "  ${GREEN}✓${NC} Added to Codex global instructions: ${BOLD}$CODEX_FILE${NC}"
  else
    echo -e "  ${YELLOW}ℹ${NC} Codex instructions already contain the IA SINCER skill."
  fi
  INSTALLED_COUNT=$((INSTALLED_COUNT + 1))
fi

echo ""
echo -e "${GREEN}${BOLD}✨ Installation complete! (${INSTALLED_COUNT} AI(s) configured)${NC}"
