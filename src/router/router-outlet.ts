import { LitElement, nothing } from 'lit';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';
import { customElement, state } from 'lit/decorators.js';
import { ROUTE_CHANGE_EVENT, type RouteMatch } from './index.js';

@customElement('router-outlet')
export class RouterOutlet extends LitElement {
  @state() private current: RouteMatch | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener(ROUTE_CHANGE_EVENT, this.onRouteChange);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener(ROUTE_CHANGE_EVENT, this.onRouteChange);
  }

  private onRouteChange = (e: Event): void => {
    this.current = (e as CustomEvent<RouteMatch | null>).detail;
  };

  render() {
    if (!this.current) return nothing;
    const tag = unsafeStatic(this.current.component);
    return staticHtml`<${tag}></${tag}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'router-outlet': RouterOutlet;
  }
}
