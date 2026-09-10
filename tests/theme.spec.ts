import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('System preference follows live changes; overrides persist across pages and reset', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.goto('/');
  const selector = page.getByRole('group', { name: 'Farbschema' });
  await expect(selector.getByRole('button', { name: 'System', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(21, 28, 26)');
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(238, 238, 232)');
  await selector.getByRole('button', { name: 'Dunkel', exact: true }).click();
  await page.goto('/impressum/');
  await expect(selector.getByRole('button', { name: 'Dunkel', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(21, 28, 26)');
  await selector.getByRole('button', { name: 'Hell', exact: true }).click();
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.reload();
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(238, 238, 232)');
  await selector.getByRole('button', { name: 'System', exact: true }).click();
  expect(await page.evaluate(() => localStorage.getItem('ruben-theme'))).toBeNull();
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(21, 28, 26)');
});

for (const width of [360, 1440]) {
  test(`Dark theme and Easter egg are accessible at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
    const messages: string[] = [];
    page.on('console', (message) => messages.push(message.text()));
    await page.goto('/');
    expect(messages.some((message) => message.includes('Port 22'))).toBeTruthy();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBeTruthy();
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
    ).toEqual([]);
    await expect(page.locator('.packet-trigger')).toHaveCount(0);
    await page.goto('/impressum/');
    await expect(page.locator('footer .packet-trigger')).toHaveCount(0);
    const trigger = page.getByRole('button', { name: 'Überraschung auf Port 22 öffnen' });
    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('dialog')).toBeVisible();
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
    ).toEqual([]);
    await expect(page.getByRole('button', { name: 'Überraschung schließen' })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
    await expect(trigger).toBeFocused();
    await page.goto('/datenschutz/');
    await expect(page.locator('.packet-trigger')).toHaveCount(0);
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
    ).toEqual([]);
  });
}

test('System dark mode works without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, colorScheme: 'dark' });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(21, 28, 26)');
  await expect(page.getByRole('group', { name: 'Farbschema' })).toBeHidden();
  await context.close();
});

test('Theme remains usable when local storage is blocked', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('Blocked', 'SecurityError');
      },
    });
  });
  await page.goto('/');
  await page
    .getByRole('group', { name: 'Farbschema' })
    .getByRole('button', { name: 'Dunkel', exact: true })
    .click();
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(21, 28, 26)');
});
