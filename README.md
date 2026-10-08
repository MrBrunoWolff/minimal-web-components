# Minimal Web Components

A Lit starter for TypeScript web apps, with a small URLPattern router, scoped component styles and browser tests.

[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

## Quick start

Use the Bun version declared in [package.json](package.json).

```sh
git clone https://github.com/MrBrunoWolff/minimal-web-components.git
cd minimal-web-components
bun install --frozen-lockfile
bun run dev
```

Open [localhost:3000](http://localhost:3000).

Install Chromium before running browser tests: `bunx playwright install chromium`.

## Features

- Lit components with Shadow DOM styles.
- Client navigation through URLPattern and the History API.
- Light and dark themes, Vitest browser tests and Playwright tests.

## Scripts

| Command            | Description                                     |
| ------------------ | ----------------------------------------------- |
| `bun run dev`      | Start the Vite development server               |
| `bun run build`    | Type-check and build into dist/                 |
| `bun run preview`  | Preview the production build                    |
| `bun run check`    | Check types, lint, formatting and unused code   |
| `bun run test`     | Run Vitest in Chromium                          |
| `bun run test:e2e` | Run Playwright browser tests                    |
| `bun run audit`    | Audit dependencies                              |
| `bun run check:ci` | Run the complete repository validation contract |

## Development

See the [development guide](docs/development.md) for project structure, implementation details and maintenance. The complete command list is in [package.json](package.json).

## License

MIT — see [LICENSE](LICENSE).
