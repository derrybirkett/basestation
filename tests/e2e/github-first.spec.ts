import { expect, test } from '@playwright/test';

test('user can sign in, enable GitHub, and see repos', async ({ page }) => {
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
