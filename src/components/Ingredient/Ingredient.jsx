import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyle from './Ingredient.module.css'
import { ingredientPropType } from '../../utils/prop-types';

function Ingredient({ ingredient, openIngredientDetails }) {

    const [count, setCount] = React.useState(0);

    function plus() {
        setCount(count + 1)
    }

    function clickIngredient() {
        openIngredientDetails(ingredient)
    }

    return(
        <>
            <div className={ingredientStyle.main} onClick={clickIngredient}>
                {count > 0 &&
                    <Counter count={count} size="default" extraClass="m-1" />
                }
                <img className="mr-4 ml-4" src={ingredient.image} alt={ingredient.name}/>
                <div className={`mt-1 mb-1 ${ingredientStyle.price}`}>
                    <p className="mr-2 text text_type_digits-default">{ingredient.price}</p>
                    <CurrencyIcon />
                </div>
                <p className={`text text_type_main-default ${ingredientStyle.center}`}>{ingredient.name}</p>
            </div>
        </>
    )
}

Ingredient.propTypes = {
    ingredient: ingredientPropType.isRequired
}

export default Ingredient

