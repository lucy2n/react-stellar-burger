import { OrderCard } from '../../components/order-card/order-card';
import styles from './feed.module.css';
import React, { useEffect } from 'react';
import { connect, disconnect } from '../../services/feed/action';
import { useDispatch, useSelector } from 'react-redux';
import { wsApiUrl } from '../../utils/constants';
import { Link, useLocation } from 'react-router-dom';

export const FeedPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const feed = useSelector(store => store.feed);

    useEffect(() => {
        dispatch(connect(`${wsApiUrl}/all`));
        return () => {
            dispatch(disconnect());
        };
    }, []);

    return (
        <div className={styles.feed}> 
            <main className={styles.main}>
                <section className='mr-10 mt-10 mb-10 mr-15'>
                    <h1 className='mb-5 text text_type_main-large'>Лента заказов</h1>
                    <div className={`custom-scroll ${styles.wrapper}`}>
                        { feed.orders.map((order) => 
                            <Link 
                            className={styles.link} 
                            key={order._id} 
                            to={`/feed/${order.number}`} 
                            state={{ background: location }}>
                                <OrderCard order={order} key={order._id}/> 
                            </Link>
                        ) }
                    </div>
                </section>  
                <section className={`mt-25 ${styles.info}`}>
                    <div className={`mb-15 ${styles.progress}`}>
                        <div className={`mr-9 ${styles.status}`}>
                            <p className="text text_type_main-medium mb-6">Готовы:</p>
                            <div className={styles.numbers}>
                                { feed.orders.filter(order => order.status === 'done').slice(0, 30).map((order) => (
                                    <p 
                                    className={`text text_type_digits-default ${styles.done}`} 
                                    key={order._id}>
                                        { order.number }
                                    </p>
                                ))
                                }
                            </div>
                        </div>
                        <div className={styles.status}>
                            <p className="text text_type_main-medium mb-6">В работе:</p>
                            <div className={styles.numbers}>
                                { feed.orders.filter(order => order.status !== 'done').slice(0, 30).map((order) => (
                                    <p className="text text_type_digits-default" key={order._id}>{ order.number }</p>
                                ))
                                }
                            </div>
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