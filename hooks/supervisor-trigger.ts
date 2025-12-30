#!/usr/bin/env node
/**
 * Supervisor Trigger Hook
 *
 * Activates multi-phase QA mode when specific keywords are detected in prompts.
 * Customize NO_TOUCH_ZONES for your project in CLAUDE.md.
 *
 * Originally developed for fabrikiq.com
 */
import { readFileSync } from 'fs';

interface HookInput {
    session_id: string;
    transcript_path: string;
    cwd: string;
    permission_mode: string;
    prompt: string;
}

const SUPERVISOR_TRIGGERS = [
    'mit qa',
    'supervisor mode',
    'supervisor-mode',
    'project management',
    'projektmanagement',
    'supervisor',
    'multi-agent',
    'qa workflow',
    'quality gate'
];

async function main() {
    try {
        const input = readFileSync(0, 'utf-8');
        const data: HookInput = JSON.parse(input);
        const promptLower = data.prompt.toLowerCase();

        // Check for supervisor triggers
        const triggered = SUPERVISOR_TRIGGERS.some(trigger =>
            promptLower.includes(trigger)
        );

        if (triggered) {
            const output = `
========================================
SUPERVISOR MODE ACTIVATED
========================================

You are now working in Multi-Agent QA mode:

1. IMPACT ANALYSIS
   - Which files are affected?
   - Risk Level: LOW/MEDIUM/HIGH

2. NO-TOUCH ZONES CHECK
   Check your project's CLAUDE.md for protected files.
   Common patterns:
   - Authentication logic
   - Core business logic
   - Production config
   - Critical utilities

3. CODE GENERATION
   - With justification
   - Atomic changes

4. QUALITY GATES
   - npx tsc --noEmit
   - npm run build
   - npm run test

5. FEEDBACK LOOP (max 3x)
   - On failure: Return to step 3
   - On success: Propose commit

========================================
`;
            console.log(output);
        }

        process.exit(0);
    } catch (err) {
        process.exit(0);
    }
}

main().catch(() => process.exit(0));
