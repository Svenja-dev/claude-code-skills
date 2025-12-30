# Claude Code Commands (Slash Commands)

Custom slash commands for Claude Code CLI. These are manually invocable via `/command-name`.

## Installation

Copy the desired `.md` files to `~/.claude/commands/`:

```bash
# Copy all commands
cp commands/*.md ~/.claude/commands/

# Or copy specific commands
cp commands/think.md ~/.claude/commands/
cp commands/supervisor.md ~/.claude/commands/
```

## Available Commands

### Planning & Strategy

| Command | Description |
|---------|-------------|
| `/think` | Ultimate thinking mode - decomposition, self-explanation, alternatives |
| `/strategy-fan` | Generate 4 genuinely different strategies |
| `/premortem` | Forward-looking planning with failure modes |
| `/prd` | Product Requirement Document |
| `/robust-spec` | Robust Spec Decomposition with Task-Model Fit |

### Development & QA

| Command | Description |
|---------|-------------|
| `/supervisor` | Multi-Agent QA mode with Anti-Telephone-Game |
| `/qa` | Run Quality Gates (tsc, build, test) |
| `/impact` | Impact Analysis before code changes |
| `/deploy-check` | Pre-deployment verification |

### Review & Analysis

| Command | Description |
|---------|-------------|
| `/harsh-review` | Harsh Reviewer (Self-Critique) |
| `/chain-verify` | Chain of Verification |
| `/postmortem` | Post-Mortem / Incident Report |
| `/adapt` | Adaptive Re-Evaluation (Constraint Change) |

### Context Engineering

| Command | Description |
|---------|-------------|
| `/attention-budget` | Attention Budget Design for Agentic Systems |
| `/state-analysis` | State Persistence Design |
| `/external-memory` | External Memory Architecture |

### Documentation

| Command | Description |
|---------|-------------|
| `/dev-docs` | Strategic planning for development tasks |
| `/dev-docs-update` | Update dev documentation |

### Testing

| Command | Description |
|---------|-------------|
| `/secom-test` | SECOM Dataset Baseline Test (manufacturing AI) |

## Usage

```bash
# In Claude Code CLI
/think How should I architect this feature?
/supervisor Implement user authentication
/qa
/deploy-check
```

## Command Format

Each command is a markdown file with:
- Title and description
- Instructions for Claude
- `$ARGUMENTS` placeholder for user input

Example:
```markdown
# My Command

Do something specific:

1. Step one
2. Step two

## Task:
$ARGUMENTS
```

---

Originally developed for [fabrikIQ](https://fabrikiq.com) - AI-powered manufacturing data analysis.

## License

MIT - Free to use and modify
