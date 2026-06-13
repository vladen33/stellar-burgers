import { TIngredient, TOrder } from '../../utils/types';

// ИНГРЕДИЕНТЫ
const mockAbstractIngredient: TIngredient = {
  _id: 'AnyId',
  name: 'AnuName',
  type: 'abstractType',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 1,
  image: 'Image link',
  image_mobile: 'Image link for mobile',
  image_large: 'Image link for desktop'
};

const mockBunIngredient = {
  ...mockAbstractIngredient,
  _id: '123',
  name: 'Булка',
  type: 'bun',
  id: 'id-bun'
};

const mockMainIngredient1 = {
  ...mockAbstractIngredient,
  _id: '444',
  name: 'Основная начинка - 1',
  type: 'main',
  id: 'id-main-1'
};

const mockMainIngredient2 = {
  ...mockMainIngredient1,
  _id: '555',
  name: 'Основная начинка - 2',
  type: 'main',
  id: 'id-main-2'
};

const mockSauceIngredient1 = {
  ...mockAbstractIngredient,
  _id: '777',
  name: 'Соус - 1',
  type: 'sauce',
  id: 'id-sauce-1'
};

const mockSauceIngredient2 = {
  ...mockAbstractIngredient,
  _id: '888',
  name: 'Соус - 2',
  type: 'sauce',
  id: 'id-sauce-2'
};

// ЗАКАЗЫ
const mockOrder1: TOrder = {
  _id: 'any-id-1',
  status: 'done',
  name: 'Космический бургер',
  createdAt: '2026-06-06',
  updatedAt: '2026-06-06',
  number: 55555,
  ingredients: ['id-bun', 'id-main-1', 'id-sauce-1', 'id-bun']
};
const mockOrder2: TOrder = {
  _id: 'any-id-2',
  status: 'done',
  name: 'Марсиансткий бургер',
  createdAt: '2026-06-07',
  updatedAt: '2026-06-07',
  number: 77777,
  ingredients: ['id-bun', 'id-main-2', 'id-sauce-2', 'id-bun']
};

export {
  mockBunIngredient,
  mockMainIngredient1,
  mockMainIngredient2,
  mockSauceIngredient1,
  mockSauceIngredient2,
  mockOrder1,
  mockOrder2
};
