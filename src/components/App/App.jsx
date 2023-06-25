import styles from "./App.module.css";
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <section className="mr-10 mt-10 mb-10">
            <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
            <BurgerIngredients />
          </section>
          <section className="mt-25 mb-10">
            <BurgerConstructor />
          </section>
        </DndProvider>
      </main>
    </div>
  );
}

export default App;