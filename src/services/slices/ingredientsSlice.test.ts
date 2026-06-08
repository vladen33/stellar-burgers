import { fetchAllIngredients, ingredientsReducer } from './ingredientsSlice';
import { TIngredient } from '../../utils/types';
import {
  mockBunIngredient,
  mockMainIngredient1,
  mockMainIngredient2,
  mockSauceIngredient1,
  mockSauceIngredient2
} from './mockData';

describe('Проверка асинхронного экшена fetchAllIngredients', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  const mockIngredientList: TIngredient[] = [
    mockBunIngredient,
    mockMainIngredient1,
    mockMainIngredient2,
    mockSauceIngredient1,
    mockSauceIngredient2
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
