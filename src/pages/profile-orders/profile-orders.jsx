import { OrderCard } from '../../components/order-card/order-card';
import { testOrders } from '../../utils/constants'; // временное решениеs
import styles from './profile-orders.module.css';
import React from 'react';

export const ProfileOrders = () => {

    return (
        <div className={`custom-scroll ${styles.wrapper}`}>
            { testOrders.orders.map((order) => <OrderCard order={order} key={order._id}/> ) }
        </div>
    );
};