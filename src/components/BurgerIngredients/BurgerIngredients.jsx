import React from 'react';
import { Counter, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './burgerIngredients.module.css'
import Ingredient from '../Ingredient/Ingredient';

function BurgerIngredients({ ingredients }) {
    const [current, setCurrent] = React.useState('Булки')

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
                             ingredients.map((ingredient) => ( ingredient.type === "bun" &&
                                <li className={`mr-1 ${ingredientsStyles.li}`} key={ingredient._id}>
                                    <Ingredient ingredient={ingredient}></Ingredient>
                                </li>
                             ))
                        }
                    </ul>
                </div>
                <div className='mb-10'>
                    <p className="text text_type_main-medium mb-6">Соусы</p>
                    <ul className={ingredientsStyles.ul}>
                    {
                        ingredients.map((ingredient) => ( ingredient.type === "sauce" &&
                        <li className={`mr-1 mb-8 ${ingredientsStyles.li}`} key={ingredient._id}>
                            <Ingredient ingredient={ingredient}></Ingredient>
                        </li>
                        ))
                    }
                    </ul>
                </div>
                <div className='mb-10'>
                    <p className="text text_type_main-medium mb-6">Начинки</p>
                    <ul className={ingredientsStyles.ul}>
                    {
                        ingredients.map((ingredient) => ( ingredient.type === "main" &&
                        <li className={`mr-1 mb-8 ${ingredientsStyles.li}`} key={ingredient._id}>
                            <Ingredient ingredient={ingredient}></Ingredient>
                        </li>
                        ))
                    }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default BurgerIngredients;