import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';

// https://norma.education-services.ru/api/orders/all
// https://norma.education-services.ru/api/orders

type TFeedState = {
  orders: Array<TOrder>;
  loading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  loading: false,
  error: null
};

export const fetchOrdersAll = createAsyncThunk(
  'feed/fetchOrdersAll',
  getFeedsApi
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersAll.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Ошибка при загрузке списка заказов.';
      })
      .addCase(fetchOrdersAll.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      });
  }
});

export const feedReducer = feedSlice.reducer;
