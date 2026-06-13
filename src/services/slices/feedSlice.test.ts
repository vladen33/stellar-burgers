import { fetchOrdersAll, feedReducer } from './feedSlice';
import { mockOrder1, mockOrder2 } from './mockData';

describe('Проверка асинхронного экшена fetchOrdersAll', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  test('Проверка feedReducer при вызове с неизвестным экшеном', () => {
    const startState = { ...initialState };
    const finalState = feedReducer(startState, {
      type: 'UNKNOWN_ACTION'
    });
    expect(startState).toEqual(finalState);
  });

  test('При вызове экшена Request - loading меняется на true, error на null', () => {
    const startState = { ...initialState, error: 'Ошибка' };
    const action = { type: fetchOrdersAll.pending.type };
    const finalState = feedReducer(startState, action);
    expect(finalState.loading).toBe(true);
    expect(finalState.error).toBeNull();
  });

  test('Проверка при получении положительного ответа (fulfilled)', () => {
    const startState = { ...initialState, loading: true };
    const mockResponsePayload = {
      orders: [mockOrder1, mockOrder2],
      total: 7777,
      totalToday: 55
    };
    const action = {
      type: fetchOrdersAll.fulfilled.type,
      payload: mockResponsePayload
    };
    const finalState = feedReducer(startState, action);

    expect(finalState.loading).toBe(false);
    expect(finalState.orders).toEqual([mockOrder1, mockOrder2]);
    expect(finalState.total).toBe(7777);
    expect(finalState.totalToday).toBe(55);
  });

  test('Проверка при получении отрицательного ответа (rejected)', () => {
    const startState = { ...initialState, loading: true };
    const mockResponseError = 'Ошибка запроса списка готовых заказов';
    const action = {
      type: fetchOrdersAll.rejected.type,
      error: { message: mockResponseError }
    };
    const finalState = feedReducer(startState, action);
    expect(finalState.loading).toBe(false);
    expect(finalState.error).toBe(mockResponseError);
  });
});
