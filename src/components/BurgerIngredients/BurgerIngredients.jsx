import React, { useState } from 'react';
import { Counter, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './burgerIngredients.module.css'
import Ingredient from '../Ingredient/Ingredient';
import { data } from '../../utils/data';

function BurgerIngredients() {
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
                        <li className={`mr-6 ${ingredientsStyles.li}`}>
                            <Ingredient data={data[0]}></Ingredient>
                        </li>
                        <li className={ingredientsStyles.li}>
                            <Ingredient data={data[1]}></Ingredient>
                        </li>
                    </ul>
                </div>
                <div className='mb-10'>
                    <p className="text text_type_main-medium mb-6">Соусы</p>
                    <ul className={ingredientsStyles.ul}>
                        <li className={`mr-6 mb-8 ${ingredientsStyles.li}`}>
                            <Ingredient data={data[3]}></Ingredient>
                        </li>
                        <li className={` mb-8 ${ingredientsStyles.li}`}>
                            <Ingredient data={data[6]}></Ingredient>
                        </li>
                        <li className={`mr-6 mb-8 ${ingredientsStyles.li}`}>
                            <Ingredient data={data[5]}></Ingredient>
                        </li>
                        <li className={` mb-8 ${ingredientsStyles.li}`}>
                            <Ingredient data={data[9]}></Ingredient>
                        </li>
                    </ul>
                </div>
                <div className='mb-10'>
                    <p className="text text_type_main-medium mb-6">Начинки</p>
                    <ul className={ingredientsStyles.ul}>
                        <li className={`mr-6 mb-8 ${ingredientsStyles.li}`}>
                            <Ingredient data={data[4]}></Ingredient>
                        </li>
                        <li className={` mb-8 ${ingredientsStyles.li}`}>
                            <Ingredient data={data[7]}></Ingredient>
                        </li>
                        <li className={`mr-6 mb-8 ${ingredientsStyles.li}`}>
                            <Ingredient data={data[8]}></Ingredient>
                        </li>
                        <li className={`mb-8 ${ingredientsStyles.li}`}>
                            <Ingredient data={data[10]}></Ingredient>
                        </li>
                        <li className={`mr-6 mb-8 ${ingredientsStyles.li}`}>
                            <Ingredient data={data[11]}></Ingredient>
                        </li>
                        <li className={`mb-8 ${ingredientsStyles.li}`}>
                            <Ingredient data={data[12]}></Ingredient>
                        </li>
                        <li className={`mr-6 mb-8 ${ingredientsStyles.li}`}>
                            <Ingredient data={data[13]}></Ingredient>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default BurgerIngredients;