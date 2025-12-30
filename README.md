# Claude Code Skills Collection

**Author:** Lara Knuth ([@LaraDresden](https://reddit.com/u/LaraDresden))
**Website:** [fabrikIQ.com](https://www.fabrikiq.com) - AI-powered Manufacturing Analytics
**License:** MIT
**Last Updated:** December 2025

---

## About Me

I'm a 50+ single mom of 11-year-old twins, working on this project alongside my day job. I don't have an engineering or programming background - just a Master's in Public Administration and one in European Administrative Management.

**I'm proud of what I've built here.**

If someone with my background can create production-tested skills, hooks, and a GDPR-compliant B2B SaaS, so can you. AI-assisted development has opened doors that were closed to many of us before.

---

A collection of production-tested Claude Code skills for B2B SaaS development, focusing on TypeScript, quality gates, and multi-LLM workflows. These skills were developed while building [fabrikIQ](https://app.fabrikiq.com), a GDPR-compliant manufacturing analytics platform.

## Quick Start

Copy each skill's content into `~/.claude/skills/<skill-name>/SKILL.md`

## Skills Overview

| Skill | Purpose | Use Case |
|-------|---------|----------|
| code-quality-gate | 5-stage quality pipeline | Prevent production failures |
| strict-typescript-mode | Enforce type safety | TypeScript best practices |
| multi-llm-advisor | Get multiple AI perspectives | Architecture & debugging |
| gemini-image-gen | Generate images via Gemini | Marketing assets |
| qa-checklist | 6-phase QA before merge/deploy | Production readiness |
| safe-git-guard | Prevent destructive git operations | Git safety |
| ui-freeze | Protect theme and design files | Design consistency |

## Hooks (Automation)

| Hook | Trigger | Purpose |
|------|---------|---------|
| security-scan.ts | PreToolUse -> Bash | Blocks dangerous git commands |
| pre-commit-quality.ts | PreToolUse -> Bash | Secret scanning + TSC |
| post-edit-tsc-check.ts | PostToolUse -> Edit | TypeScript validation |
| post-tool-use-tracker.ts | PostToolUse -> Edit | Tracks edited files |
| supervisor-trigger.ts | UserPromptSubmit | Activates QA mode |

## Commands (Slash Commands)

See [commands/README.md](commands/README.md) for 19 slash commands including:

- `/think` - Ultimate thinking mode
- `/supervisor` - Multi-Agent QA mode
- `/qa` - Run Quality Gates
- `/strategy-fan` - Generate 4 strategies
- `/deploy-check` - Pre-deployment verification

## Installation

```bash
# Skills
cp -r skills/* ~/.claude/skills/

# Hooks
cp hooks/*.ts ~/.claude/hooks/
npm install -g tsx

# Commands
cp commands/*.md ~/.claude/commands/
```

## Contributing

Found these useful? Open an issue or PR!

**Contact:** Reddit [@LaraDresden](https://reddit.com/u/LaraDresden) | Website: [www.fabrikiq.com](https://www.fabrikiq.com)

## License

MIT License - Use freely, attribution appreciated.
