# Social Media Posts for Claude Code Skills

## Reddit (r/ClaudeAI)

**Subreddit:** r/ClaudeAI
**Flair:** Resource / Tool

---

**Title:** I open-sourced my Claude Code CLI skills collection (TypeScript, Quality Gates, Multi-LLM)

**Body:**

After 6 months of building a B2B SaaS with Claude Code, I extracted the skills that saved me the most time into a public repo.

**What's included:**

- **code-quality-gate** - 5-stage pipeline that blocks deploys on TypeScript/test failures. Caught 3 production incidents before they happened.
- **strict-typescript-mode** - Enforces no `any`, explicit types on exports, generic constraints. Reduced runtime errors by ~80%.
- **multi-llm-advisor** - Calls OpenAI Codex + Gemini for architecture decisions, then Claude synthesizes. Surprisingly useful for "should I use X or Y" questions.
- **gemini-image-gen** - Generate images directly from CLI using Gemini API. I use it for dashboard visuals in PPTX exports.
- **social-media-content** - Platform-specific templates for LinkedIn, X, Reddit (yes, the irony).

**Repo:** https://github.com/Svenja-dev/claude-code-skills

**Installation:**
```bash
mkdir -p ~/.claude/skills/code-quality-gate
# copy SKILL.md content
```

These are battle-tested from building [fabrikIQ](https://app.fabrikiq.com) (manufacturing analytics). Not perfect, but they work.

What skills do you use daily? Looking for inspiration to add more.

---

## X / Twitter

**Thread (3 tweets):**

---

**Tweet 1:**
```
I've been using Claude Code CLI for 6 months.

These 5 custom skills saved me the most time:

1. code-quality-gate (blocks bad deploys)
2. strict-typescript-mode (no more `any`)
3. multi-llm-advisor (Claude + Codex + Gemini)
4. gemini-image-gen
5. social-media-content

Open-sourced: 🧵
```

**Tweet 2:**
```
The multi-llm-advisor is wild.

It sends your architecture question to Codex AND Gemini, then Claude synthesizes both responses.

Three AI perspectives > one.

Saved me from 2 bad database decisions already.
```

**Tweet 3:**
```
Repo: github.com/Svenja-dev/claude-code-skills

MIT license. Copy what you need.

Built while making @fababorat (manufacturing analytics).

What Claude Code skills do you use?
```

---

## Discord (Claude AI Server) - #showcase

**Channel:** #showcase (NOW with hooks!)

**Message:**

---

Built a Claude Code hook system that blocks dangerous commands and enforces quality gates.

**4 TypeScript Hooks:**

1. **security-scan.ts** (PreToolUse → Bash)
   - Blocks `git push --force origin main`
   - Detects secrets in command arguments (AWS keys, tokens)
   - Warns about `git reset --hard`, `curl | sh`

2. **pre-commit-quality.ts** (PreToolUse → Bash)
   - Scans staged diff for exposed secrets
   - Runs `tsc --noEmit` before commit
   - Validates conventional commit format

3. **post-edit-tsc-check.ts** (PostToolUse → Edit/Write)
   - TypeScript check after EVERY file edit
   - Immediate feedback, 45s timeout
   - Finds tsconfig.json automatically

4. **multi-llm-advisor-hook.ts** (UserPromptSubmit)
   - Detects "refactor", "debug", "architecture" keywords
   - Suggests calling Codex + Gemini for second opinion

**Also includes 5 SKILL.md files** for quality gates, TypeScript enforcement, multi-LLM consultation, Gemini image gen, and social media content.

Battle-tested building a B2B SaaS (manufacturing analytics).

Repo: <https://github.com/Svenja-dev/claude-code-skills>

Would love feedback! What hooks do you use daily?

---

## Posting Strategy

| Platform | When | Expected Reach |
|----------|------|----------------|
| Reddit r/ClaudeAI | Tue-Thu, 9-11 AM EST | 50-200 upvotes if useful |
| X/Twitter | Any day, morning | Depends on retweets |
| Discord #general | Anytime | 5-20 replies |

**Tip for Reddit:** Don't post and disappear. Reply to every comment within 2 hours. Algorithm rewards engagement.

**Tip for X:** No link in first tweet. Put repo link in reply or tweet 3.

**Tip for Discord:** Ask a genuine question. "Has anyone done X?" gets more engagement than "Look what I made."
