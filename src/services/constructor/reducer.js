import { 
    ADD_INGREDIENT, 
    DELETE_INGREDIENT, 
    SWAP_INGREDIENT
} from './action';

const constructorInitialState = {
    ingredients: [],
    bun: null
};

export const getConstructorState = (state) => state.burgerConstructor;

export const constructorReducer = (state = constructorInitialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:    
            if (action.ingredient.type === 'bun') {
                return {
                    ...state,
                    bun: action.ingredient
                };
            } else {
                return {
                    ...state,
                    ingredients: [...state.ingredients, action.ingredient],
                };
            }
        case DELETE_INGREDIENT: {
            const arr = state.ingredients;
            const index = arr.indexOf(action.ingredient);
            if (index > -1) {
              arr.splice(index, 1);
            }
            return {
                ...state,
                ingredients: [...arr],
            };
        }
        case SWAP_INGREDIENT: {
            const ingredients = [...state.ingredients];
            ingredients.splice(action.toIndex, 0, ingredients.splice(action.fromIndex, 1)[0]);
            return {
                ...state,
                ingredients: [...ingredients],
            };
        }
        default:
            return state;
    }
  };