import React from 'react';
import { ConstructorElement, CurrencyIcon, LockIcon, DragIcon, DeleteIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from './burgerConstructor.module.css'

function BurgerConstructor({ingredients}) {   

    const bun = ingredients.find(ingredient => ingredient.type === "bun")

    return(
        <div>
            <ul className={`ml-4${burgerConstructor.main}`}>
                { bun &&
                    <li className={burgerConstructor.li}>
                        <ConstructorElement 
                        extraClass={`mt-5 mb-4 mr-4 ml-8 ${burgerConstructor.element}`}
                        text={bun.name}
                        type='top'
                        isLocked={true}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                        />
                    </li>
                }   
                    
                <div className={`custom-scroll ${burgerConstructor.wrapper}`}>
                    {
                        ingredients.map((ingredient) => ( ingredient.type != "bun" &&
                            <li className={burgerConstructor.li} key={ingredient._id}>
                                <DragIcon />
                                <ConstructorElement 
                                extraClass={`mb-4 mr-4 ml-2 ${burgerConstructor.element}`}
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image_mobile}
                                />
                            </li>
                        ))
                    }
                </div>
                { bun &&
                    <li className={burgerConstructor.li} >
                        <ConstructorElement 
                        extraClass={`mt-4 mr-4 ml-8 mb-5 ${burgerConstructor.element}`}
                        text={bun.name}
                        type='bottom'
                        isLocked={true}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                        />
                    </li>
                }
            </ul>
            <div className={burgerConstructor.sum}>
                <div className= {burgerConstructor.price}>
                    <p className='text text_type_digits-medium'>610</p>
                    <CurrencyIcon />
                </div>
                <Button htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
}

export default BurgerConstructor;