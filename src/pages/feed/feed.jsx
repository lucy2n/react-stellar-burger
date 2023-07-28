import { OrderCard } from '../../components/order-card/order-card';
import { getIngredients } from '../../utils/api';
import { testOrders } from '../../utils/constants'; // временное решениеs
import styles from './feed.module.css';
import React, { useEffect, useState } from 'react';

export const FeedPage = () => {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        getIngredients()
        .then(res => setIngredients(res.data));
    }, []);

    return (
        <div className={styles.feed}> 
            <main className={styles.main}>
                <section className='mr-10 mt-10 mb-10 mr-15'>
                    <h1 className='mb-5 text text_type_main-large'>Лента заказов</h1>
                    <div className={`custom-scroll ${styles.wrapper}`}>
                        {  testOrders.orders.map((order) => <OrderCard order={order} key={order._id} allIngredients={ingredients}/> ) }
                    </div>
                </section>  
                <section className={`mt-25 ${styles.info}`}>
                    <div className={`mb-15 ${styles.progress}`}>
                        <div className={`mr-9 ${styles.status}`}>
                            <p className="text text_type_main-medium mb-6">Готовы:</p>
                            <p className={`text text_type_digits-default ${styles.done}`}>034533</p>
                            <p className={`text text_type_digits-default ${styles.done}`}>034533</p>
                            <p className={`text text_type_digits-default ${styles.done}`}>034533</p>
                            <p className={`text text_type_digits-default ${styles.done}`}>034533</p>
                        </div>
                        <div className={styles.status}>
                            <p className="text text_type_main-medium mb-6">В работе:</p>
                            <p className="text text_type_digits-default">034538</p>
                            <p className="text text_type_digits-default">034538</p>
                            <p className="text text_type_digits-default">034538</p>
                        </div>
                    </div>
                    <div className='mb-15'>
                        <p className="text text_type_main-medium">Выполнено за все время:</p>
                        <p className={`text text_type_digits-large ${styles.number}`}>28 752</p>
                    </div>
                    <div>
                        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                        <p className={`text text_type_digits-large ${styles.number}`}>138</p>
                    </div>
                </section>
            </main>
        </div>
    );
};