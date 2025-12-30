#!/usr/bin/env node
import { readFileSync, existsSync, mkdirSync, appendFileSync, writeFileSync } from 'fs';
import { join, dirname, extname, basename, relative } from 'path';
import { homedir } from 'os';

interface ToolInfo {
    tool_name: string;
    tool_input: {
        file_path?: string;
        [key: string]: unknown;
    };
    session_id?: string;
}

interface CommandEntry {
    repo: string;
    type: 'build' | 'tsc';
    command: string;
}

function detectRepo(filePath: string, projectRoot: string): string {
    const relativePath = relative(projectRoot, filePath).replace(/\/g, '/');
    const firstDir = relativePath.split('/')[0];

    const knownDirs = [
        'frontend', 'client', 'web', 'app', 'ui',
        'backend', 'server', 'api', 'src', 'services',
        'database', 'prisma', 'migrations'
    ];

    if (knownDirs.includes(firstDir)) {
        return firstDir;
    }

    if (firstDir === 'packages' || firstDir === 'examples') {
        const secondDir = relativePath.split('/')[1];
        return secondDir ? firstDir + '/' + secondDir : firstDir;
    }

    if (!relativePath.includes('/')) {
        return 'root';
    }

    return 'unknown';
}

function detectPackageManager(repoPath: string): 'pnpm' | 'yarn' | 'npm' {
    if (existsSync(join(repoPath, 'pnpm-lock.yaml'))) return 'pnpm';
    if (existsSync(join(repoPath, 'yarn.lock'))) return 'yarn';
    return 'npm';
}

function getBuildCommand(repo: string, projectRoot: string): string | null {
    const repoPath = join(projectRoot, repo);
    const packageJsonPath = join(repoPath, 'package.json');

    if (existsSync(packageJsonPath)) {
        try {
            const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
            if (pkg.scripts?.build) {
                const pm = detectPackageManager(repoPath);
                const runCmd = pm === 'npm' ? 'npm run' : pm;
                return 'cd ' + repoPath + ' && ' + runCmd + ' build';
            }
        } catch {
            // Ignore parse errors
        }
    }

    // Prisma special case
    if (repo === 'database' || repo.includes('prisma')) {
        const schemaPath = existsSync(join(repoPath, 'schema.prisma'))
            ? join(repoPath, 'schema.prisma')
            : join(repoPath, 'prisma', 'schema.prisma');
        if (existsSync(schemaPath)) {
            return 'cd ' + repoPath + ' && npx prisma generate';
        }
    }

    return null;
}

function getTscCommand(repo: string, projectRoot: string): string | null {
    const repoPath = join(projectRoot, repo);

    // Check for tsconfig
    if (existsSync(join(repoPath, 'tsconfig.json'))) {
        if (existsSync(join(repoPath, 'tsconfig.app.json'))) {
            return 'cd ' + repoPath + ' && npx tsc --project tsconfig.app.json --noEmit';
        }
        return 'cd ' + repoPath + ' && npx tsc --noEmit';
    }

    return null;
}

async function main() {
    try {
        // Read tool info from stdin
        const input = readFileSync(0, 'utf-8');
        const toolInfo: ToolInfo = JSON.parse(input);

        const toolName = toolInfo.tool_name;
        const filePath = toolInfo.tool_input?.file_path;
        const sessionId = toolInfo.session_id || 'default';

        // Skip if not an edit tool or no file path
        if (!['Edit', 'MultiEdit', 'Write'].includes(toolName) || !filePath) {
            process.exit(0);
        }

        // Skip markdown files
        const ext = extname(filePath).toLowerCase();
        if (['.md', '.markdown'].includes(ext)) {
            process.exit(0);
        }

        // Get project directory
        const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
        const cacheDir = join(projectDir, '.claude', 'tsc-cache', sessionId);

        // Create cache directory
        if (!existsSync(cacheDir)) {
            mkdirSync(cacheDir, { recursive: true });
        }

        // Detect repo
        const repo = detectRepo(filePath, projectDir);

        if (repo === 'unknown' || !repo) {
            process.exit(0);
        }

        // Log edited file
        const timestamp = Math.floor(Date.now() / 1000);
        appendFileSync(join(cacheDir, 'edited-files.log'), timestamp + ':' + filePath + ':' + repo + '\n');

        // Update affected repos
        const affectedReposPath = join(cacheDir, 'affected-repos.txt');
        let affectedRepos: string[] = [];
        if (existsSync(affectedReposPath)) {
            affectedRepos = readFileSync(affectedReposPath, 'utf-8').split('\n').filter(Boolean);
        }
        if (!affectedRepos.includes(repo)) {
            affectedRepos.push(repo);
            writeFileSync(affectedReposPath, affectedRepos.join('\n') + '\n');
        }

        // Store commands
        const commands: CommandEntry[] = [];
        const commandsPath = join(cacheDir, 'commands.txt');

        if (existsSync(commandsPath)) {
            const existing = readFileSync(commandsPath, 'utf-8').split('\n').filter(Boolean);
            existing.forEach(line => {
                const [r, t, ...cmdParts] = line.split(':');
                if (r && t && cmdParts.length) {
                    commands.push({ repo: r, type: t as 'build' | 'tsc', command: cmdParts.join(':') });
                }
            });
        }

        const buildCmd = getBuildCommand(repo, projectDir);
        const tscCmd = getTscCommand(repo, projectDir);

        if (buildCmd && !commands.some(c => c.repo === repo && c.type === 'build')) {
            commands.push({ repo, type: 'build', command: buildCmd });
        }
        if (tscCmd && !commands.some(c => c.repo === repo && c.type === 'tsc')) {
            commands.push({ repo, type: 'tsc', command: tscCmd });
        }

        // Write unique commands
        const uniqueCommands = commands.map(c => c.repo + ':' + c.type + ':' + c.command);
        writeFileSync(commandsPath, [...new Set(uniqueCommands)].join('\n') + '\n');

        process.exit(0);
    } catch {
        // Silent exit on errors
        process.exit(0);
    }
}

main().catch(() => process.exit(0));
