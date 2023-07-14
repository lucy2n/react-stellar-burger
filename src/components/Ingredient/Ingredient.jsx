import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Ingredient.module.css'
import { ingredientPropType } from '../../utils/prop-types';
import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';
import { getConstructorState } from '../../services/reducers/constructor';
import { Link, useLocation } from 'react-router-dom';

function Ingredient({ ingredient, openIngredientDetails }) {

    const location = useLocation();
    const ingredientId = ingredient._id;

    const { ingredients, bun } = useSelector(getConstructorState)

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: ingredient,
        collect: monitor => ({
            didDrop: monitor.didDrop(),
            item: monitor.getItem()
        })
    });

    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        let ingredientCount = 0
        
        if (bun && ingredient.type === "bun" && ingredient._id === bun._id) {
            ingredientCount = 1;
        } else {
            ingredientCount = ingredients.filter(item => item._id === ingredient._id).length;
        }
        setCount(ingredientCount)
    }, [bun, ingredients])

    function clickIngredient() {
        openIngredientDetails(ingredient)
    }

    return(
        <Link
        key={ingredientId}
        to={`/ingredients/${ingredientId}`}
        state={{ background: location }}
        className={`text text_type_main-default ${styles.link}`}
        >
            <div 
            ref={dragRef}
            className={styles.main} 
            onClick={clickIngredient}>
                { count > 0 &&
                    <Counter count={count} size="default" extraClass="m-1" />
                }
                <img className="mr-4 ml-4" src={ingredient.image} alt={ingredient.name}/>
                <div className={`mt-1 mb-1 ${styles.price}`}>
                    <p className="mr-2 text text_type_digits-default">{ingredient.price}</p>
                    <CurrencyIcon />
                </div>
                <p className={`text text_type_main-default ${styles.center}`}>{ingredient.name}</p>
            </div>
        </Link>
    )
}

Ingredient.propTypes = {
    ingredient: ingredientPropType.isRequired
}

export default Ingredient