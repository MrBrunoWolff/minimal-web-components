interface RouteDefinition {
  pattern: URLPattern;
  component: string;
}

export interface RouteMatch {
  component: string;
  params: Record<string, string>;
  pathname: string;
}

const ROUTE_CHANGE_EVENT = 'route-change';

export class Router {
  private routes: RouteDefinition[] = [];

  constructor(routes: Array<{ path: string; component: string }>) {
    this.routes = routes.map(({ path, component }) => ({
      pattern: new URLPattern({ pathname: path }),
      component,
    }));

    window.addEventListener('popstate', () => this.dispatch());
    document.addEventListener('click', (e) => this.handleClick(e));
  }

  private handleClick(e: MouseEvent): void {
    const target = (e.composedPath() as unknown as Element[]).find(
      (el) => el.tagName?.toLowerCase() === 'a',
    ) as HTMLAnchorElement | undefined;

    if (!target) return;

    const href = target.getAttribute('href');
    if (
      !href ||
      href.startsWith('http') ||
      href.startsWith('//') ||
      href.startsWith('mailto:')
    )
      return;

    e.preventDefault();
    this.navigate(href);
  }

  match(pathname: string): RouteMatch | null {
    for (const route of this.routes) {
      const result = route.pattern.exec({ pathname });
      if (result) {
        const params: Record<string, string> = {};
        const groups = result.pathname.groups;
        for (const [key, value] of Object.entries(groups)) {
          if (value !== undefined) params[key] = value;
        }
        return { component: route.component, params, pathname };
      }
    }
    return null;
  }

  navigate(path: string): void {
    window.history.pushState(null, '', path);
    this.dispatch();
  }

  private dispatch(): void {
    const matched = this.match(window.location.pathname);
    window.dispatchEvent(
      new CustomEvent<RouteMatch | null>(ROUTE_CHANGE_EVENT, {
        detail: matched,
        bubbles: true,
      }),
    );
  }

  start(): void {
    // Defer past Lit's first async render cycle (microtask) so that
    // <router-outlet> has connected and registered its event listener
    // before the initial route-change event fires.
    setTimeout(() => this.dispatch(), 0);
  }
}

export { ROUTE_CHANGE_EVENT };
