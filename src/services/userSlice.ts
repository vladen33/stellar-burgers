import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { loginUserApi, TRegisterData } from '@api';
// import { getUserApi } from '@api';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: Omit<TRegisterData, 'name'>) =>
    await loginUserApi({ email, password })
);

type TUserState = {
  isAuthChecked: boolean; // флаг для статуса проверки токена пользователя
  isAuthenticated: boolean;
  data: TUser | null;
  loginUserError: null;
  loginUserRequest: boolean;
};

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
  loginUserError: null,
  loginUserRequest: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
});

//
// type TUserState = {
//   user: TUser | null;
//   loading: boolean;
//   error: string | null;
// };
//
// const initialState: TUserState = {
//   user: null,
//   loading: false,
//   error: null
// };
//
// export const fetchUser = createAsyncThunk('users/fetchAll', getUserApi);
//
// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error =
//           action.error.message || 'Ошибка при загрузке пользователя.';
//       })
//       .addCase(fetchUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//       });
//   }
// });
//
export const userReducer = userSlice.reducer;
