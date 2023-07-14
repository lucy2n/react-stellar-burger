import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css'
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../services/actions/order';
import { ORDER_MODAL } from '../../services/actions/modal';
import { useDrop } from "react-dnd";
import { addIngredient, swapIngedients } from '../../services/actions/constructor';
import { ItemTypes } from '../../utils/ItemTypes';
import { ConstructorIngredient } from '../ConstructorIngredient/ConstructorIngredient';
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getModalState } from '../../services/reducers/modal';
import { getConstructorState } from '../../services/reducers/constructor';

function BurgerConstructor() {
    const dispatch = useDispatch();
    
    const { ingredients, bun } = useSelector(getConstructorState)
    const { modalType } = useSelector(getModalState)

    const [price, setPrice] = useState(0);

    useEffect(() => {
        let totalPrice = 0;
        ingredients.map(ingredient => (totalPrice += ingredient.price))
        if (bun) {
            totalPrice += (bun.price * 2)
        }
        setPrice(totalPrice);
    }, [ingredients, bun])

    async function createOrder() {
        // Создание массива id ингредиентов для оформления заказа
        const ingredientsId = ingredients.map(ingredient => ingredient._id)
        if ( bun ) {
            ingredientsId.push(bun._id)
        }

        if (ingredientsId.length > 0) {
            // Отправка запроса
            dispatch(getOrder(ingredientsId))
        }
    }

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        dispatch(swapIngedients(dragIndex, hoverIndex))
      }, [])

    const [, dropTarget] = useDrop({
        accept: ItemTypes.INGREDIENT,
        drop(ingredient) {
            dispatch(addIngredient(ingredient))
        },
    });

    return (
        <div ref={dropTarget}>
            <ul className={`ml-4 mr-4 ${styles.main}`}>
                { bun &&
                <li className={styles.li}>
                    <ConstructorElement
                    extraClass={`mb-4 mr-8 ml-8 ml-6 ${styles.element}`}
                    text={`${bun.name} (верх)`}
                    type='top'
                    isLocked={true}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                    />
                </li>
                }
                <div className={`custom-scroll ${styles.wrapper}`}>
                    {
                        ingredients.map((ingredient, index) => 
                        <ConstructorIngredient 
                        key={uuidv4()}
                        ingredient={ingredient}
                        index={index}
                        moveCard={moveCard}
                        />
                        )
                    }
                </div>
                { bun &&
                <li className={styles.li} >
                    <ConstructorElement
                    extraClass={`mt-4 mr-8 ml-8 mb-10 ${styles.element}`}
                    text={`${bun.name} (низ)`}
                    type='bottom'
                    isLocked={true}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                    />
                </li>
                }
            </ul>
            <div className={styles.sum}>
                <div className= {`mr-10 ${styles.price}`}>
                    <p className='text text_type_digits-medium mr-4'>{price}</p>
                    <CurrencyIcon />
                </div>
                <Button extraClass='mr-4' htmlType="button" type="primary" size="medium" onClick={createOrder}>
                    Оформить заказ
                </Button>
            </div>
            { modalType === ORDER_MODAL &&
                <Modal>
                    <OrderDetails />
                </Modal>
            }  
        </div>
    )
}

export default BurgerConstructor;