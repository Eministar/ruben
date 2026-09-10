import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  test(`Usable layout and accessibility at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('Ruben Schultka');
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBeTruthy();
    if (width <= 600) await page.getByRole('button', { name: 'Menü öffnen' }).click();
    await page.getByRole('link', { name: 'Projekte', exact: true }).click();
    await expect(page).toHaveURL(/#projekte$/);
    await page.locator('#nero-v summary').click();
    await expect(page.locator('#nero-v .case-study-content')).toBeVisible();
    await page.locator('#hosting summary').click();
    await expect(page.locator('#hosting .case-study-content')).toBeVisible();
    await page.evaluate(() =>
      Promise.all(document.getAnimations().map((animation) => animation.finished.catch(() => {}))),
    );
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(result.violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('Keyboard navigation, disclosure controls and clipboard', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Zum Inhalt springen' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#inhalt$/);
  const summary = page.locator('#nero-v summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#nero-v details')).toHaveAttribute('open', '');
  await page.getByRole('button', { name: 'E-Mail kopieren' }).click();
  await expect(page.getByRole('status')).toHaveText('E-Mail-Adresse kopiert.');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('rubenschultka@gmail.com');
});

test('Explorer selection remains usable with keyboard and rapid changes', async ({ page }) => {
  await page.goto('/');
  const controls = page.getByRole('group', { name: 'Arbeitsfeld auswählen' });
  const infrastructure = controls.getByRole('button', { name: 'Infrastruktur' });
  await infrastructure.focus();
  await page.keyboard.press('Enter');
  await expect(infrastructure).toHaveAttribute('aria-pressed', 'true');
  await expect(infrastructure).toBeFocused();
  await expect(page.locator('#field-description')).toContainText('Die Verbindungen dazwischen.');
  await controls.getByRole('button', { name: 'Betrieb' }).click();
  await controls.getByRole('button', { name: 'Entwicklung' }).click();
  await controls.getByRole('button', { name: 'Betrieb' }).click();
  await expect(controls.locator('[aria-pressed="true"]')).toHaveCount(1);
  await expect(page.locator('#field-description')).toContainText('Rack-Server aus der Ferne');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.layer-operations')).toHaveCSS('transform', 'none');
});

for (const path of ['/impressum/', '/datenschutz/']) {
  test(`Legal page ${path} has working navigation, correct data and accessible mobile layout`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(path);
    await expect(page.locator('main')).toContainText('Sternblütenweg 5');
    await expect(page.locator('main')).not.toContainText('2010');
    await expect(page.locator('main h1')).toHaveCount(1);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBeTruthy();
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
    ).toEqual([]);
    await page.getByRole('button', { name: 'Menü öffnen' }).click();
    await page.getByRole('link', { name: 'Projekte', exact: true }).click();
    await expect(page).toHaveURL(/\/#projekte$/);
  });
}

test('Honest public content, working links and metadata', async ({ page, request }) => {
  await page.goto('/');
  const html = await page.content();
  expect(html).not.toMatch(/Sternblütenweg|28\.01\.2010|August 2024|Januar 2024/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /Systemintegration/,
  );
  await expect(page.getByRole('link', { name: 'rubenschultka@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:rubenschultka@gmail.com',
  );
  await expect(page.getByRole('link', { name: '+49 178 4779980' })).toHaveAttribute(
    'href',
    'tel:+491784779980',
  );
  for (const href of await page
    .locator('a[href^="#"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href')!))) {
    await expect(page.locator(href)).toHaveCount(1);
  }
  for (const path of [
    '/robots.txt',
    '/sitemap.xml',
    '/social.png',
    '/favicon.svg',
    '/favicon.png',
    '/apple-touch-icon.png',
  ]) {
    expect((await request.get(path)).ok()).toBeTruthy();
  }
});

test('Reduced motion and core content without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await page.locator('#hosting summary').click();
  await expect(page.locator('#hosting .case-study-content')).toBeVisible();
  await expect(page.getByRole('button', { name: 'E-Mail kopieren' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'rubenschultka@gmail.com' })).toBeVisible();
  expect(await page.locator('html').evaluate((el) => getComputedStyle(el).scrollBehavior)).toBe(
    'auto',
  );
  expect(
    await page.locator('.hero-copy').evaluate((el) => getComputedStyle(el).animationName),
  ).toBe('none');
  await context.close();
});
