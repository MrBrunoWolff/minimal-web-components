#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const args = process.argv.slice(2);

if (args.includes('--version') || args.includes('-v')) {
  try {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8')
    );
    console.log(`minimal-web-components v${pkg.version}`);
  } catch {
    console.log('Could not determine version');
    process.exit(1);
  }
  process.exit(0);
}

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
  Usage: minimal-web-components [project-name] [options]

  Options:
    -v, --version    Output the version number
    -h, --help       Display this help message

  Example:
    npx minimal-web-components my-app
    bunx minimal-web-components my-app
  `);
  process.exit(0);
}

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}${colors.bright}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}${colors.bright}✓${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}${colors.bright}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}${colors.bright}✗${colors.reset} ${msg}`),
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question) =>
  new Promise((resolve) => rl.question(question, (a) => resolve(a.trim())));

const createProject = async () => {
  try {
    const nameArg = args.find((a) => !a.startsWith('-'));
    const defaultName = 'my-wc-app';

    const projectName =
      nameArg ||
      (await ask(
        `${colors.cyan}${colors.bright}?${colors.reset} Project name (${defaultName}): `
      )) ||
      defaultName;

    const pmAnswer = await ask(
      `${colors.cyan}${colors.bright}?${colors.reset} Package manager ${colors.bright}(npm/bun)${colors.reset}: [bun] `
    );
    const pm = pmAnswer.toLowerCase() === 'npm' ? 'npm' : 'bun';

    rl.close();

    const targetDir = path.join(process.cwd(), projectName);

    if (fs.existsSync(targetDir)) {
      log.error(`Directory "${projectName}" already exists.`);
      process.exit(1);
    }

    fs.mkdirSync(targetDir, { recursive: true });

    log.info('Downloading template...');
    execSync(
      'git clone --depth 1 https://github.com/MrBrunoWolff/minimal-web-components.git .',
      { cwd: targetDir, stdio: 'ignore' }
    );

    // Remove git history so the new project starts fresh
    fs.rmSync(path.join(targetDir, '.git'), { recursive: true, force: true });

    // Remove CLI-only files that scaffolded projects don't need
    fs.rmSync(path.join(targetDir, 'bin'), { recursive: true, force: true });

    // Rewrite package.json for the new project
    const pkgPath = path.join(targetDir, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    pkg.name = projectName;
    pkg.version = '0.1.0';
    pkg.private = true;
    delete pkg.bin;
    delete pkg.files;
    delete pkg.keywords;
    delete pkg.repository;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

    log.info('Initializing git repository...');
    execSync('git init', { cwd: targetDir, stdio: 'ignore' });
    execSync('git add .', { cwd: targetDir, stdio: 'ignore' });
    execSync(
      `git commit -m "Initial commit from minimal-web-components template"`,
      {
        cwd: targetDir,
        stdio: 'ignore',
        env: {
          ...process.env,
          GIT_AUTHOR_NAME: 'minimal-web-components',
          GIT_AUTHOR_EMAIL: 'minimal-web-components@example.com',
          GIT_COMMITTER_NAME: 'minimal-web-components',
          GIT_COMMITTER_EMAIL: 'minimal-web-components@example.com',
        },
      }
    );

    log.info(`Installing dependencies with ${pm}...`);
    execSync(`${pm} install`, { cwd: targetDir, stdio: 'inherit' });

    log.success(
      `Project ${colors.bright}${projectName}${colors.reset} created successfully!`
    );
    console.log(`
  ${colors.bright}cd ${projectName}${colors.reset}
  ${colors.bright}${pm} run dev${colors.reset}
    `);
  } catch (err) {
    log.error(`Failed to create project: ${err.message}`);
    rl.close();
    process.exit(1);
  }
};

createProject();
