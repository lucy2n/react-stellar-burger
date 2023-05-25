import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyle from './Ingredient.module.css'
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { ingredientPropType } from '../../utils/prop-types';
import Modal from '../Modal/Modal';

function Ingredient({ ingredient }) {

    const [count, setCount] = React.useState(0);
    const [isVisible, setVisibility] = React.useState(false);

    function plus() {
        setCount(count + 1)
    }

    function openModal() {
        setVisibility(true)
    }

    return(
        <>
            <div className={ingredientStyle.main} onClick={ openModal }>
                {count > 0 &&
                    <Counter count={count} size="default" extraClass="m-1" />
                }
                <img className="mr-4 ml-4" src={ingredient.image}/>
                <div className={`mt-1 mb-1 ${ingredientStyle.price}`}>
                    <p className="mr-2 text text_type_digits-default">{ingredient.price}</p>
                    <CurrencyIcon />
                </div>
                <p className={`text text_type_main-default ${ingredientStyle.center}`}>{ingredient.name}</p>
            </div>
            { isVisible &&
                <Modal 
                setVisibility={ setVisibility }
                > 
                    <IngredientDetails ingredient={ingredient}/>
                </Modal> 
            }
        </>
    )
}

Ingredient.propTypes = {
    ingredient: ingredientPropType.isRequired
}

export default Ingredient

