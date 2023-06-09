import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './BurgerIngredients.module.css'
import Ingredient from '../Ingredient/Ingredient';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { useDispatch, useSelector } from "react-redux";
import { loadIngredients } from "../../services/actions/ingredients";
import { INGREDIENT_MODAL, openIngredientModal } from '../../services/actions/modal';
import { getIngredientsState } from '../../services/reducers/ingredients';
import { getModalState } from '../../services/reducers/modal';

function BurgerIngredients() {

    const dispatch = useDispatch();

    const { ingredients }  = useSelector(getIngredientsState)
    const { modalType } = useSelector(getModalState)

    const [ scrollPosition, setScrollPosition ] = React.useState(0);

    React.useEffect(() => {
        dispatch(loadIngredients());
    }, [])

    const bunTab = "buns";
    const mainTab = "main";
    const sauceTab = "sauce";

    const [activeTab, setActiveTab] = React.useState(bunTab);

    React.useEffect(() => {
        const scrollWrapper = document.querySelector(".custom-scroll");
        scrollWrapper.addEventListener("scroll", handleScroll, { passive: true });
    
        return () => {
            scrollWrapper.removeEventListener("scroll", handleScroll);
        };
    }, [scrollPosition]);
    
    const handleScroll = () => {
        // Создание объекта типа "вкладка": "расстояние до верха"
        const tabsDistance = {
            [bunTab]: getDistance(`.${bunTab}`),
            [sauceTab]: getDistance(`.${sauceTab}`),
            [mainTab]: getDistance(`.${mainTab}`),
        }

        // Сортировка
        const sortedTabs = Object.keys(tabsDistance).sort((a, b) => {
            return tabsDistance[a] - tabsDistance[b]
        }) 
        setActiveTab(sortedTabs[0])
    };

    const getDistance = (className) => {
        // Модуль расстояния от блока до вкладок
        return Math.abs(document.querySelector(className).getBoundingClientRect().top - 281);
    }

    return(
        <>
            <div className={`mb-10 ${ingredientsStyles.tabs}`}>
                <Tab value="one" active={activeTab === bunTab} onClick={setActiveTab}>
                    Булки
                </Tab>
                <Tab value="two" active={activeTab === sauceTab} onClick={setActiveTab}>
                    Соусы
                </Tab>
                <Tab value="three" active={activeTab === mainTab} onClick={setActiveTab}>
                    Начинки
                </Tab>
            </div>
            <div className={`custom-scroll ${ingredientsStyles.wrapper}`}>

                <div className={`mb-10 ${bunTab}`}>
                    <p className="text text_type_main-medium mb-6">Булки</p>
                    <ul className={ingredientsStyles.ul}>
                    {
                        ingredients.filter(ingredient => ingredient.type === "bun").map((ingredient) => (
                            <li className={ingredientsStyles.li} key={ingredient._id}>
                                <Ingredient
                                ingredient={ingredient}
                                openIngredientDetails={() => dispatch(openIngredientModal(ingredient))}
                                />
                            </li>
                        ))
                    }
                    </ul>
                </div>
                <div className={`mb-10 ${sauceTab}`}>
                    <p className="text text_type_main-medium mb-6">Соусы</p>
                    <ul className={ingredientsStyles.ul}>
                    {
                        ingredients.filter(ingredient => ingredient.type === "sauce").map((ingredient) => (
                        <li className={`mr-1 mb-8 ${ingredientsStyles.li}`} key={ingredient._id}>
                            <Ingredient
                            ingredient={ingredient} 
                            openIngredientDetails={() => dispatch(openIngredientModal(ingredient))}
                            />
                        </li>
                        ))
                    }
                    </ul>
                </div>
                <div className={`mb-10 ${mainTab}`}>
                    <p className="text text_type_main-medium mb-6">Начинки</p>
                    <ul className={ingredientsStyles.ul}>
                    {
                        ingredients.filter(ingredient => ingredient.type === "main").map((ingredient) => (
                        <li className={`mr-1 mb-8 ${ingredientsStyles.li}`} key={ingredient._id}>
                            <Ingredient 
                            ingredient={ingredient} 
                            openIngredientDetails={() => dispatch(openIngredientModal(ingredient))}
                            />
                        </li>
                        ))
                    }
                    </ul>
                </div>
            </div>
            { modalType === INGREDIENT_MODAL && 
                <Modal> 
                    <IngredientDetails />
                </Modal> 
            }
        </>
    )
}

export default BurgerIngredients;