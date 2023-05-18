import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from '../appHeader/AppHeader';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <section className="mr-10 mt-10 mb-5">
          <h1 className="text text_type_main-large">Соберите бургер</h1>
          <BurgerIngredients />
        </section>
        <section>
        </section>
      </main>
    </div>
  );
}

export default App;
