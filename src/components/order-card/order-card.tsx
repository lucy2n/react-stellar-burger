import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-card.module.css';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { RoutePathname } from '../../utils/constants';
import { getStatus } from '../../utils/utils';
import { getIngredientsState } from '../../services/ingredients/slice';
import { TIngedient } from '../../types/ingredient';
import { useAppSelector } from '../../hooks/hooks';
import { TOrder } from '../../types/order';

export const OrderCard = ({ order }: {order: TOrder}) => {
    const [price, setPrice] = useState(0);
    const location = useLocation();

    const { ingredients } = useAppSelector(getIngredientsState);
    const [orderIngredients, setOrderIngredients] = useState<Array<TIngedient>>([]);

    useEffect(() => {
        if (ingredients.length !== 0) {
            const currentOrderIngredients = order.ingredients.map((id) => ingredients.find(ingredient => ingredient._id === id) );
            setOrderIngredients(currentOrderIngredients as Array<TIngedient>);
        }
    }, [ingredients]);

    useEffect(() => {
        let totalPrice = 0;
        orderIngredients.map(ingredient => (totalPrice += ingredient.price));
        setPrice(totalPrice);
    }, [orderIngredients]);

    return (
        <div className={`mb-4 mr-2 ${location.pathname === RoutePathname.feedPage ? styles.main_place_feed : styles.main}`}>
            <div className={`mt-6 mb-6 ${location.pathname === RoutePathname.feedPage ? styles.content_place_feed : styles.content}`}>
                <div className={`mb-6 ${styles.info}`}>
                    <p className='text text_type_digits-default'>{`#${order.number}`}</p>
                    <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(order.createdAt)} />
                </div>
                <p className={`text text_type_main-medium mb-2 ${location.pathname === RoutePathname.feedPage ? 'mb-6' : ''}`}>{ order.name }</p>
                { location.pathname !== RoutePathname.feedPage &&
                    <p className={`text text_type_main-small mb-6 ${order.status === 'done' ? styles.done: ''}`}>{getStatus(order.status)}</p>
                }
                <div className={styles.info}>
                    <div className={styles.images}>
                        {
                        [...new Set(orderIngredients)].slice(0, 6).map((ingredient, index) =>
                            <div style={{position: 'relative'}} key={ `${ingredient._id}${index}` } >
                                { index === 5 &&
                                    <p className={`text text_type_main-default ${styles.count}`}> +{ingredients.length - 6} </p>
                                }
                                <img 
                                key={ `${ingredient._id}${index}` }
                                className={`${styles.image} ${index === 5 && ingredients.length > 5 ? styles.darkened : '' }`}
                                src={ingredient.image_mobile} 
                                style={{
                                    left: `-${16 * index}px`,
                                    zIndex: `${6 - index}`,
                                }}/>
                            </div>
                        )}
                    </div>
                    <div className={`mt-6 ${styles.sum}`}>
                        <p className='text text_type_digits-default mr-2'>{ price }</p>
                        <CurrencyIcon type='primary' />
                    </div>
                </div>
            </div>
        </div>
    );
};