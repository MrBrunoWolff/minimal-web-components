import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('page-home')
export class PageHome extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .hero {
      text-align: center;
      padding: 4rem 2rem;
    }

    h1 {
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 700;
      margin: 0 0 1rem;
      color: var(--color-text);
    }

    p {
      font-size: 1.125rem;
      color: var(--color-text-muted);
      max-width: 36rem;
      margin: 0 auto 2rem;
      line-height: 1.7;
    }

    .actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    a {
      display: inline-block;
      padding: 0.625rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 600;
      font-size: 0.9375rem;
      text-decoration: none;
      transition: opacity 0.15s;
    }

    a:hover {
      opacity: 0.85;
    }

    .btn-primary {
      background: var(--color-accent);
      color: #fff;
    }

    .btn-secondary {
      background: var(--color-surface);
      color: var(--color-text);
      border: 1px solid var(--color-border);
    }
  `;

  render() {
    return html`
      <section class="hero">
        <h1>minimal-web-components</h1>
        <p>
          A minimal starter kit for Web Components built with Lit, Vite, and
          TypeScript. Clone it, tweak it, ship it.
        </p>
        <div class="actions">
          <a class="btn-primary" href="/about">Learn more</a>
          <a
            class="btn-secondary"
            href="https://lit.dev"
            target="_blank"
            rel="noopener"
          >
            Lit docs
          </a>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'page-home': PageHome;
  }
}
