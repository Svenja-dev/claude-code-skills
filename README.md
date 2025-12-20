# Claude Code Skills Collection

**Author:** Lara Knuth ([@LaraDresden](https://reddit.com/u/LaraDresden))
**Website:** [fabrikIQ.com](https://www.fabrikiq.com) - AI-powered Manufacturing Analytics
**License:** MIT
**Last Updated:** December 2025

A collection of production-tested Claude Code skills for B2B SaaS development, focusing on TypeScript, quality gates, and multi-LLM workflows. These skills were developed while building [fabrikIQ](https://app.fabrikiq.com), a GDPR-compliant manufacturing analytics platform.

## Quick Start

Copy each skill's content into `~/.claude/skills/<skill-name>/SKILL.md`

```bash
# Example: Install all skills
mkdir -p ~/.claude/skills/{code-quality-gate,strict-typescript-mode,multi-llm-advisor,gemini-image-gen,social-media-content}
# Then copy each SKILL.md to its directory
```

---

## Skills Overview

| Skill | Purpose | Use Case |
|-------|---------|----------|
| [code-quality-gate](#1-code-quality-gate) | 5-stage quality pipeline | Prevent production failures |
| [strict-typescript-mode](#2-strict-typescript-mode) | Enforce type safety | TypeScript best practices |
| [multi-llm-advisor](#3-multi-llm-advisor) | Get multiple AI perspectives | Architecture & debugging |
| [gemini-image-gen](#4-gemini-image-generation) | Generate images via Gemini | Marketing assets |
| [social-media-content](#5-social-media-content) | Platform-optimized content | B2B marketing |

---

## 1. Code Quality Gate

**File:** `~/.claude/skills/code-quality-gate/SKILL.md`

Prevents production failures through a 5-stage quality gate system. Born from real incidents where untested code broke production at fabrikIQ.

### The 5 Quality Gates

1. **Pre-Commit (local):** TypeScript, Lint, Format - blocks commit on errors
2. **PR-Check (GitHub Actions):** Unit Tests, Build - blocks merge on errors
3. **Preview Deploy:** Vercel/Netlify Preview URL for visual review
4. **E2E Tests:** Playwright against Preview, Lighthouse performance audit
5. **Production Deploy:** Only when ALL gates pass

### Critical Rules

- **NEVER** use `continue-on-error: true` for TypeScript checks in GitHub Actions!
- Husky setup: `npm install -D husky lint-staged && npx husky init`
- Rollback command: `vercel rollback` (or `vercel alias` for instant switch)

### Example GitHub Actions

```yaml
jobs:
  quality-gate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx tsc --noEmit  # Gate 1: TypeScript
      - run: npm run lint       # Gate 2: ESLint
      - run: npm run test       # Gate 3: Unit Tests
      - run: npm run build      # Gate 4: Build
```

---

## 2. Strict TypeScript Mode

**File:** `~/.claude/skills/strict-typescript-mode/SKILL.md`

Enforces TypeScript best practices based on the State-of-the-Art Guide 2025.

### When to Activate

- Working with `.ts` or `.tsx` files
- New feature implementations
- Code reviews
- JavaScript to TypeScript migrations

### Core Rules

#### 1. NEVER use `any` without documentation

```typescript
// FORBIDDEN
function process(data: any) { ... }

// ALLOWED (with justification)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// Reason: External API returns untyped data, validated at runtime
function processExternal(data: any) { ... }

// BETTER: Use unknown with Type Guard
function process(data: unknown): ProcessedData {
  if (!isValidData(data)) throw new Error('Invalid data');
  return data as ProcessedData;
}
```

#### 2. Explicit Types for Public APIs

```typescript
// FORBIDDEN: Implicit return types on exports
export const calculate = (x, y) => x + y;

// REQUIRED: Explicit types
export const calculate = (x: number, y: number): number => x + y;

// For React Components
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ label, onClick, variant = 'primary' }: ButtonProps) => { ... };
```

#### 3. Use Generic Constraints

```typescript
// FORBIDDEN: Unbounded generic
function getValue<T>(obj: T, key: string) {
  return obj[key]; // Error
}

// REQUIRED: Constrained generic
function getValue<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

#### 4. Leverage Utility Types

```typescript
// Instead of duplication:
interface UserBase { name: string; email: string; }
interface UserCreate { name: string; email: string; }
interface UserUpdate { name?: string; email?: string; }

// Use Utility Types:
interface User { id: string; name: string; email: string; createdAt: Date; }
type UserCreate = Omit<User, 'id' | 'createdAt'>;
type UserUpdate = Partial<Pick<User, 'name' | 'email'>>;
```

#### 5. Readonly for Immutability

```typescript
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}

// For arrays
const items: readonly string[] = ['a', 'b'];
```

#### 6. Const Assertions for Literals

```typescript
const STATUS = { ACTIVE: 'active', INACTIVE: 'inactive' } as const;
// Type: { readonly ACTIVE: "active"; readonly INACTIVE: "inactive" }
```

#### 7. Discriminated Unions for State

```typescript
// Use Discriminated Unions:
type Response =
  | { status: 'loading' }
  | { status: 'success'; data: Data }
  | { status: 'error'; error: Error };
```

### Recommended tsconfig.json

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Pre-Edit Checklist

- [ ] No `any` without documented reason
- [ ] Explicit types on exports
- [ ] Generic constraints where applicable
- [ ] Utility types instead of duplication
- [ ] Readonly where immutability is desired
- [ ] Discriminated unions for states

---

## 3. Multi-LLM Advisor

**File:** `~/.claude/skills/multi-llm-advisor/SKILL.md`

Fetches additional perspectives from OpenAI Codex and Google Gemini for architecture decisions, code reviews, and debugging.

### When to Activate

- Architecture decisions (new features, refactoring)
- Code reviews (before commits, PRs)
- Debugging (complex errors, performance issues)
- On explicit request ("second opinion", "different perspective")

### Usage

```
Use the multi-llm-advisor skill to get architecture feedback on [topic]
Use the multi-llm-advisor skill to review this code
Use the multi-llm-advisor skill to debug [issue]
```

### Transparency Format

Every invocation displays:

```
+==============================================================+
|  MULTI-LLM ADVISOR - [MODE: ARCHITECTURE|REVIEW|DEBUG]       |
+==============================================================+
|  CONTEXT SENT TO LLMs:                                       |
|  - Files: [list]                                             |
|  - Question: [prompt]                                        |
|  - Tokens: ~[count]                                          |
+--------------------------------------------------------------+
|  CODEX 5.1 PRO RESPONSE:                                     |
|  [response]                                                  |
+--------------------------------------------------------------+
|  GEMINI 3 PRO RESPONSE:                                      |
|  [response]                                                  |
+--------------------------------------------------------------+
|  SYNTHESIS (Claude's Recommendation):                        |
|  [combined analysis]                                         |
+==============================================================+
```

### Prompt Templates

#### Architecture Mode
```
You are a senior software architect. Analyze this architecture decision:

CONTEXT: {context}
QUESTION: {question}
CURRENT STACK: {stack}

Provide:
1. Pros/Cons of the proposed approach
2. Alternative approaches (max 2)
3. Potential risks and mitigations
4. Recommendation with reasoning

Be concise. Max 300 words.
```

#### Review Mode
```
You are a senior code reviewer. Review this code:

CODE: {code}
LANGUAGE: {language}
PROJECT TYPE: {project_type}

Focus on:
1. Security vulnerabilities (OWASP Top 10)
2. Performance issues
3. Maintainability concerns
4. TypeScript/type safety (if applicable)

Format: Bullet points, max 200 words.
```

#### Debug Mode
```
You are a debugging expert. Analyze this issue:

ERROR/SYMPTOM: {error}
RELEVANT CODE: {code}
CONTEXT: {context}

Provide:
1. Root cause analysis (most likely)
2. 2-3 diagnostic steps
3. Suggested fix with code

Be specific and actionable. Max 250 words.
```

### API Configuration

Environment variables (store in `.env` or system env):
- `OPENAI_API_KEY` - For Codex 5.1 Pro
- `GOOGLE_AI_API_KEY` - For Gemini 3 Pro

---

## 4. Gemini Image Generation

**File:** `~/.claude/skills/gemini-image-gen/SKILL.md`

Generate images directly from Claude Code CLI using Google's Gemini API. Used at fabrikIQ for generating OEE dashboards and manufacturing report visuals.

### Setup

**API Key:** https://aistudio.google.com/apikey
**Environment:** `GOOGLE_AI_API_KEY`
**Install:** `pip install google-genai pillow python-dotenv`

### Basic Usage

```python
import os
from google import genai

client = genai.Client(api_key=os.environ.get("GOOGLE_AI_API_KEY"))

response = client.models.generate_content(
    model="gemini-2.5-flash-image",  # Fast
    # model="gemini-3-pro-image-preview",  # Quality
    contents=["Create a professional OEE dashboard showing 85% availability"]
)

# Extract and save image from response
for part in response.candidates[0].content.parts:
    if hasattr(part, 'inline_data') and part.inline_data:
        with open("output.png", "wb") as f:
            f.write(part.inline_data.data)
```

### Models

| Model | Speed | Quality | Use Case |
|-------|-------|---------|----------|
| `gemini-2.5-flash-image` | Fast | Good | Drafts, iterations |
| `gemini-3-pro-image-preview` | Slower | Excellent | Final assets |

### Use Cases

- Manufacturing dashboards (OEE, SPC charts)
- Social media graphics
- Marketing materials
- Infographics
- Presentation slides

---

## 5. Social Media Content

**File:** `~/.claude/skills/social-media-content/SKILL.md`

Platform-optimized content creation for B2B marketing. Tailored for manufacturing, Industry 4.0, and MES topics.

### LinkedIn

**Best Times:** Tue-Thu 8-10 AM, 5-6 PM (local time)

**Rules:**
- First line = Hook (attention grabber)
- No links in post (put in comments)
- 3-5 Hashtags: #Manufacturing #Industry40 #OEE #SmartFactory #DigitalTransformation
- CTA at the end (ask a question)

**Format:**
```
[HOOK - 1 sentence that stops the scroll]

[3-5 bullet points with value]

[CTA Question]

[Hashtags in comment, not post]
```

### X/Twitter

**Rules:**
- Under 200 characters performs better
- Max 2 hashtags
- Use threads for complex topics
- Avoid links in main tweet (kills reach)

### Reddit

**Critical: NO direct advertising!**

**Relevant Subreddits:**
- r/manufacturing
- r/PLC
- r/industrialengineering
- r/ClaudeAI (for technical setups)

**Strategy:**
- Value first, build karma
- Answer questions genuinely
- Share setups/learnings (not products)
- Mention products only when directly relevant and helpful

### Discord

**Rules:**
- Casual tone
- No promotional links
- Help others first
- Build reputation over time

---

## Real-World Example: fabrikIQ

These skills were battle-tested building [fabrikIQ](https://app.fabrikiq.com), a GDPR-compliant B2B SaaS platform for manufacturing analytics. Key learnings:

- **Code Quality Gate** caught 3 potential production incidents before they happened
- **Strict TypeScript Mode** reduced runtime errors by 80%
- **Multi-LLM Advisor** provided crucial architecture feedback for the Gemini API integration
- **Gemini Image Gen** powers the AI-generated OEE dashboard visuals in PPTX exports

## Contributing

Found these useful? Have improvements? Open an issue or PR!

**Contact:**
Lara Knuth - lara.knuth@dresdenaiinsights.com
Website: [www.fabrikiq.com](https://www.fabrikiq.com)

## License

MIT License - Use freely, attribution appreciated.
