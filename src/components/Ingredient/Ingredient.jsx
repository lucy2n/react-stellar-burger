import React from 'react';
import { CurrencyIcon,  } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyle from './ingredient.module.css'

function Ingredient({ ingredient }) {

    const [count, setCount ]= React.useState(0);

    function onClick () {
        setCount(count + 1)
    }

    return(
        <div className={ingredientStyle.main} onClick={onClick}>
            {count > 0 &&
            <p className={`text text_type_digits-default ${ingredientStyle.icon}`}>{count}</p>
            }
            <img className="mr-4 ml-4" src={ingredient.image}/>
            <div className={`mt-1 mb-1 ${ingredientStyle.price}`}>
                <p className="mr-2 text text_type_digits-default">{ingredient.price}</p>
                <CurrencyIcon />
            </div>
            <p className={`text text_type_main-default ${ingredientStyle.center}`}>{ingredient.name}</p>
        </div>
    )
}

export default Ingredient

