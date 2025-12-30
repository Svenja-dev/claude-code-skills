# SUPERVISOR MODE (Multi-Agent QA)

## Architecture Principle

**Context Isolation**: Each phase operates with fresh focus on its specific task.

**Token Multiplier**: Multi-phase operations consume ~4x baseline. For complex tasks (>5 files), watch context budget.

## Workflow

### 1. DEVELOPER PHASE
- **Impact Analysis**: Which files are affected?
- **No-Touch Zones Check**: Review your project's protected files
  - Check CLAUDE.md for project-specific no-touch zones
  - Common patterns: auth logic, core business logic, production config
- **Generate Code** with justification

### 2. REVIEWER PHASE
Run Quality Gates:
```bash
npx tsc --noEmit
npm run build
npm run test
```
- On failure: Return to Phase 1 (max 3 iterations)
- On success: Continue to Phase 3

**Anti-Telephone-Game**: When returning to Phase 1, pass the original error **directly**, don't paraphrase:
```
BAD: "The test somehow didn't work"
GOOD: "FAIL src/utils/parser.test.ts:42 - Expected 'string' but got 'undefined'"
```

### 3. SYNTHESIS PHASE
- **Error Propagation Check**: Can errors from Phase 1/2 affect downstream?
- **Rollback Capability**: Is git reset HEAD~1 sufficient?
- Summarize changes with file list

### 4. COMPLETION
- List affected files with line numbers
- Propose commit (only after confirmation!)

## Failure Mode Mitigations

| Failure | Mitigation |
|---------|------------|
| Supervisor Bottleneck | Only distilled summaries between phases |
| Divergence | TTL: Max 3 iterations, then user decision |
| Error Propagation | Validate outputs before next phase starts |

## Task:
$ARGUMENTS

---
**IMPORTANT**: This mode iterates until all Quality Gates pass or 3 attempts are exhausted.

---
## Origin

Originally developed for [fabrikIQ](https://fabrikiq.com) - AI-powered manufacturing data analysis.
