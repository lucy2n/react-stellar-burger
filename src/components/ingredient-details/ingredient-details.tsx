import { useLocation } from 'react-router';
import styles from './ingredient-details.module.css';
import React, { useEffect, useState } from 'react';
import { getIngredientsState } from '../../services/ingredients/slice';
import { useAppSelector } from '../../hooks/hooks';
import { TIngedient } from '../../types/ingredient';

export const IngredientDetails = () => {

    const { ingredients } = useAppSelector(getIngredientsState);

    const location = useLocation();
    let background = location.state && location.state.background;

    const [ingredient, setIngredient] = useState<TIngedient>();

    useEffect(() => {
        if (ingredients.length !== 0) {
            background = location.state && location.state.background;
            const ingredientId = location.pathname.split('/')[2]; // получаем id ингредиента из url
            const currentIngredient = ingredients.find(ingredient => ingredient._id === ingredientId); // находим по id
            if(typeof currentIngredient !== undefined) {
                setIngredient(currentIngredient);
            }
        }
    }, [location, ingredients]);

    return (
        //применяем стили в зависимости от локации
        <div className={background ? styles.modal: styles.main}>
            <h2 className={`text text_type_main-large mt-10 ml-10 ${styles.title}`}>Детали ингредиента</h2>
            <div className={`mb-15 ${styles.about}`}>
                <img className='mb-4' src={ingredient?.image_large} alt={ingredient?.name}/>
                <p className='mb-8 text text_type_main-medium'>{ingredient?.name}</p>
                <ul className={styles.ul}>
                    <li className={`mr-5 ${styles.li}`}>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Калории,ккал</p>
                        <p className='text text_type_digits-default text_color_inactive'>{ingredient?.calories}</p>
                    </li>
                    <li className={`mr-5 ${styles.li}`}>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Белки, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{ingredient?.proteins}</p>
                    </li>
                    <li className={`mr-5 ${styles.li}`}> 
                        <p className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{ingredient?.fat}</p>
                    </li>
                    <li className={styles.li}>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{ingredient?.carbohydrates}</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};