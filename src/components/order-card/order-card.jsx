import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-card.module.css';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import { RoutePathname } from '../../utils/constants';
import { getStatus } from '../../utils/utils';

export const OrderCard = ({ order, allIngredients }) => {
    const [price, setPrice] = useState(0);
    const location = useLocation();

    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        if (allIngredients.length !== 0) {
            const orderIngredients = order.ingredients.map((id) => {
                return allIngredients.find(ingredient => ingredient._id === id);
            });
            setIngredients(orderIngredients);
        }
    }, [allIngredients]);

    useEffect(() => {
        let totalPrice = 0;
        ingredients.map(ingredient => (totalPrice += ingredient.price));
        setPrice(totalPrice);
    }, [ingredients]);

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
                        [...new Set(ingredients)].slice(0, 6).map((ingredient, index) =>
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
                        <CurrencyIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};

OrderCard.propTypes = {
    order: PropTypes.object.isRequired,
    allIngredients: PropTypes.array.isRequired
};