import { RootState, useSelector } from './store';
import { createSelector } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

// user
export const getUserDataSelector = (state: RootState) => state.user.userData;
export const getIsAuthCheckedSelector = (state: RootState) =>
  state.user.isAuthChecked;

// constructor
export const getConstructorDataSelector = (state: RootState) =>
  state.constructorData;

// order
export const getOrderIsLoadingSelector = (state: RootState) =>
  state.order.loading;
export const getOrderOrdersSelector = (state: RootState) => state.order.orders;
export const getOrderRequestSelector = (state: RootState) =>
  state.order.orderRequest;
export const getOrderModalDataSelector = (state: RootState) =>
  state.order.orderModalData;
export const getOrderByNumberSelector = (state: RootState) =>
  state.order.orderByNumber;

// ingredients
export const getIngredientsIsLoadingSelector = (state: RootState) =>
  state.ingredients.loading;
export const getIngredientsSelector = (state: RootState) =>
  state.ingredients.ingredients;
export const getIngredientsBunsSelector = createSelector(
  [getIngredientsSelector],
  (ingredients) => ingredients.filter((item) => item.type === 'bun')
);
export const getIngredientsMainsSelector = createSelector(
  [getIngredientsSelector],
  (ingredients) => ingredients.filter((item) => item.type === 'main')
);
export const getIngredientsSaucesSelector = createSelector(
  [getIngredientsSelector],
  (ingredients) => ingredients.filter((item) => item.type === 'sauce')
);

// feed
export const getFeedIsLoadingSelector = (state: RootState) =>
  state.feed.loading;
export const getFeedOrdersSelector = (state: RootState) => state.feed.orders;
export const getFeedTotalSelector = (state: RootState) => state.feed.total;
export const getFeedTotalTodaySelector = (state: RootState) =>
  state.feed.totalToday;
