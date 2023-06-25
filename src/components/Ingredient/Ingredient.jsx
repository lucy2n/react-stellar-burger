import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyle from './Ingredient.module.css'
import { ingredientPropType } from '../../utils/prop-types';
import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';

function Ingredient({ ingredient, openIngredientDetails }) {

    const { ingredients, bun } = useSelector(state => state.burgerConstructor)

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
        <>
            <div 
            ref={dragRef}
            className={ingredientStyle.main} 
            onClick={clickIngredient}>
                { count > 0 &&
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