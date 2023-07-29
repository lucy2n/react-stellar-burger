import { OrderCard } from '../../components/order-card/order-card';
import { getIngredients } from '../../utils/api';
import styles from './profile-orders.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from '../../services/history/action';
import { wsApiUrl } from '../../utils/constants';
import { Link } from 'react-router-dom';

export const ProfileOrders = () => {

    const [ingredients, setIngredients] = useState([]);
    const dispatch = useDispatch();
    const history = useSelector(store => store.history);
    const accessToken = localStorage.getItem('accessToken').split(' ')[1];

    useEffect(() => {
        getIngredients()
        .then(res => setIngredients(res.data));
        dispatch(connect(`${wsApiUrl}?token=${accessToken}`));
    }, []);

    return (
        <div className={`custom-scroll mt-15 ${styles.wrapper}`}>
            {  history.orders.toReversed().map((order) => 
                <Link className={styles.link} to={`/profile/orders/${order._id}`} key={order._id} state={{number: order.number}}>
                    <OrderCard order={order} key={order._id} allIngredients={ingredients}/> 
                </Link>
            ) }
        </div>
    );
};