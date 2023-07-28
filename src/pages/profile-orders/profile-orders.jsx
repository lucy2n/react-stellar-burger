import { OrderCard } from '../../components/order-card/order-card';
import { getIngredients } from '../../utils/api';
import { testOrders } from '../../utils/constants'; // временное решениеs
import styles from './profile-orders.module.css';
import React, { useEffect, useState } from 'react';

export const ProfileOrders = () => {

    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        getIngredients()
        .then(res => setIngredients(res.data));
    }, []);

    return (
        <div className={`custom-scroll mt-15 ${styles.wrapper}`}>
            {  testOrders.orders.map((order) => <OrderCard order={order} key={order._id} allIngredients={ingredients}/> ) }
        </div>
    );
};