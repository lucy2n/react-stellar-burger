import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { getIngredients } from '../../utils/api';
import styles from './order-card.module.css';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import { RoutePathname } from '../../utils/constants';

export const OrderCard = ({ order, allIngredients }) => {
    const location = useLocation();

    const today = new Date();
    const yesterday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1,
        today.getHours(),
        today.getMinutes() - 1,
        0,
    );

    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        if (allIngredients.length !== 0) {
            const orderIngredients = order.ingredients.map((id) => {
                return allIngredients.find(ingredient => ingredient._id === id);
            });
            setIngredients(orderIngredients);
        }
    }, [allIngredients]);

    return (
        <div className={`mb-4 mr-2 ${location.pathname === RoutePathname.feedPage ? styles.main_place_feed : styles.main}`}>
            <div className={`mt-6 mb-6 ${location.pathname === RoutePathname.feedPage ? styles.content_place_feed : styles.content}`}>
                <div className={`mb-6 ${styles.info}`}>
                    <p className='text text_type_digits-default'>{`#${order.number}`}</p>
                    <FormattedDate className='text text_type_main-default text_color_inactive' date={yesterday} />
                </div>
                <p className={`text text_type_main-medium mb-2 ${location.pathname === RoutePathname.feedPage ? 'mb-6' : ''}`}>Death Star Starship Main бургер</p>
                { location.pathname !== RoutePathname.feedPage &&
                    <p className='text text_type_main-small mb-6'>{order.status}</p>
                }
                <div className={` ${styles.info}`}>
                    <div className={styles.images}>
                        {
                        ingredients.slice(0, 6).map((ingredient, index) =>
                            <img 
                            key={ingredient._id}
                            className={styles.image} 
                            src={ingredient.image_mobile} 
                            style={{
                                left: `-${16 * index}px`,
                                zIndex: `${6 - index}`
                            }}/>
                        )}
                    </div>
                    <div className={`mt-6 ${styles.sum}`}>
                        <p className='text text_type_digits-default mr-2'>480</p>
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