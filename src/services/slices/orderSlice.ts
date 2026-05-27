import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface OrderState {
  order: Partial<TOrder> | null;
  orderRequest: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  order: null,
  orderRequest: false,
  loading: false,
  error: null
};

export const createOrder = createAsyncThunk(
  'createOrder',
  async (ingredients: string[]) => await orderBurgerApi(ingredients)
);

export const orderSlice = createSlice({
  name: 'order/createOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка создания заказа';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.loading = false;
        state.orderRequest = false;
      });
  }
});

export const orderReducer = orderSlice.reducer;
