#!/usr/bin/env node
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

interface HookInput {
    session_id: string;
    transcript_path: string;
    cwd: string;
    permission_mode: string;
    prompt: string;
}

interface PromptTriggers {
    keywords?: string[];
    intentPatterns?: string[];
}

interface SkillRule {
    type: 'guardrail' | 'domain';
    enforcement: 'block' | 'suggest' | 'warn';
    priority: 'critical' | 'high' | 'medium' | 'low';
    promptTriggers?: PromptTriggers;
}

interface SkillRules {
    version: string;
    skills: Record<string, SkillRule>;
}

interface MatchedSkill {
    name: string;
    matchType: 'keyword' | 'intent';
    config: SkillRule;
}

async function main() {
    try {
        // Read input from stdin
        const input = readFileSync(0, 'utf-8');
        const data: HookInput = JSON.parse(input);
        const prompt = data.prompt.toLowerCase();

        // Load skill rules - try multiple locations
        const projectDir = process.env.CLAUDE_PROJECT_DIR || data.cwd || join(homedir(), 'project');
        const rulesPath = join(projectDir, '.claude', 'skills', 'skill-rules.json');

        // Graceful exit if skill-rules.json does not exist
        if (!existsSync(rulesPath)) {
            process.exit(0);
        }

        const rules: SkillRules = JSON.parse(readFileSync(rulesPath, 'utf-8'));

        const matchedSkills: MatchedSkill[] = [];

        // Check each skill for matches
        for (const [skillName, config] of Object.entries(rules.skills)) {
            const triggers = config.promptTriggers;
            if (!triggers) {
                continue;
            }

            // Keyword matching
            if (triggers.keywords) {
                const keywordMatch = triggers.keywords.some(kw =>
                    prompt.includes(kw.toLowerCase())
                );
                if (keywordMatch) {
                    matchedSkills.push({ name: skillName, matchType: 'keyword', config });
                    continue;
                }
            }

            // Intent pattern matching
            if (triggers.intentPatterns) {
                const intentMatch = triggers.intentPatterns.some(pattern => {
                    const regex = new RegExp(pattern, 'i');
                    return regex.test(prompt);
                });
                if (intentMatch) {
                    matchedSkills.push({ name: skillName, matchType: 'intent', config });
                }
            }
        }

        // Generate output if matches found
        if (matchedSkills.length > 0) {
            let output = '========================================\n';
            output += '[!] SKILL ACTIVATION CHECK\n';
            output += '========================================\n\n';

            // Group by priority
            const critical = matchedSkills.filter(s => s.config.priority === 'critical');
            const high = matchedSkills.filter(s => s.config.priority === 'high');
            const medium = matchedSkills.filter(s => s.config.priority === 'medium');
            const low = matchedSkills.filter(s => s.config.priority === 'low');

            if (critical.length > 0) {
                output += '[!!] CRITICAL SKILLS (REQUIRED):\n';
                critical.forEach(s => output += '  -> ' + s.name + '\n');
                output += '\n';
            }

            if (high.length > 0) {
                output += '[*] RECOMMENDED SKILLS:\n';
                high.forEach(s => output += '  -> ' + s.name + '\n');
                output += '\n';
            }

            if (medium.length > 0) {
                output += '[+] SUGGESTED SKILLS:\n';
                medium.forEach(s => output += '  -> ' + s.name + '\n');
                output += '\n';
            }

            if (low.length > 0) {
                output += '[i] OPTIONAL SKILLS:\n';
                low.forEach(s => output += '  -> ' + s.name + '\n');
                output += '\n';
            }

            output += 'ACTION: Use Skill tool BEFORE responding\n';
            output += '========================================\n';

            console.log(output);
        }

        process.exit(0);
    } catch (err) {
        // Silent exit on errors - do not block user workflow
        process.exit(0);
    }
}

main().catch(() => {
    process.exit(0);
});
