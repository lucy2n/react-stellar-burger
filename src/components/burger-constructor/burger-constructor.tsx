import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { OrderDetails } from '../order-details/order-details';
import { Modal } from '../modal/modal';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getOrder } from '../../services/order/action';
import { ORDER_MODAL } from '../../services/modal/action';
import { useDrop } from 'react-dnd';
import { addIngredient, swapIngedients } from '../../services/constructor/action';
import { ItemTypes } from '../../utils/ItemTypes';
import { ConstructorIngredient } from '../constructor-ingredient/constructor-ingredient';
import React, { useCallback, useEffect, useState, CSSProperties } from 'react';
import { getModalState } from '../../services/modal/reducer';
import { getConstructorState } from '../../services/constructor/reducer';
import { PacmanLoader } from 'react-spinners';
import { getUserState } from '../../services/user/reducer';
import { useNavigate } from 'react-router';
import { RoutePathname } from '../../utils/constants';
import type { TIngedient } from '../../types/ingredient';

const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
  };

export const BurgerConstructor = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const { ingredients, bun } = useAppSelector(getConstructorState);
    const { modalType } = useAppSelector(getModalState);

    const [price, setPrice] = useState(0);

    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState('#4C4CFF');

    const { user } = useAppSelector(getUserState);

    useEffect(() => {
        let totalPrice = 0;
        ingredients.map(ingredient => (totalPrice += ingredient.price));
        if (bun) {
            totalPrice += (bun.price * 2);
        }
        setPrice(totalPrice);
    }, [ingredients, bun]);

    useEffect(() => {
        setLoading(false);// скрываем анимацию при появлении модала
    }, [modalType]);

    async function createOrder() {
        if ( price == 0 ) {
            return;
        }
        if (!user) {
            navigate(RoutePathname.loginPage);
        } else {
            setLoading(true);
            // Создание массива id ингредиентов для оформления заказа
            const ingredientsId = ingredients.map(ingredient => ingredient._id);
            if ( bun ) {
                ingredientsId.push(bun._id);
            }

            if (ingredientsId.length > 0) {
                // Отправка запроса
                dispatch(getOrder(ingredientsId));
            }
        }
    }

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        dispatch(swapIngedients({ fromIndex: dragIndex, toIndex: hoverIndex}));
      }, []);

    const [, dropTarget] = useDrop({
        accept: ItemTypes.INGREDIENT,
        drop: (ingredient: TIngedient) => {
            dispatch(addIngredient(ingredient));
        },
    });

    return (
        <div className={styles.content} ref={dropTarget}>
            <div className={styles.loader}>
                <PacmanLoader
                    cssOverride={override}
                    color={color}
                    loading={loading}
                    size={40}
                    aria-label='Loading Spinner'
                    data-testid='loader'
                    />
            </div>
            <ul className={`ml-4 mr-4 ${styles.main} ${loading ? styles.main_blured: ''}`}>
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
                        key={ingredient.uniqueId}
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
                    <CurrencyIcon type='primary' />
                </div>
                <Button extraClass='mr-4' htmlType='button' type='primary' size='medium' onClick={createOrder} >
                    Оформить заказ
                </Button>
            </div>
            { modalType === ORDER_MODAL &&
                <Modal onClose={() => {
                    // Временное решение, чтобы не ругался компилятор
                }}>
                    <OrderDetails />
                </Modal>
            }  
        </div>
    );
};