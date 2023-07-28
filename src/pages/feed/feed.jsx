import { OrderCard } from '../../components/order-card/order-card';
import { getIngredients } from '../../utils/api';
import styles from './feed.module.css';
import React, { useEffect, useState } from 'react';
import { connect } from '../../services/feed/action';
import { useDispatch, useSelector } from 'react-redux';
import { wsApiUrl } from '../../utils/constants';

export const FeedPage = () => {
    const [ingredients, setIngredients] = useState([]);
    const dispatch = useDispatch();
    const feed = useSelector(store => store.feed);

    useEffect(() => {
        getIngredients()
        .then(res => setIngredients(res.data));
        dispatch(connect(`${wsApiUrl}/all`));
    }, []);

    useEffect(() => {
        console.log(feed.orders);
    }, [feed]);

    return (
        <div className={styles.feed}> 
            <main className={styles.main}>
                <section className='mr-10 mt-10 mb-10 mr-15'>
                    <h1 className='mb-5 text text_type_main-large'>Лента заказов</h1>
                    <div className={`custom-scroll ${styles.wrapper}`}>
                        { feed.orders.map((order) => <OrderCard order={order} key={order._id} allIngredients={ingredients}/> ) }
                    </div>
                </section>  
                <section className={`mt-25 ${styles.info}`}>
                    <div className={`mb-15 ${styles.progress}`}>
                        <div className={`mr-9 ${styles.status}`}>
                            <p className="text text_type_main-medium mb-6">Готовы:</p>
                            { feed.orders.filter(order => order.status === 'done').slice(0, 5).map((order) => (
                                <p 
                                className={`text text_type_digits-default ${styles.done}`} 
                                key={order._id}>
                                    { order.number }
                                </p>
                            ))
                            }
                        </div>
                        <div className={styles.status}>
                            <p className="text text_type_main-medium mb-6">В работе:</p>
                            { feed.orders.filter(order => order.status !== 'done').slice(0, 5).map((order) => (
                                <p className="text text_type_digits-default" key={order._id}>{ order.number }</p>
                            ))
                            }
                        </div>
                    </div>
                    <div className='mb-15'>
                        <p className="text text_type_main-medium">Выполнено за все время:</p>
                        <p className={`text text_type_digits-large ${styles.number}`}>{ feed.total }</p>
                    </div>
                    <div>
                        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                        <p className={`text text_type_digits-large ${styles.number}`}>{ feed.totalToday }</p>
                    </div>
                </section>
            </main>
        </div>
    );
};