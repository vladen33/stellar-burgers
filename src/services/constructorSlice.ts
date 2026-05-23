import { TConstructorIngredient } from '@utils-types';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

type TConstructorState = {
  bunUp: TConstructorIngredient | null;
  ingredients: Array<TConstructorIngredient>;
  bunDown: TConstructorIngredient | null;
};

const initialState: TConstructorState = {
  bunUp: null,
  ingredients: [],
  bunDown: null
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bunUp = state.bunDown = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TConstructorIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },

    deleteIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveUpIngredient: (state, action) => {},
    moveDownIngredient: (state, action) => {}
  }
});

export const constructorReducer = constructorSlice.reducer;
export const {
  addIngredient,
  deleteIngredient,
  moveUpIngredient,
  moveDownIngredient
} = constructorSlice.actions;
