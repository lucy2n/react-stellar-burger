import styles from "./app.module.css";
import React from "react";
import { api } from "../../utils/constants";
import AppHeader from '../appHeader/AppHeader';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../modal/Modal";

function App() {

  const [ingredients, setIngridients] = React.useState([])

  React.useEffect(() => {
    const getIngredients = async () => {
      const res = await fetch(api);
      const data = await res.json();
      setIngridients(data.data);
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
      <Modal/>
    </div>
  );
}

export default App;
