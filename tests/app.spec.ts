import { test, expect } from '@playwright/test';

test.describe('Интеграционные тесты на Playwright для страницы конструктора бургера', () => {
  const bunName = 'Флюоресцентная булка R2-D3';
  const bunTestId = 'test-id-ingredient-643d69a5c3f7b9001cfa093d';
  const mainName = 'Биокотлета из марсианской Магнолии';
  const mainTestId = 'test-id-ingredient-643d69a5c3f7b9001cfa0941';
  const sauceName = 'Соус Spicy-X';
  const sauceTestId = 'test-id-ingredient-643d69a5c3f7b9001cfa0942';

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'test-refresh-token');
    });
    await page.context().addCookies([
      {
        name: 'accessToken',
        value: 'Bearer test-access-token',
        url: 'http://localhost:7777'
      }
    ]);

    // Перехватываем основные запросы до загрузки страницы
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false
    });
    await page.routeFromHAR('./tests/hars/user.har', {
      url: '**/api/auth/user',
      update: false
    });
    await page.goto('/');
  });

  test.afterEach(async ({ page }) => {
    await page.evaluate(() => {
      localStorage.removeItem('refreshToken');
    });
    await page.context().clearCookies();
  });

  test('Ингредиенты загружаются с сервера и доступны на главной странице', async ({ page }) => {
    await expect(page.getByText('Краторная булка N-200i')).toBeAttached();
    await expect(page.getByText('Сыр с астероидной плесенью')).toBeAttached();
  });

  test('Добавление ингредиента из списка в конструктор', async ({ page }) => {
    const constructor = page.getByTestId('test-id-constructor');
    await page.goto('/');
    await page.getByTestId(bunTestId).getByText('Добавить').click();
    await page.getByTestId(mainTestId).getByText('Добавить').click();
    await page.getByTestId(sauceTestId).getByText('Добавить').click();
    await page.getByTestId(mainTestId).getByText('Добавить').click();
    await expect(constructor.getByText(`${bunName} (верх)`)).toBeAttached();
    await expect(constructor.getByText(`${bunName} (низ)`)).toBeAttached();
    await expect(constructor.getByText(`${sauceName}`)).toBeAttached();
    await expect(
      constructor
        .locator('.constructor-element__text')
        .filter({ hasText: mainName })
    ).toHaveCount(2);
  });

  test('Открытие и закрытие модального окна ингредиента', async ({ page }) => {
    const modal = page.getByTestId('test-id-modal');
    const testIdIngredient = 'test-id-ingredient-643d69a5c3f7b9001cfa0945';
    await expect(modal).not.toBeVisible();
    await page.getByTestId(testIdIngredient).click();
    await expect(modal).toBeVisible();
    await expect(
      modal.getByText('Соус с шипами Антарианского плоскоходца')
    ).toBeVisible();
    // Проверяем закрытие модального окна кликом на оверлее
    const modalBox = await modal.boundingBox();
    await page.mouse.click(
      modalBox!.x + modalBox!.width + 10,
      modalBox!.y + 10
    );
    await expect(modal).not.toBeVisible();
    // Проверяем закрытие модального окна кликом на крестик
    await page.getByTestId(testIdIngredient).click();
    await expect(modal).toBeVisible();
    const closeButton = page.getByTestId('test-id-close-button');
    await closeButton.click();
    await expect(modal).not.toBeVisible();
  });

  test('создаёт заказ и очищает конструктор', async ({ page, context }) => {
    await context.addCookies([
      {
        name: 'accessToken',
        value: 'Bearer test-access-token',
        domain: 'localhost',
        path: '/'
      }
    ]);
    // Перехват заказа
    await page.routeFromHAR('./tests/hars/order.har', { url: '**/api/orders' });
    await page.context().addInitScript(() => {
      localStorage.setItem('refreshToken', 'test-refresh-token');
    });
    await page.reload();
    const constructor = page.getByTestId('test-id-constructor');
    await page.getByTestId(bunTestId).getByText('Добавить').click();
    await page.getByTestId(mainTestId).getByText('Добавить').click();
    await page.getByTestId(sauceTestId).getByText('Добавить').click();
    await constructor
      .getByRole('button', { name: 'Оформить заказ' })
      .click({ timeout: 15000 });
    const modal = page.getByTestId('test-id-modal');
    await expect(modal).toBeVisible();
    await expect(modal.getByText('106464')).toBeVisible();
    const closeButton = page.getByTestId('test-id-close-button');
    await closeButton.click();
    await expect(modal).not.toBeVisible();
    // Проверяем, что конструктор пуст
    await expect(
      constructor.locator('*').filter({ hasText: 'Выберите булки' })
    ).toHaveCount(2);
    await expect(constructor.getByRole('listitem')).toHaveCount(0);
  });
});
