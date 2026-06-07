import { fetchOrdersAll, feedReducer } from './feedSlice';

describe('Проверка асинхронного экшена fetchOrdersAll', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };
  test('При вызове экшена Request - loading меняется на true? error на null', () => {
    const startState = { ...initialState, error: 'Ошибка' };
    const action = { type: fetchOrdersAll.pending.type };
    const finishState = feedReducer(startState, action);
    expect(finishState.loading).toBe(true);
    expect(finishState.error).toBeNull();
  });
});
