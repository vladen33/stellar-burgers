import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { loginUserApi, TRegisterData } from '@api';
import { setCookie } from '../utils/cookie';
// import { getUserApi } from '@api';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (
    { email, password }: Omit<TRegisterData, 'name'>,
    { rejectWithValue }
  ) => {
    const data = await loginUserApi({ email, password });
    console.log('>> 1 >> loginUser - ', data);
    if (!data?.success) {
      return rejectWithValue(data);
    }
    console.log('>> 2 >> loginUser - ', data);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

type TUserState = {
  userData: TUser | null;
  isAuthChecked: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: TUserState = {
  userData: null,
  isAuthChecked: false,
  loading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message || 'Ошибка логина/пароля';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loading = false;
        state.isAuthChecked = true;
      });
  }
});

export const userReducer = userSlice.reducer;
