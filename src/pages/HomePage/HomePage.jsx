import styles from "./HomePage.module.css";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


export const HomePage = () => {
    return (
        <div className={styles.home}>
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