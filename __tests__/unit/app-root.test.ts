import '@vitest/browser/matchers';
import { describe, it, expect, beforeAll } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import '../../src/components/app-root.js';

describe('app-root', () => {
  beforeAll(async () => {
    await customElements.whenDefined('app-root');
  });

  it('renders the header with logo', async () => {
    const screen = render(html`<app-root></app-root>`);
    await expect.element(screen.getByText('minimal-web-components')).toBeVisible();
  });

  it('renders navigation links', async () => {
    const screen = render(html`<app-root></app-root>`);
    await expect.element(screen.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect.element(screen.getByRole('link', { name: 'About' })).toBeVisible();
  });

  it('renders the footer', async () => {
    const screen = render(html`<app-root></app-root>`);
    await expect.element(screen.getByText(/Built with/)).toBeVisible();
  });
});
