import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './BurgerIngredients.module.css'
import Ingredient from '../Ingredient/Ingredient';
import { useModal } from '../../hooks/useModal';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { ADD_INGREDIENT } from '../../services/actions/constructor';

function BurgerIngredients() {
    const { ingredients, ingredientsRequest, ingredientsFailed }  = useSelector(state => state.ingredients)

    const dispatch = useDispatch();
  
    React.useEffect(() => {
      dispatch(getIngredients());
    }, [])

    const [current, setCurrent] = React.useState('Булки');
    const { isModalOpen, openModal, closeModal } = useModal();

    function openIngredientDetails(ingredient) {
       // openModal();
       dispatch({
        type: ADD_INGREDIENT,
        ingredient: ingredient
       })
    }

    return(
        <div>
            <div className={`mb-10 ${ingredientsStyles.tabs}`}>
                <Tab value="one" active={current === 'Булки'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'Соусы'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'Начинки'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={`custom-scroll ${ingredientsStyles.wrapper}`}>
                <div className='mb-10'>
                    <p className="text text_type_main-medium mb-6">Булки</p>
                    <ul className={ingredientsStyles.ul}>
                    {
                         ingredients.filter(ingredient => ingredient.type === "bun").map((ingredient) => (
                            <li className={ingredientsStyles.li} key={ingredient._id}>
                                <Ingredient
                                ingredient={ingredient}
                                openIngredientDetails={openIngredientDetails}
                                />
                            </li>
                         ))
                    }
                    </ul>
                </div>
                <div className='mb-10'>
                    <p className="text text_type_main-medium mb-6">Соусы</p>
                    <ul className={ingredientsStyles.ul}>
                    {
                        ingredients.filter(ingredient => ingredient.type === "sauce").map((ingredient) => (
                        <li className={`mr-1 mb-8 ${ingredientsStyles.li}`} key={ingredient._id}>
                            <Ingredient 
                            ingredient={ingredient} 
                            openIngredientDetails={openIngredientDetails}
                            />
                        </li>
                        ))
                    }
                    </ul>
                </div>
                <div className='mb-10'>
                    <p className="text text_type_main-medium mb-6">Начинки</p>
                    <ul className={ingredientsStyles.ul}>
                    {
                        ingredients.filter(ingredient => ingredient.type === "main").map((ingredient) => (
                        <li className={`mr-1 mb-8 ${ingredientsStyles.li}`} key={ingredient._id}>
                            <Ingredient 
                            ingredient={ingredient} 
                            openIngredientDetails={openIngredientDetails}
                            />
                        </li>
                        ))
                    }
                    </ul>
                </div>
            </div>
            { isModalOpen && 
                <Modal 
                closeModal={closeModal}
                > 
                    <IngredientDetails />
                </Modal> 
            }
        </div>
    )
}

export default BurgerIngredients;