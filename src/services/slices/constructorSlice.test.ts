import {
  addIngredient,
  constructorReducer,
  deleteIngredient,
  moveDownIngredient,
  moveUpIngredient,
  clearConstructor
} from './constructorSlice';

import {
  mockBunIngredient,
  mockMainIngredient1,
  mockMainIngredient2,
  mockSauceIngredient1,
  mockSauceIngredient2
} from './mockData';

describe('Проверка работы слайса burgerConstructor', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  test('Проверка экшена добавления главного ингредиента (bun)', () => {
    const action = {
      type: addIngredient.type,
      payload: { ...mockBunIngredient, id: 'randomId' }
    };
    const finalState = constructorReducer(initialState, action);
    expect(finalState.bun).toEqual({ ...mockBunIngredient, id: 'randomId' });
    expect(finalState.ingredients).toHaveLength(0);
  });

  test('Проверка экшена добавления дополнительных ингредиентов (main, sauce)', () => {
    const actionMain = {
      type: addIngredient.type,
      payload: mockMainIngredient1
    };
    const actionSauce = {
      type: addIngredient.type,
      payload: mockSauceIngredient1
    };
    let state = constructorReducer(initialState, actionMain);
    state = constructorReducer(state, actionSauce);
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(2);
    expect(state.ingredients[0]).toEqual(mockMainIngredient1);
    expect(state.ingredients[1]).toEqual(mockSauceIngredient1);
  });

  test('Проверка экшена удаления ингредиента', () => {
    const state = {
      ...initialState,
      ingredients: [
        mockMainIngredient1,
        mockMainIngredient2,
        mockSauceIngredient1,
        mockSauceIngredient2
      ]
    };
    let resState = constructorReducer(state, deleteIngredient('id-sauce-2'));
    resState = constructorReducer(resState, deleteIngredient('id-main-1'));
    expect(resState.ingredients).toHaveLength(2);
    expect(resState.ingredients[0]).toEqual(mockMainIngredient2);
    expect(resState.ingredients[1]).toEqual(mockSauceIngredient1);
  });

  test('Проверка экшена изменение порядка ингредиентов', () => {
    const startState = {
      ...initialState,
      ingredients: [
        mockMainIngredient1,
        mockMainIngredient2,
        mockSauceIngredient1,
        mockSauceIngredient2
      ]
    };
    const finalState = {
      ...initialState,
      ingredients: [
        mockMainIngredient2,
        mockMainIngredient1,
        mockSauceIngredient2,
        mockSauceIngredient1
      ]
    };
    let resState = constructorReducer(startState, moveDownIngredient(0));
    resState = constructorReducer(resState, moveUpIngredient(3));
    expect(resState).toEqual(finalState);
  });

  test('Проверка экшена очистки конструктора', () => {
    const startState = {
      bun: mockBunIngredient,
      ingredients: [mockMainIngredient1, mockSauceIngredient1]
    };
    const finalState = {
      bun: null,
      ingredients: []
    };
    const resState = constructorReducer(startState, clearConstructor());
    expect(resState).toEqual(finalState);
  });
});
