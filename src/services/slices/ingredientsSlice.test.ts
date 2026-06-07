import { fetchAllIngredients, ingredientsReducer } from './ingredientsSlice';
import { TIngredient } from '../../utils/types';
import { feedReducer, fetchOrdersAll } from './feedSlice';

describe('Проверка асинхронного экшена fetchAllIngredients', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  const mockAbstractIngredient: TIngredient = {
    _id: 'any-id',
    name: 'any-name',
    type: 'any-type',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 1,
    image: '',
    image_mobile: '',
    image_large: ''
  };
  const mockBunIngredient: TIngredient = {
    ...mockAbstractIngredient,
    _id: '123',
    name: 'Булка',
    type: 'bun'
  };
  const mockMainIngredient: TIngredient = {
    ...mockAbstractIngredient,
    _id: '456',
    name: 'Основная начинка',
    type: 'main'
  };
  const mockSauceIngredient: TIngredient = {
    ...mockAbstractIngredient,
    _id: '789',
    name: 'Соус',
    type: 'sauce'
  };
  const mockIngredientList: TIngredient[] = [
    mockBunIngredient,
    mockMainIngredient,
    mockSauceIngredient
  ];

  test('При вызове экшена Request - loading меняется на true, error на null', () => {
    const startState = { ...initialState, error: 'Ошибка' };
    const action = { type: fetchAllIngredients.pending.type };
    const finalState = ingredientsReducer(startState, action);
    expect(finalState.loading).toBe(true);
    expect(finalState.error).toBeNull();
  });

  test('Проверка при получении положительного ответа (fulfilled)', () => {
    const startState = {
      ...initialState,
      loading: true
    };
    const action = {
      type: fetchAllIngredients.fulfilled.type,
      payload: mockIngredientList
    };
    const finalState = ingredientsReducer(startState, action);
    expect(finalState.loading).toBe(false);
    expect(finalState.ingredients).toEqual(mockIngredientList); // данные записались
  });

  test('Проверка при получении отрицательного ответа (rejected)', () => {
    const startState = { ...initialState, loading: true };
    const mockResponseError = 'Ошибка запроса списка ингредиентов';
    const action = {
      type: fetchAllIngredients.rejected.type,
      error: { message: mockResponseError }
    };
    const finalState = ingredientsReducer(startState, action);
    expect(finalState.loading).toBe(false);
    expect(finalState.error).toBe(mockResponseError);
  });
});
