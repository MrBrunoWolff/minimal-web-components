import { test, expect } from '@playwright/test';

test.describe('navigation', () => {
  test('home page loads and shows hero', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'minimal-web-components' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Learn more' })).toBeVisible();
  });

  test('navigates to about page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL('/about');
    await expect(page.getByRole('heading', { name: 'About this kit' })).toBeVisible();
  });

  test('navigates back to home from about', async ({ page }) => {
    await page.goto('/about');
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'minimal-web-components' })).toBeVisible();
  });

  test('active nav link is marked correctly', async ({ page }) => {
    await page.goto('/about');
    const aboutLink = page.getByRole('navigation').getByRole('link', { name: 'About' });
    await expect(aboutLink).toHaveClass(/active/);
  });

  test('browser back/forward works via history API', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL('/about');
    await page.goBack();
    await expect(page).toHaveURL('/');
    await page.goForward();
    await expect(page).toHaveURL('/about');
  });
});
