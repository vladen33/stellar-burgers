import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { loginUserApi, logoutApi, TRegisterData } from '@api';
import { deleteCookie, setCookie } from '../utils/cookie';
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

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  const data = await logoutApi();
  console.log('>> 1 >> logOutUser - ', data);
  if (data) {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
  console.log('>> 2 >> logOutUser - ', data);
});

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
        state.isAuthChecked = false;
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.loading = false;
        state.error = action.error.message || 'Ошибка Login';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.userData = action.payload;
        state.loading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isAuthChecked = false;
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.loading = true;
        state.error = action.error.message || 'Ошибка Logout';
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isAuthChecked = false;
        state.userData = null;
        state.loading = false;
      });
  }
});

export const userReducer = userSlice.reducer;
