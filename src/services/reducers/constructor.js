import { 
    ADD_INGREDIENT 
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
                    bun: state.bun,
                    ingredients: [...state.ingredients, action.ingredient],
                    price: state.price + action.ingredient.price
                }
            }
      default:
        return state
    }
  }