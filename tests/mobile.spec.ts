import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const colorScheme of ['light', 'dark'] as const) {
  test(`Mobile content expands on demand and navigation is keyboard accessible (${colorScheme})`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.getByRole('navigation', { name: 'Hauptnavigation' })).toBeHidden();
    await expect(page.locator('.explorer-controls')).toBeHidden();
    await expect(page.locator('.skill-group ul').first()).toBeHidden();
    const menu = page.getByRole('button', { name: /Menü (öffnen|schließen)/ });
    await menu.focus();
    await page.keyboard.press('Enter');
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('link', { name: 'Projekte', exact: true })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menu).toBeFocused();
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await page.locator('.explorer-disclosure > summary').click();
    await page.getByRole('button', { name: 'Betrieb', exact: true }).click();
    await expect(page.locator('#field-description')).toContainText('Rack-Server');
    for (const summary of await page.locator('.skill-group > summary').all()) await summary.click();
    await expect(page.locator('.skill-group ul').first()).toBeVisible();
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
    ).toEqual([]);
    await page.setViewportSize({ width: 1440, height: 1000 });
    await expect(page.getByRole('navigation', { name: 'Hauptnavigation' })).toBeVisible();
    await expect(page.locator('.explorer-controls')).toBeVisible();
    await expect(page.locator('.skill-group ul').first()).toBeVisible();
    await expect(page.locator('.menu-toggle')).toBeHidden();
  });
}
