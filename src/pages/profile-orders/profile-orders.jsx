import { OrderCard } from '../../components/order-card/order-card';
import styles from './profile-orders.module.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from '../../services/history/action';
import { wsApiUrl } from '../../utils/constants';
import { Link } from 'react-router-dom';
import { getIngredientsState } from '../../services/ingredients/reducer';
import { loadIngredients } from '../../services/ingredients/action';

export const ProfileOrders = () => {

    const { ingredients } = useSelector(getIngredientsState);
    const dispatch = useDispatch();
    const history = useSelector(store => store.history);
    const accessToken = localStorage.getItem('accessToken').split(' ')[1];

    useEffect(() => {
        if(ingredients.length === 0) {
            dispatch(loadIngredients());
        }
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