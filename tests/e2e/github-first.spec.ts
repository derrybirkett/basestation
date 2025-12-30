import { expect, test } from '@playwright/test';

test('user can sign in, enable GitHub, and see repos', async ({ page }) => {
  test.skip(process.env.VITE_GITHUB_SOURCE === 'api' && !process.env.GITHUB_CLIENT_ID, 'OAuth not configured in env');
  await page.goto('/');

  await page.getByRole('textbox', { name: 'Email' }).fill('dev@example.com');
  await page.getByRole('button', { name: 'Sign in' }).click();

  const toggle = page.getByRole('checkbox', { name: 'Enable GitHub integration' });
  await expect(toggle).toBeVisible();

  await toggle.check();

  await expect(
    page.getByRole('link', { name: 'derrybirkett/basestation' }),
  ).toBeVisible();
});

test('user can sign in and see connect link when GitHub api source is enabled but not connected', async ({ page }) => {
  test.skip(process.env.VITE_GITHUB_SOURCE !== 'api', 'Only relevant for api-backed mode');
  await page.goto('/');

  await page.getByRole('textbox', { name: 'Email' }).fill('dev@example.com');
  await page.getByRole('button', { name: 'Sign in' }).click();

  const toggle = page.getByRole('checkbox', { name: 'Enable GitHub integration' });
  await toggle.check();

  await expect(page.getByRole('link', { name: 'Connect GitHub' })).toBeVisible();
});
