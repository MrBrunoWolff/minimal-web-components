import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Router, ROUTE_CHANGE_EVENT, type RouteMatch } from '../router/index.js';
import '../router/router-outlet.js';
import './page-home.js';
import './page-about.js';

const router = new Router([
  { path: '/', component: 'page-home' },
  { path: '/about', component: 'page-about' },
]);

@customElement('app-root')
export class AppRoot extends LitElement {
  @state() private pathname = window.location.pathname;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100dvh;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
      height: 3.5rem;
      border-bottom: 1px solid var(--color-border);
      background: var(--color-bg);
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .logo {
      font-weight: 700;
      font-size: 1rem;
      color: var(--color-text);
      text-decoration: none;
      letter-spacing: -0.01em;
    }

    nav {
      display: flex;
      gap: 0.25rem;
    }

    nav a {
      padding: 0.375rem 0.75rem;
      border-radius: 0.375rem;
      font-size: 0.9375rem;
      color: var(--color-text-muted);
      text-decoration: none;
      transition: background 0.15s, color 0.15s;
    }

    nav a:hover {
      background: var(--color-surface);
      color: var(--color-text);
    }

    nav a.active {
      background: var(--color-surface);
      color: var(--color-text);
      font-weight: 600;
    }

    main {
      flex: 1;
    }

    footer {
      padding: 1.5rem 2rem;
      border-top: 1px solid var(--color-border);
      font-size: 0.875rem;
      color: var(--color-text-muted);
      text-align: center;
    }

    footer a {
      color: var(--color-accent);
      text-decoration: none;
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener(ROUTE_CHANGE_EVENT, this.onRouteChange);
    router.start();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener(ROUTE_CHANGE_EVENT, this.onRouteChange);
  }

  private onRouteChange = (e: Event): void => {
    const match = (e as CustomEvent<RouteMatch | null>).detail;
    this.pathname = match?.pathname ?? window.location.pathname;
  };

  private isActive(path: string): boolean {
    return path === '/'
      ? this.pathname === '/'
      : this.pathname.startsWith(path);
  }

  render() {
    return html`
      <header>
        <a class="logo" href="/">minimal-web-components</a>
        <nav>
          <a href="/" class=${this.isActive('/') ? 'active' : ''}>Home</a>
          <a href="/about" class=${this.isActive('/about') ? 'active' : ''}
            >About</a
          >
        </nav>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
      <footer>
        Built with
        <a href="https://lit.dev" target="_blank" rel="noopener">Lit</a> +
        <a href="https://vite.dev" target="_blank" rel="noopener">Vite</a>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot;
  }
}
