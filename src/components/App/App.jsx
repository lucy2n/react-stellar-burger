import styles from "./App.module.css";
import React from "react";
import { api } from "../../utils/constants";
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App() {

  const [ingredients, setIngridients] = React.useState([])

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
        <section className="mr-10 mt-10 mb-10">
          <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
          <BurgerIngredients ingredients={ingredients} />
        </section>
        <section className="mt-25 mb-10">
          <BurgerConstructor ingredients={ingredients} />
        </section>
      </main>
    </div>
  );
}

export default App;
