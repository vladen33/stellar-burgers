import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getUserApi } from '@api';

type TUserState = {
  user: TUser | null;
  loading: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: null,
  loading: false,
  error: null
};

export const fetchUser = createAsyncThunk('users/fetchAll', getUserApi);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Ошибка при загрузке пользователя.';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      });
  }
});

export const userReducer = userSlice.reducer;
