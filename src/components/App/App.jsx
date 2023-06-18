import styles from "./App.module.css";
import React from "react";
import { api } from "../../utils/constants";
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { IngredientsContext, ConstructorContext } from "../../services/IngredientsContext";

function App() {

  const [ingredients, setIngridients] = React.useState([])
  const constructorInitialState = { bun: null, ingredients: [], price: 0 }

  function reducer(state, action) {
    switch (action.type) {
      case "add" : 
        const totalPrice = state.price + action.ingredient.price;
        const bunPrice = state.bun !== null ? state.bun.price: 0
        if (action.ingredient.type === "bun") {
          return { 
            bun: action.ingredient, 
            ingredients: state.ingredients, 
            price: totalPrice - bunPrice
          }
        } else {
          return { 
            bun: state.bun, 
            ingredients: [...state.ingredients, action.ingredient],  
            price: totalPrice
          }
        }
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const [constructorState, constructorDispatcher] = React.useReducer(reducer, constructorInitialState, undefined);

  React.useEffect(() => {
    const getIngredients = async () => {
      try {
        const res = await fetch(api);
        if (!res.ok) {
          throw new Error("Некорректный результат");
        }
        const data = await res.json();
        setIngridients(data.data);
      } catch (err) {
        console.log("Возникла ошибка :", err)
      }
    }
    getIngredients();
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <IngredientsContext.Provider value={{ ingredients }}>
          <ConstructorContext.Provider value={{ constructorState, constructorDispatcher }}>
            <section className="mr-10 mt-10 mb-10">
              <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
                <BurgerIngredients />
            </section>
            <section className="mt-25 mb-10">
                <BurgerConstructor />
            </section>
          </ConstructorContext.Provider>
        </IngredientsContext.Provider>
      </main>
    </div>
  );
}

export default App;
