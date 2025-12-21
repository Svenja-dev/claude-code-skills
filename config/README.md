# Configuration Files

## skill-rules.json

Defines automatic skill activation based on keywords and intent patterns.

### Installation

Copy to `~/.claude/skills/skill-rules.json`

### Enforcement Levels

| Level | Behavior |
|-------|----------|
| `block` | **Mandatory** - Skill MUST be invoked before proceeding |
| `warn` | **Warning** - Shows alert, continues if ignored |
| `suggest` | **Suggestion** - Gentle hint, no blocking |

### Priority Levels

| Priority | When Used |
|----------|-----------|
| `critical` | Security, production deploys |
| `high` | TypeScript, GDPR, preview testing |
| `medium` | Architecture, LLM consultation |
| `low` | Image generation, social media |

### Skill Types

| Type | Purpose |
|------|---------|
| `guardrail` | Safety/compliance checks (security, GDPR) |
| `domain` | Domain-specific expertise (TypeScript, testing) |

### Trigger Mechanics

```json
{
  "promptTriggers": {
    "keywords": ["preview", "vercel"],     // Exact match in prompt
    "intentPatterns": ["test.*preview"]    // Regex patterns
  }
}
```

### Hook Integration

The `skill-activation-prompt.ts` hook reads this file and generates activation suggestions:

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

### Customization

Add your own skills:

```json
{
  "my-custom-skill": {
    "type": "domain",
    "enforcement": "suggest",
    "priority": "medium",
    "promptTriggers": {
      "keywords": ["my-keyword"],
      "intentPatterns": ["pattern.*match"]
    }
  }
}
```
