import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('page-about')
export class PageAbout extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .content {
      max-width: 48rem;
      margin: 0 auto;
      padding: 3rem 2rem;
    }

    h1 {
      font-size: 2rem;
      font-weight: 700;
      margin: 0 0 1.5rem;
      color: var(--color-text);
    }

    h2 {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 2rem 0 0.75rem;
      color: var(--color-text);
    }

    p,
    li {
      color: var(--color-text-muted);
      line-height: 1.7;
    }

    ul {
      padding-left: 1.5rem;
      margin: 0;
    }

    li {
      margin-bottom: 0.375rem;
    }

    code {
      font-family: ui-monospace, monospace;
      font-size: 0.875em;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      padding: 0.1em 0.4em;
      border-radius: 0.25rem;
    }

    a {
      color: var(--color-accent);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  `;

  render() {
    return html`
      <section class="content">
        <h1>About this kit</h1>
        <p>
          <strong>minimal-web-components</strong> is a starter kit for building
          apps with Web Components. It is intentionally minimal so you can start
          with the right foundation and add only what you need.
        </p>

        <h2>Stack</h2>
        <ul>
          <li>
            <a href="https://lit.dev" target="_blank" rel="noopener">Lit</a>
            — simple, fast Web Components
          </li>
          <li>
            <a href="https://vite.dev" target="_blank" rel="noopener">Vite</a>
            — dev server + production bundler (Rolldown-powered)
          </li>
          <li>
            <a
              href="https://www.typescriptlang.org"
              target="_blank"
              rel="noopener"
              >TypeScript</a
            >
            — strict type checking
          </li>
          <li>
            <a href="https://oxc.rs" target="_blank" rel="noopener">Oxlint</a>
            + Oxfmt — Rust-speed linting and formatting, no ESLint / Prettier
          </li>
          <li>
            <a href="https://vitest.dev" target="_blank" rel="noopener"
              >Vitest</a
            >
            Browser Mode — real browser testing with Shadow DOM support
          </li>
          <li>
            Built-in <code>URLPattern</code>-based router — zero dependencies,
            history API, nested-route ready
          </li>
        </ul>

        <h2>Router</h2>
        <p>
          Routes are defined in <code>src/main.ts</code> and rendered via
          <code>&lt;router-outlet&gt;</code>. Navigate by using standard
          <code>&lt;a href="..."&gt;</code> links — the router intercepts clicks
          and manages history.
        </p>

        <h2>Testing</h2>
        <p>
          Tests live in <code>test/</code> and run in real Chromium via
          Playwright. Run <code>bun test</code> to execute them.
        </p>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'page-about': PageAbout;
  }
}
