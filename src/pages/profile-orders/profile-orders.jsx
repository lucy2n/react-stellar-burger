import { OrderCard } from '../../components/order-card/order-card';
import styles from './profile-orders.module.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect, disconnect } from '../../services/history/action';
import { wsApiUrl } from '../../utils/constants';
import { Link, useLocation } from 'react-router-dom';

export const ProfileOrders = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useSelector(store => store.history);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken').split(' ').pop();
        dispatch(connect(`${wsApiUrl}?token=${accessToken}`));
        return () => {
            dispatch(disconnect());
        };
    }, []);

    return (
        <div className={`custom-scroll mt-15 ${styles.wrapper}`}>
            {  history.orders.toReversed().map((order) => 
                <Link 
                className={styles.link} 
                to={`/profile/orders/${order.number}`} 
                key={order._id} 
                state={{
                    number: order.number,
                    background: location
                }}
                >
                    <OrderCard order={order} key={order._id}/> 
                </Link>
            ) }
        </div>
    );
};