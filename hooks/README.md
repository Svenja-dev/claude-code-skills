# Claude Code Hooks

Production-tested hooks for automated quality enforcement and skill activation.

## Installation

1. Copy hooks to `~/.claude/hooks/`:
```bash
mkdir -p ~/.claude/hooks
cp *.ts ~/.claude/hooks/
```

2. Copy skill rules to project:
```bash
mkdir -p .claude/skills
cp ../config/skill-rules.json .claude/skills/
```

3. Merge `settings-example.json` into your `~/.claude/settings.json`

4. Install dependencies:
```bash
npm install -g tsx
```

## Available Hooks

### 1. security-scan.ts (PreToolUse → Bash)

**Purpose:** Blocks dangerous commands before execution

**Blocks (Critical):**
- `git push --force origin main` - Force push to main branch
- `rm -rf /` - Recursive delete of root
- Fork bombs, disk formatting

**Warns:**
- `git reset --hard` - Hard reset (suggests stash first)
- `--no-verify` - Skipping git hooks
- `curl | sh` - Piping remote content to shell
- `vercel --prod` - Production deployments

**Detects secrets in commands:**
- AWS keys, GitHub tokens, API keys
- Passwords in command arguments

### 2. pre-commit-quality.ts (PreToolUse → Bash)

**Purpose:** Quality checks before `git commit`

**Checks:**
1. **Secret Scanning** - Scans staged content for exposed secrets
2. **TypeScript** - Runs `tsc --noEmit` (30s timeout)
3. **Conventional Commits** - Validates commit message format

**Behavior:** Warns only, does NOT block commits (flexible mode)

### 3. post-edit-tsc-check.ts (PostToolUse → Edit/Write)

**Purpose:** TypeScript validation after every file edit

**Features:**
- Runs after Edit, MultiEdit, Write on `.ts`/`.tsx` files
- Shows errors in edited file first, then count of others
- Finds project root (tsconfig.json) automatically
- 45s timeout, skips node_modules/test files

**Behavior:** Warns only, does NOT block edits

### 4. multi-llm-advisor-hook.ts (UserPromptSubmit)

**Purpose:** Suggests Multi-LLM consultation for complex decisions

**Detects keywords:**
- **Architecture:** refactor, migrate, scaling, design pattern
- **Review:** security, vulnerability, audit, best practice
- **Debug:** error, bug, crash, undefined, not working

**Behavior:** Shows suggestion box, does NOT block

### 5. skill-activation-prompt.ts (UserPromptSubmit)

**Purpose:** Automatic skill activation based on prompt analysis

**Reads:** `.claude/skills/skill-rules.json` (see `../config/`)

**Output Format:**
```
========================================
[!] SKILL ACTIVATION CHECK
========================================

[!!] CRITICAL SKILLS (REQUIRED):
  -> code-quality-gate

[*] RECOMMENDED SKILLS:
  -> strict-typescript-mode

[+] SUGGESTED SKILLS:
  -> preview-testing

ACTION: Use Skill tool BEFORE responding
========================================
```

**Enforcement Levels:**
- `block` (critical priority) → MUST invoke skill
- `warn` (high priority) → Recommended, shows alert
- `suggest` (medium/low) → Gentle hint

**Behavior:** Analyzes prompt, matches keywords/intent patterns, outputs skill suggestions

## Hook Lifecycle

```
User types prompt
    ↓
UserPromptSubmit → skill-activation-prompt.ts (suggests skills based on keywords)
                 → multi-llm-advisor-hook.ts (suggests LLM help)
    ↓
Claude generates Bash command
    ↓
PreToolUse → security-scan.ts (blocks dangerous commands)
           → pre-commit-quality.ts (checks before commit)
    ↓
Command executes
    ↓
Claude generates Edit/Write
    ↓
PostToolUse → post-edit-tsc-check.ts (TypeScript validation)
```

## Configuration

See `settings-example.json` for the full configuration.

**Key settings:**
- `matcher: "Bash"` - Only triggers on Bash tool
- `matcher: "Edit|MultiEdit|Write"` - Triggers on file modifications
- `matcher: ".*"` - Triggers on all prompts

## Customization

### Add new blocked patterns (security-scan.ts)

```typescript
const BLOCKED_PATTERNS = [
  // Add your pattern
  {
    pattern: /your-dangerous-pattern/i,
    type: 'CUSTOM_BLOCK',
    message: 'Description of the danger'
  },
];
```

### Add new secret patterns (pre-commit-quality.ts)

```typescript
const SECRET_PATTERNS = [
  // Add your pattern
  {
    name: 'Custom Secret',
    pattern: /your-secret-pattern/g
  },
];
```

## Troubleshooting

**Hook not running:**
- Check `~/.claude/settings.json` syntax
- Ensure `tsx` is installed globally
- Check file permissions

**TypeScript check too slow:**
- Increase timeout in hook (default: 30-45s)
- Check if `tsconfig.json` includes too many files

**False positives in secret scanning:**
- Add pattern to `WHITELIST_PATTERNS` array
