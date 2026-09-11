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
BOLD='\033[1m'
NC='\033[0m'

LANG_CHOICE="pt_br"
TARGET_CHOICE="all"

# Parse arguments
while [[ "$#" -gt 0 ]]; do
  case $1 in
    --lang)
      if [[ "$2" == "en" || "$2" == "english" ]]; then
        LANG_CHOICE="en"
      else
        LANG_CHOICE="pt_br"
      fi
      shift 2
      ;;
    --target)
      TARGET_CHOICE="$2"
      shift 2
      ;;
    --help|-h)
      echo -e "${BOLD}IA SINCER Installer${NC}"
      echo "Usage: curl -fsSL https://raw.githubusercontent.com/inclitoleo/ia-sincer/main/install.sh | bash -s -- [options]"
      echo ""
      echo "Options:"
      echo "  --lang [pt_br|en]    Language version (default: pt_br)"
      echo "  --target [all|gemini|claude|codex]  Target system (default: all)"
      echo "  --help               Show this help message"
      exit 0
      ;;
    *)
      shift
      ;;
  esac
done

REPO_RAW_URL="https://raw.githubusercontent.com/inclitoleo/ia-sincer/main"
SKILL_URL="${REPO_RAW_URL}/${LANG_CHOICE}/SKILL.md"

echo -e "${BLUE}${BOLD}🚀 Installing IA SINCER (${LANG_CHOICE})...${NC}"

# Fetch skill content into temporary file
TMP_FILE=$(mktemp)
trap 'rm -f "$TMP_FILE"' EXIT

if command -v curl >/dev/null 2>&1; then
  curl -fsSL "$SKILL_URL" -o "$TMP_FILE"
elif command -v wget >/dev/null 2>&1; then
  wget -qO "$TMP_FILE" "$SKILL_URL"
else
  # Fallback to local file if available in repo context
  if [ -f "${LANG_CHOICE}/SKILL.md" ]; then
    cp "${LANG_CHOICE}/SKILL.md" "$TMP_FILE"
  else
    echo -e "${YELLOW}Error: curl or wget required to fetch skill.${NC}"
    exit 1
  fi
fi

INSTALLED_COUNT=0

# 1. Install to Google Antigravity / Gemini CLI
if [[ "$TARGET_CHOICE" == "all" || "$TARGET_CHOICE" == "gemini" ]]; then
  GEMINI_DIR="$HOME/.gemini/config/skills/ai-sincer"
  mkdir -p "$GEMINI_DIR"
  cp "$TMP_FILE" "$GEMINI_DIR/SKILL.md"
  echo -e "  ${GREEN}✓${NC} Installed to Gemini/Antigravity: ${BOLD}$GEMINI_DIR/SKILL.md${NC}"
  INSTALLED_COUNT=$((INSTALLED_COUNT + 1))
fi

# 2. Install to Claude Code
if [[ "$TARGET_CHOICE" == "all" || "$TARGET_CHOICE" == "claude" ]]; then
  CLAUDE_DIR="$HOME/.claude"
  CLAUDE_FILE="$CLAUDE_DIR/CLAUDE.md"
  mkdir -p "$CLAUDE_DIR"
  
  if [ ! -f "$CLAUDE_FILE" ] || ! grep -q "AI SINCER" "$CLAUDE_FILE"; then
    echo -e "\n# AI SINCER SKILL\n" >> "$CLAUDE_FILE"
    cat "$TMP_FILE" >> "$CLAUDE_FILE"
    echo -e "  ${GREEN}✓${NC} Appended to Claude Code global instructions: ${BOLD}$CLAUDE_FILE${NC}"
  else
    echo -e "  ${YELLOW}ℹ${NC} Claude Code global instructions already contain IA SINCER."
  fi
  INSTALLED_COUNT=$((INSTALLED_COUNT + 1))
fi

# 3. Install to OpenAI Codex
if [[ "$TARGET_CHOICE" == "all" || "$TARGET_CHOICE" == "codex" ]]; then
  CODEX_DIR="$HOME/.codex"
  CODEX_FILE="$CODEX_DIR/instructions.md"
  mkdir -p "$CODEX_DIR"
  
  if [ ! -f "$CODEX_FILE" ] || ! grep -q "AI SINCER" "$CODEX_FILE"; then
    echo -e "\n# AI SINCER SKILL\n" >> "$CODEX_FILE"
    cat "$TMP_FILE" >> "$CODEX_FILE"
    echo -e "  ${GREEN}✓${NC} Appended to Codex global instructions: ${BOLD}$CODEX_FILE${NC}"
  else
    echo -e "  ${YELLOW}ℹ${NC} Codex global instructions already contain IA SINCER."
  fi
  INSTALLED_COUNT=$((INSTALLED_COUNT + 1))
fi

echo ""
echo -e "${GREEN}${BOLD}✨ Installation complete! (${INSTALLED_COUNT} target(s) configured)${NC}"
