import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { Ingredient } from '../ingredient/ingredient';
import { getIngredientsState } from '../../services/ingredients/slice';
import { useAppSelector } from '../../hooks/hooks';

export const BurgerIngredients = () => {

    const { ingredients } = useAppSelector(getIngredientsState);

    const [ scrollPosition, setScrollPosition ] = React.useState<number>(0);

    const bunTab = 'buns';
    const mainTab = 'main';
    const sauceTab = 'sauce';

    const [activeTab, setActiveTab] = React.useState<string>(bunTab);

    React.useEffect(() => {
        const scrollWrapper = document.querySelector('.custom-scroll');
        (scrollWrapper as Element).addEventListener('scroll', handleScroll, { passive: true });
    
        return () => {
            (scrollWrapper as Element).removeEventListener('scroll', handleScroll);
        };
    }, [scrollPosition]);
    
    const handleScroll = () => {
        // Создание объекта типа 'вкладка': 'расстояние до верха'
        const tabsDistance: {[name: string]: number} = {
            [bunTab]: getDistance(`.${bunTab}`),
            [sauceTab]: getDistance(`.${sauceTab}`),
            [mainTab]: getDistance(`.${mainTab}`),
        };

        // Сортировка
        const sortedTabs = Object.keys(tabsDistance).sort((a, b) => {
            return tabsDistance[a] - tabsDistance[b];
        });
        setActiveTab(sortedTabs[0]);
    };

    const getDistance = (className: string) => {
        // Модуль расстояния от блока до вкладок
        return Math.abs((document.querySelector(className) as Element).getBoundingClientRect().top - 281);
    };

    return(
        <>
            <div className={`mb-10 ${styles.tabs}`}>
                <Tab value='one' active={activeTab === bunTab} onClick={setActiveTab}>
                    Булки
                </Tab>
                <Tab value='two' active={activeTab === sauceTab} onClick={setActiveTab}>
                    Соусы
                </Tab>
                <Tab value='three' active={activeTab === mainTab} onClick={setActiveTab}>
                    Начинки
                </Tab>
            </div>
            <div className={`custom-scroll ${styles.wrapper}`}>
                <div className={`mb-10 ${bunTab}`}>
                    <p className='text text_type_main-medium mb-6'>Булки</p>
                    <ul className={styles.ul}>
                        {
                        ingredients.filter(ingredient => ingredient.type === 'bun').map((ingredient) => (
                            <li className={styles.li} key={ingredient._id}>
                                <Ingredient ingredient={ingredient} />
                            </li>
                        ))
                        }
                    </ul>
                </div>
                <div className={`mb-10 ${sauceTab}`}>
                    <p className='text text_type_main-medium mb-6'>Соусы</p>
                    <ul className={styles.ul}>
                        {
                        ingredients.filter(ingredient => ingredient.type === 'sauce').map((ingredient) => (
                            <li className={`mr-1 mb-8 ${styles.li}`} key={ingredient._id}>
                                <Ingredient ingredient={ingredient} />
                            </li>
                        ))
                        }
                    </ul>
                </div>
                <div className={`mb-10 ${mainTab}`}>
                    <p className='text text_type_main-medium mb-6'>Начинки</p>
                    <ul className={styles.ul}>
                        {
                        ingredients.filter(ingredient => ingredient.type === 'main').map((ingredient) => (
                            <li className={`mr-1 mb-8 ${styles.li}`} key={ingredient._id}>
                                <Ingredient ingredient={ingredient} />
                            </li>
                        ))
                        }
                    </ul>
                </div>
            </div>
        </>
    );
};