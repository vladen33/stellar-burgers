import {
  orderReducer,
  createOrder,
  TOrderState,
  getOrderByNumber,
  getOrders
} from './orderSlice';
import {
  mockBunIngredient,
  mockMainIngredient1,
  mockOrder1,
  mockOrder2,
  mockSauceIngredient1
} from './mockData';
import { fetchAllIngredients, ingredientsReducer } from './ingredientsSlice';
import { TOrder } from '@utils-types';
// import {T} from '../../utils/burger-api';

describe('Проверка асинхронных экшенов: createOrder, getOrderByNumber, getOrders', () => {
  const initialState: TOrderState = {
    order: null,
    orders: [],
    orderByNumber: null,
    orderRequest: false,
    orderModalData: null,
    loading: false,
    error: null
  };

  describe('Проверка асинхронного экшена createOrder', () => {
    test('При вызове экшена Request - loading меняется на true, error на null, orderRequest на true', () => {
      const startState = { ...initialState, error: 'Ошибка' };
      const action = { type: createOrder.pending.type };
      const finalState = orderReducer(startState, action);
      expect(finalState.loading).toBe(true);
      expect(finalState.orderRequest).toBe(true);
      expect(finalState.error).toBeNull();
    });

    test('Проверка при получении положительного ответа (fulfilled)', () => {
      const startState = {
        ...initialState,
        loading: true,
        orderRequest: true,
        error: 'Какая-то ошибка'
      };
      // Request к серверу при создании нового заказа
      const mockServerRequestPayload = {
        ingredients: [
          mockBunIngredient.id,
          mockMainIngredient1.id,
          mockSauceIngredient1.id,
          mockBunIngredient.id
        ]
      };

      // Response от сервера при создании нового заказа
      const mockServerResponsePayload = {
        success: true,
        name: 'Новый бургер',
        order: {
          ingredients: [
            mockBunIngredient,
            mockMainIngredient1,
            mockSauceIngredient1,
            mockBunIngredient
          ],
          _id: 'id-new-order',
          owner: {},
          status: 'done',
          name: 'Новый бургер',
          createdAt: '',
          updatedAt: '',
          number: 12345,
          price: 25000
        }
      };
      const action = {
        type: createOrder.fulfilled.type,
        payload: mockServerResponsePayload
      };
      const finalState = orderReducer(startState, action);
      console.log('finalState = ', finalState);

      expect(finalState.loading).toBe(false);
      expect(finalState.orderRequest).toBe(false);
      expect(finalState.order).toEqual(mockServerResponsePayload.order);
      expect(finalState.orderModalData?.number).toBe(12345);
    });

    test('Проверка при получении отрицательного ответа (rejected)', () => {
      const startState = { ...initialState, loading: true };
      const mockResponseError = 'Ошибка запроса на создание нового бургера ';
      const action = {
        type: createOrder.rejected.type,
        error: { message: mockResponseError }
      };
      const finalState = orderReducer(startState, action);
      expect(finalState.loading).toBe(false);
      expect(finalState.error).toBe(mockResponseError);
    });
  });

  describe('Проверка асинхронного экшена getOrderByNumber', () => {
    test('При вызове экшена Request - loading меняется на true, error на null, orderRequest на true', () => {
      const startState = { ...initialState, error: 'Ошибка' };
      const action = { type: getOrderByNumber.pending.type };
      const finalState = orderReducer(startState, action);
      expect(finalState.loading).toBe(true);
      expect(finalState.error).toBeNull();
    });

    test('Проверка при получении положительного ответа (fulfilled)', () => {
      const startState = { ...initialState, loading: true };
      const action = {
        type: getOrderByNumber.fulfilled.type,
        payload: {
          orders: [mockOrder1]
        }
      };
      const finalState = orderReducer(startState, action);
      expect(finalState.loading).toBe(false);
      expect(finalState.orderByNumber).toEqual(mockOrder1);
    });

    test('Проверка при получении отрицательного ответа (rejected)', () => {
      const startState = { ...initialState, loading: true };
      const mockResponseError = 'Ошибка запроса на создание нового бургера ';
      const action = {
        type: getOrderByNumber.rejected.type,
        error: { message: mockResponseError }
      };
      const finalState = orderReducer(startState, action);
      expect(finalState.loading).toBe(false);
      expect(finalState.error).toBe(mockResponseError);
    });
  });

  describe('Проверка асинхронного экшена getOrders', () => {
    test('Проверка getOrders => pending (loading меняется на true, error на null)', () => {
      const startState = { ...initialState, error: 'Ошибка' };
      const action = { type: getOrders.pending.type };
      const finalState = orderReducer(startState, action);
      expect(finalState.loading).toBe(true);
      expect(finalState.error).toBeNull();
    });

    test('Проверка getOrders => fulfilled (loading меняется на false)', () => {
      const startState = { ...initialState, loading: true };
      const mockOrders: TOrder[] = [mockOrder1, mockOrder2];
      const action = { type: getOrders.fulfilled.type, payload: mockOrders };
      const finalState = orderReducer(startState, action);
      expect(finalState.loading).toBe(false);
      expect(finalState.orders).toEqual(mockOrders);
    });

    test('Проверка getOrders => rejected (loading меняется на false)', () => {
      const startState = { ...initialState, isLoading: true };
      const mockError = 'Ошибка получения списка заказов';
      const action = {
        type: getOrders.rejected.type,
        error: { message: mockError }
      };
      const newState = orderReducer(startState, action);
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(mockError);
    });
  });
});
