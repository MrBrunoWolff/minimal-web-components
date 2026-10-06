# Minimal Web Components

A minimal Web Components starter built with Lit, Vite and TypeScript, run with Bun.

[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

## Features

- [Lit 3](https://lit.dev/) components with decorators and scoped Shadow DOM styles, TypeScript in strict mode
- [Vite 8](https://vite.dev/) dev server on port 3000; Terser-minified production build with source maps
- Built-in `URLPattern` + History API router with a `<router-outlet>` element, no dependencies beyond `lit`
- Unit tests in [Vitest](https://vitest.dev/) browser mode (real Chromium via Playwright), plus Playwright end-to-end tests
- [Oxlint](https://oxc.rs/), [Oxfmt](https://oxc.rs/) and [Knip](https://knip.dev/); `bun run check` runs them with the type check in parallel
- Light/dark theme through CSS custom properties in `src/styles/global.css`
- GitHub Actions CI: check, unit tests, build and `bun audit` on every push and pull request
- `bunfig.toml` refuses npm versions published less than 3 days ago

## Quick start

### Clone

```sh
git clone https://github.com/MrBrunoWolff/minimal-web-components.git
cd minimal-web-components
bun install
bun run dev
```

## Scripts

| Command                   | Description                                                                 |
| ------------------------- | --------------------------------------------------------------------------- |
| `bun run dev`             | Start the Vite dev server at http://localhost:3000 and open the browser     |
| `bun run start`           | Same as `dev`                                                               |
| `bun run build`           | Type-check with `tsc`, then build for production into `dist/`               |
| `bun run typecheck`       | Type-check with `tsc --noEmit`                                              |
| `bun run preview`         | Serve the production build locally                                          |
| `bun run test`            | Run the Vitest unit tests in browser mode (Chromium); watches by default    |
| `bun run test:e2e`        | Run the Playwright end-to-end tests (starts the dev server if not running)  |
| `bun run test:e2e:ui`     | Run the Playwright tests in UI mode                                         |
| `bun run test:e2e:report` | Open the last Playwright HTML report                                        |
| `bun run lint`            | Lint with Oxlint                                                            |
| `bun run lint:fix`        | Lint with Oxlint and apply automatic fixes                                  |
| `bun run fmt`             | Format the project with Oxfmt                                               |
| `bun run fmt:check`       | Check formatting with Oxfmt without writing                                 |
| `bun run check`           | Run `typecheck`, `lint`, `fmt:check` and `knip` in parallel                 |
| `bun run knip`            | Report unused files, exports and dependencies                               |
| `bun run clean`           | Remove the Vite cache, `dist/`, `playwright-report/` and `test-results/`    |
| `bun run audit`           | Run `bun audit`, failing on high or critical advisories                     |

## Project structure

```
minimal-web-components/
├── .github/workflows/ci.yml    # Check, test, build, audit; npm publish on main
├── __tests__/
│   ├── e2e/navigation.spec.ts  # Playwright end-to-end tests
│   └── unit/app-root.test.ts   # Vitest browser-mode tests
├── bin/
│   └── minimal-web-components.js  # Project scaffolding CLI (package bin)
├── src/
│   ├── components/
│   │   ├── app-root.ts         # Shell: header, nav, footer, route table
│   │   ├── page-home.ts        # Home page
│   │   └── page-about.ts       # About page
│   ├── router/
│   │   ├── index.ts            # Router class (URLPattern + History API)
│   │   └── router-outlet.ts    # <router-outlet> element
│   ├── styles/global.css       # Reset + light/dark custom properties
│   ├── main.ts                 # Entry point
│   └── vite-env.d.ts
├── index.html
├── bunfig.toml
├── knip.config.ts
├── playwright.config.ts
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── .oxfmtrc.json
├── .oxlintrc.json
├── package.json
└── LICENSE
```

## Router

Routes are declared in `src/components/app-root.ts`. Paths use `URLPattern` syntax, so named params like `:id` work:

```ts
const router = new Router([
  { path: '/', component: 'page-home' },
  { path: '/about', component: 'page-about' },
]);
```

`<router-outlet>` renders the matched component's tag. To add a page, create a `src/components/page-*.ts` element, import it in `app-root.ts` and add it to the route table.

- Clicks on `<a href>` links are intercepted and handled client-side, except hrefs starting with `http`, `//` or `mailto:`.
- Programmatic navigation: `router.navigate('/about')`. The `router` instance is module-local in `app-root.ts`; export it if other modules need it.
- On every navigation the router dispatches a `route-change` event (`ROUTE_CHANGE_EVENT`) on `window`. Its `detail` is a `RouteMatch` (`{ component, params, pathname }`) or `null` when nothing matches.
- The outlet does not pass params to the page. A page can read them with `router.match(location.pathname)?.params`, or listen for `route-change` for later changes.

## License

MIT — see [LICENSE](LICENSE).

All declared runtime and development dependencies use `latest`, including
TypeScript where present. Bun resolves eligible stable releases behind the
three-day release-age guard; commit the refreshed lockfile and verify a frozen
install after each update.
