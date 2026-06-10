import { test, expect } from '@playwright/test';
import mockIngredients from './ingredients.json';

test.describe('Интеграционные тесты на Playwright для страницы конструктора бургера', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: /.*\/ingredients/,
      update: true,
      notFound: 'fallback'
    });
  });

  test('', async ({ page }) => {
    await page.goto('/');
  });
});
