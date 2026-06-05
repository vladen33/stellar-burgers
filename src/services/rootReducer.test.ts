import { rootReducer } from './store';

test('Проверка правильной инициализации редьюсера', () => {
  const realState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
  const expectedState = {
    ingredients: {
      ingredients: [],
      loading: false,
      error: null
    },
    user: {
      userData: null,
      isAuthChecked: false,
      loading: false,
      error: null
    },
    burgerConstructor: {
      bun: null,
      ingredients: []
    },
    feed: {
      orders: [],
      total: 0,
      totalToday: 0,
      loading: false,
      error: null
    },
    profileOrders: {
      order: null,
      orders: [],
      orderByNumber: null,
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    }
  };
  expect(realState).toEqual(expectedState);
});
