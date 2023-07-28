import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import React, {useState, useEffect} from 'react';
import styles from './order-info.module.css';
import { getIngredients } from '../../utils/api';

export const OrderInfo = () => {
    //не закончена 

    const today = new Date();
    const yesterday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1,
        today.getHours(),
        today.getMinutes() - 1,
        0,
    );

    return (
        <div className={styles.main}>
            <p className={`text text_type_digits-default mb-10 ${styles.center}`}>#034533</p>
            <p className="text text_type_main-medium mb-3">Black Hole Singularity острый бургер</p>
            <p className="text text_type_main-small mb-15">Выполнен</p>
            <p className="text text_type_main-medium mb-6">Состав:</p>
            <div className='mb-10'>
                <div className={styles.details}>
                    <div>
                        <img />
                        <p className="text text_type_main-small"></p>
                    </div>
                    <div className={styles.flex}>
                        <p className="text text_type_digits-default">2 x 20</p>
                        <CurrencyIcon />
                    </div>
                </div>
            </div>
            <div className={styles.details}>
                <FormattedDate className="text text_type_main-small text_color_inactive" date={yesterday}/>
                <div className={styles.flex}>
                    <p className="text text_type_digits-default">510</p>
                    <CurrencyIcon />
                </div>
            </div>
        </div>
    );
};