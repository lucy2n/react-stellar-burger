import React from 'react';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from './BurgerConstructor.module.css'
import OrderDetails from '../OrderDetails/OrderDetails';
import PropTypes from "prop-types";
import { ingredientPropType } from '../../utils/prop-types';
import Modal from '../Modal/Modal';
import { useModal } from '../../hooks/useModal';
import { ConstructorContext } from '../../services/IngredientsContext';
import { v4 as uuidv4 } from 'uuid';
import { orderApi } from '../../utils/constants';
import { OrderContext } from '../../services/OrderContext';

function BurgerConstructor() {

    const { constructorState } = React.useContext(ConstructorContext);

    const { isModalOpen, openModal, closeModal } = useModal();
    const [ orderNumber, setOrderNumber ] = React.useState(0);

    async function createOrder() {
        // Создание массива id ингредиентов для оформления заказа
        let ingredientsId = constructorState.ingredients.map((ingredient) => {
            return ingredient._id
        })
        if (constructorState.bun) {
            ingredientsId.push(constructorState.bun._id)
        }

        if (ingredientsId.length > 0) {
            // Отправка запроса
            try {
                // Настройки для POST запроса
                const settings = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "ingredients": ingredientsId })
                };

                const res = await fetch(orderApi, settings)
                if (!res.ok) {
                    throw new Error("Некорректный результат");
                }
                const data = await res.json();
                setOrderNumber(data.order.number)
                // Открытие модального окна после формирования заказа 
                openModal();
            } catch (err) {
                console.log("Post error: ", err)
            }
        }
    }

    return (
        <>
            <ul className={`ml-4 mr-4 ${burgerConstructor.main}`}>
                { constructorState.bun &&
                <li className={burgerConstructor.li}>
                    <ConstructorElement
                    extraClass={`mb-4 mr-8 ml-8 ml-6 ${burgerConstructor.element}`}
                    text={`${constructorState.bun.name} (верх)`}
                    type='top'
                    isLocked={true}
                    price={constructorState.bun.price}
                    thumbnail={constructorState.bun.image_mobile}
                    />
                </li>
                }
                <div className={`custom-scroll ${burgerConstructor.wrapper}`}>
                    {
                        constructorState.ingredients.map((ingredient) => (
                            <li className={`mb-4 ml-4 ${burgerConstructor.li}`} key={uuidv4()}>
                                <DragIcon />
                                <ConstructorElement 
                                extraClass={burgerConstructor.element}
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image_mobile}
                                />
                            </li>
                        ))
                    }
                </div>
                { constructorState.bun &&
                <li className={burgerConstructor.li} >
                    <ConstructorElement
                    extraClass={`mt-4 mr-8 ml-8 mb-10 ${burgerConstructor.element}`}
                    text={`${constructorState.bun.name} (низ)`}
                    type='bottom'
                    isLocked={true}
                    price={constructorState.bun.price}
                    thumbnail={constructorState.bun.image_mobile}
                    />
                </li>
                }
            </ul>
            <div className={burgerConstructor.sum}>
                <div className= {`mr-10 ${burgerConstructor.price}`}>
                    <p className='text text_type_digits-medium mr-4'>{constructorState.price}</p>
                    <CurrencyIcon />
                </div>
                <Button extraClass='mr-4' htmlType="button" type="primary" size="medium" onClick={createOrder}>
                    Оформить заказ
                </Button>
            </div>
            { isModalOpen &&
                <Modal
                closeModal={closeModal}
                >
                    <OrderContext.Provider value={{ orderNumber }} >
                        <OrderDetails />
                    </OrderContext.Provider>
                </Modal>
            }  
        </>
    )
}

// BurgerConstructor.propTypes = {
//     ingredients: PropTypes.arrayOf(ingredientPropType).isRequired
// }

export default BurgerConstructor;