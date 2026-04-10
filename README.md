# minimal-web-components

[![Lit](https://img.shields.io/badge/Lit-Latest-324FFF?style=flat-square&logo=lit)](https://lit.dev/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=flat-square&logo=vite)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Latest-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![npm](https://img.shields.io/npm/v/minimal-web-components?style=flat-square&logo=npm)](https://www.npmjs.com/package/minimal-web-components)

A minimal starter kit for Web Components projects built with **Lit**, **Vite**, and **TypeScript**.

## Features

- Web Components with [Lit](https://lit.dev/) — reactive properties, scoped styles, Shadow DOM
- [Vite 8](https://vite.dev/) dev server + Rolldown-powered production builds
- TypeScript with strict mode
- [Oxlint](https://oxc.rs/) + [Oxfmt](https://oxc.rs/) — Rust-speed lint and format, no ESLint or Prettier
- [Vitest](https://vitest.dev/) Browser Mode — real Chromium tests with full Shadow DOM support
- Built-in `URLPattern`-based router — zero external dependencies, History API, declarative `<router-outlet>`

## Getting Started

### Create a new project (easiest)

Scaffold a new project with a single command:

```bash
# Using bun (recommended)
bunx minimal-web-components my-app

# Using npm
npx minimal-web-components my-app
```

The interactive CLI will:

1. Ask for your project name (or use the one you provided)
2. Let you choose between bun or npm
3. Clone the template, set up git, and install dependencies

### Clone manually

```bash
git clone https://github.com/MrBrunoWolff/minimal-web-components.git my-app
cd my-app
rm -rf .git bin
git init && git add . && git commit -m "Initial commit"
bun install
```

## Development

```bash
# Start the dev server at http://localhost:3000
bun run dev

# Type-check + production build → dist/
bun run build

# Preview the production build
bun run preview
```

## Testing

Tests run in real Chromium via Playwright — no JSDOM, full Shadow DOM support.

```bash
bun test
```

Example test lives in `test/app-root.test.ts`. Add tests alongside your components in `test/`.

## Linting and Formatting

```bash
bun run lint          # Oxlint
bun run lint:fix      # Auto-fix
bun run fmt           # Oxfmt (write)
bun run fmt:check     # Oxfmt (check only)
bun run check         # lint + fmt:check together
```

## Project Structure

```
minimal-web-components/
├── bin/
│   └── minimal-web-components.js  # CLI scaffolder (npx/bunx)
├── src/
│   ├── components/
│   │   ├── app-root.ts            # Shell — header, nav, footer, router setup
│   │   ├── page-home.ts           # Home page component
│   │   └── page-about.ts          # About page component
│   ├── router/
│   │   ├── index.ts               # Router class (URLPattern + History API)
│   │   └── router-outlet.ts       # <router-outlet> Lit element
│   ├── styles/
│   │   └── global.css             # CSS reset + custom properties (light/dark)
│   └── main.ts                    # Entry point
├── test/
│   └── app-root.test.ts           # Vitest Browser Mode test
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
└── .oxlintrc.json
```

## Router

Routes are configured in `src/components/app-root.ts`:

```ts
const router = new Router([
  { path: '/', component: 'page-home' },
  { path: '/about', component: 'page-about' },
  { path: '/users/:id', component: 'page-user' },
]);
```

The `<router-outlet>` element renders the matched component. Navigate with standard `<a href="...">` links — the router intercepts clicks automatically. For programmatic navigation:

```ts
import { router } from '../router/index.js';
router.navigate('/about');
```

### Route params

The matched component receives route params via the `route-change` custom event on `window`. Listen for it in your component:

```ts
window.addEventListener('route-change', (e) => {
  const { params } = (e as CustomEvent).detail;
  console.log(params.id); // e.g. '42' for /users/42
});
```

## Customization

This template is intentionally minimal. Common additions:

- **More pages** — add a new `src/components/page-*.ts` and register it in `app-root.ts`
- **Global state** — add [`@lit/context`](https://lit.dev/docs/data/context/) for component-tree-scoped state
- **Async tasks** — use [`@lit/task`](https://lit.dev/docs/data/task/) for async data fetching
- **CSS framework** — drop a stylesheet in `src/styles/` and import it in `main.ts`
- **SSR** — add [`@lit-labs/ssr`](https://github.com/lit/lit/tree/main/packages/labs/ssr) when you need server-side rendering

## License

MIT
