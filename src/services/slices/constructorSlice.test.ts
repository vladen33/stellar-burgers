import {
  addIngredient,
  constructorReducer,
  deleteIngredient,
  moveDownIngredient,
  moveUpIngredient,
  clearConstructor
} from './constructorSlice';

describe('Проверка работы слайса burgerConstructor', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };
  const mockAbstractIngredient = {
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
    image_large: 'Image link for desktop',
    __v: 0
  };

  const mockBunIngredient = {
    ...mockAbstractIngredient,
    type: 'bun',
    id: 'id-bun'
  };

  const mockMainIngredient1 = {
    ...mockAbstractIngredient,
    type: 'main',
    id: 'id-main-1'
  };

  const mockMainIngredient2 = {
    ...mockMainIngredient1,
    id: 'id-main-2'
  };

  const mockSauceIngredient1 = {
    ...mockAbstractIngredient,
    type: 'sauce',
    id: 'id-sauce-1'
  };

  const mockSauceIngredient2 = {
    ...mockAbstractIngredient,
    id: 'id-sauce-2'
  };

  test('Проверка экшена добавления главного ингредиента (bun)', () => {
    const action = {
      type: addIngredient.type,
      payload: { ...mockBunIngredient, id: 'randomId' }
    };
    const state = constructorReducer(initialState, action);
    expect(state.bun).toEqual({ ...mockBunIngredient, id: 'randomId' });
    expect(state.ingredients).toHaveLength(0);
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
    const finishState = {
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
    expect(resState).toEqual(finishState);
  });

  test('Проверка экшена очистки конструктора', () => {
    const startState = {
      bun: mockBunIngredient,
      ingredients: [mockMainIngredient1, mockSauceIngredient1]
    };
    const finishState = {
      bun: null,
      ingredients: []
    };
    const resState = constructorReducer(startState, clearConstructor());
    expect(resState).toEqual(finishState);
  });
});
