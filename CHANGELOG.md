# Changelog

## 1.1.0 - 2026-11-20

### Skill

- Reworked both language versions around a compact context-decision-action-validation cycle.
- Added guidance for context authority, memory and retrieved data, tool evidence, agentic retries, and observable completion states.
- Reduced the Portuguese skill from 2,056 to 1,016 words and the English skill from 2,065 to 1,010 words while preserving the core decision safeguards.
- Kept RTK as a conditional command-output optimization rather than a skill dependency or invocation trigger.

### Installer and validation

- Added optional RTK detection and installation to the Node and Bash installers, with explicit skip and install flags.
- Added automated checks for skill frontmatter, a 1,200-word context budget, and PT/EN size parity.
- Added the CargaLeste benchmark artifacts and the reproducible 1.0.1 reference report.
- Restricted the npm package contents so benchmark fixtures and repository automation are not shipped to users.

## 1.0.2 - 2026-09-18

- Added CLI version flag check (`--version`, `-v`) to `bin/cli.js`.
- Defaulted installation language and prompt text in `bin/cli.js` to English.

## 1.0.1 - 2026-09-17

- Added guidance for instructions that conflict with verified workspace evidence.
- Added a rule against false parity between objectively unequal alternatives.
- Strengthened consistency between decisions, actions, and verified outcomes.
- Aligned the Portuguese and English skill versions.
