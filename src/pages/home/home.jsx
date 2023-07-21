import styles from './home.module.css';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import React from 'react';

export const Home = () => {
    return (
        <div className={styles.home}>
            <main className={styles.main}>
                <DndProvider backend={HTML5Backend}>
                    <section className='mr-10 mt-10 mb-10'>
                        <h1 className='mb-5 text text_type_main-large'>Соберите бургер</h1>
                        <BurgerIngredients />
                    </section>
                    <section className='mt-25 mb-10'>
                        <BurgerConstructor />
                    </section>
                </DndProvider>
            </main>
        </div>
  );
};