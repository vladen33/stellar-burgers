import { test, expect } from '@playwright/test';
import mockIngredients from './ingredients.json';

test.describe('Интеграционные тесты на Playwright для страницы конструктора бургера', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/ingredients',
      update: false, // при выполнении записи файла har - раскомментировать строку с updateContent: 'attach',
      // updateContent: 'attach',
      notFound: 'fallback'
    });
    await page.goto('/');
  });

  test('Ингредиенты загружаются с сервера и доступны на главной странице', async ({ page }) => {
    await expect(page.getByText('Краторная булка N-200i')).toBeAttached();
    await expect(page.getByText('Сыр с астероидной плесенью')).toBeAttached();
  });

  test('Добавление ингредиента из списка в конструктор', async ({ page }) => {
    const constructor = page.getByTestId('test-id-constructor');
    const bunName = 'Флюоресцентная булка R2-D3';
    const bunTestId = 'test-id-ingredient-643d69a5c3f7b9001cfa093d';
    const mainName = 'Биокотлета из марсианской Магнолии';
    const mainTestId = 'test-id-ingredient-643d69a5c3f7b9001cfa0941';
    const sauceName = 'Соус фирменный Space Sauce';
    const sauceTestId = 'test-id-ingredient-643d69a5c3f7b9001cfa0943';

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
});
