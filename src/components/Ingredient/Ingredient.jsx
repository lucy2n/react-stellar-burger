import React, { useState } from 'react';
import { CurrencyIcon,  } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../utils/data';
import ingredientStyle from './ingredient.module.css'

function Ingredient({data}) {

    const [count, setCount ]= React.useState(0);

    function onClick () {
        setCount(count + 1)
    }

    return(
        <div className={ingredientStyle.main} onClick={onClick}>
            {count > 0 &&
            <p className={`text text_type_digits-default ${ingredientStyle.icon}`}>{count}</p>
            }
            <img className="mr-4 ml-4" src={data.image}/>
            <div className={`mt-1 mb-1 ${ingredientStyle.price}`}>
                <p className="text text_type_digits-default">{data.price}</p>
                <CurrencyIcon />
            </div>
            <p className={`text text_type_main-default ${ingredientStyle.center}`}>{data.name}</p>
        </div>
    )
}

export default Ingredient

