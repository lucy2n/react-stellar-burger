import { 
    ADD_INGREDIENT, 
    DELETE_INGREDIENT, 
    SWAP_INGREDIENT
} from "../actions/constructor"

const constructorInitialState = {
    ingredients: [],
    bun: null,
    price: 0
}

export const constructorReducer = (state = constructorInitialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            // Цена выбранной булочки
            const bunPrice = state.bun !== null ? state.bun.price: 0
    
            if (action.ingredient.type === "bun") {
                return {
                    bun: action.ingredient,
                    ingredients: state.ingredients,
                    price: state.price + (action.ingredient.price * 2) - (bunPrice * 2)
                }
            } else {
                return {
                    ...state,
                    ingredients: [...state.ingredients, action.ingredient],
                    price: state.price + action.ingredient.price
                }
            }
        case DELETE_INGREDIENT:
            const arr = state.ingredients
            const index = arr.indexOf(action.ingredient);
            if (index > -1) {
              arr.splice(index, 1);
            }
            return {
                ...state,
                ingredients: [...arr],
                price: state.price - action.ingredient.price
            }
        case SWAP_INGREDIENT:
            const ingredients = [...state.ingredients];
            ingredients.splice(action.toIndex, 0, ingredients.splice(action.fromIndex, 1)[0]);
            return {
                ...state,
                ingredients: [...ingredients],
            }
        default:
            return state
    }
  }