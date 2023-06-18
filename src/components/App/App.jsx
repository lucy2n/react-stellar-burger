import styles from "./App.module.css";
import React from "react";
import { getIngredients } from "../../utils/api";
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { IngredientsContext, ConstructorContext } from "../../services/IngredientsContext";

const constructorInitialState = { bun: null, ingredients: [], price: 0 }

function reducer(state, action) {
  switch (action.type) {
    case "add" :
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
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function App() {

  const [ingredients, setIngredients] = React.useState([])
  const [constructorState, constructorDispatcher] = React.useReducer(reducer, constructorInitialState, undefined);

  React.useEffect(() => {
    const updateIngredients = async () => {
      try {
        const data = await getIngredients();
        setIngredients(data.data);
      } catch (err) {
        console.log("Возникла ошибка :", err)
      }
    }
    updateIngredients();
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <ConstructorContext.Provider value={{ constructorState, constructorDispatcher }}>
          <section className="mr-10 mt-10 mb-10">
            <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
            <IngredientsContext.Provider value={{ ingredients }}>
              <BurgerIngredients />
            </IngredientsContext.Provider>
          </section>
          <section className="mt-25 mb-10">
            <BurgerConstructor />
          </section>
        </ConstructorContext.Provider>
      </main>
    </div>
  );
}

export default App;