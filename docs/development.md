# Minimal Web Components development

[Project overview](../README.md)

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
  { path: "/", component: "page-home" },
  { path: "/about", component: "page-about" },
]);
```

`<router-outlet>` renders the matched component's tag. To add a page, create a `src/components/page-*.ts` element, import it in `app-root.ts` and add it to the route table.

- Clicks on `<a href>` links are intercepted and handled client-side, except hrefs starting with `http`, `//` or `mailto:`.
- Programmatic navigation: `router.navigate('/about')`. The `router` instance is module-local in `app-root.ts`; export it if other modules need it.
- On every navigation the router dispatches a `route-change` event (`ROUTE_CHANGE_EVENT`) on `window`. Its `detail` is a `RouteMatch` (`{ component, params, pathname }`) or `null` when nothing matches.
- The outlet does not pass params to the page. A page can read them with `router.match(location.pathname)?.params`, or listen for `route-change` for later changes.

## Validation and dependencies

Run `bun run check:ci` before a commit or pull request. See [QUALITY.md](../QUALITY.md) for the validation stages. Bun applies the three-day minimum release age in `bunfig.toml`; preserve it when updating dependencies. Verify a frozen install after refreshing the lockfile.
