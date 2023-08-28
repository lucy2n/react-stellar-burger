import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TIngedient } from '../../types/ingredient';
import { RootState } from '../store';

export const getConstructorState = (store: RootState) => store.burgerConstructor;

type TInitialState = {
    ingredients: Array<TIngedient>;
    bun: TIngedient | null
}

const initialState = {
    ingredients: [],
    bun: null
} as TInitialState;

export const constructorSlice = createSlice({
    name: 'constructor',
    initialState,
    reducers: {
        addIngredient: {
            reducer: (state, action: PayloadAction<TIngedient>) => {
                if (action.payload.type === 'bun') {
                    state.bun = action.payload;
                } else {
                    state.ingredients = [...state.ingredients, action.payload];
                }
            },
            prepare: (ingredient: TIngedient) => {
                return { payload: { ...ingredient, uniqueId: nanoid() } };
            }
        },
        deleteIngredient(state, action: PayloadAction<TIngedient>) {
            const arr = state.ingredients;
            const index = arr.indexOf(action.payload);
            if (index > -1) {
                arr.splice(index, 1);
            } 
            state.ingredients = [...arr];
        },
        swapIngedients (state, action: PayloadAction<{toIndex: number; fromIndex: number}>) {
            const ingredients = [...state.ingredients];
            ingredients.splice(action.payload.toIndex, 0, ingredients.splice(action.payload.fromIndex, 1)[0]);
            state.ingredients = [...ingredients];
        },
        clearIngredients() {
            return initialState;
        } 
    }
});

export type TConstructorActionsCreator = typeof constructorSlice.actions;
export type TConstructorActions = ReturnType<TConstructorActionsCreator[keyof TConstructorActionsCreator]>
export const { addIngredient, deleteIngredient, swapIngedients, clearIngredients } = constructorSlice.actions;
export default constructorSlice.reducer;