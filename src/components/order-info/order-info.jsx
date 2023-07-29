import { CurrencyIcon,  FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import React, {useState, useEffect} from 'react';
import styles from './order-info.module.css';
import { getStatus } from '../../utils/utils';
import { useLocation } from 'react-router';
import { api, getIngredients } from '../../utils/api';
import { v4 as uuidv4 } from 'uuid';

export const OrderInfo = () => {
    const location = useLocation();
    const [order, setOrder] = useState({});
    const [ingredients, setIngredients] = useState([]);
    const [price, setPrice] = useState(0);
    const [ingredientCount, setIngredientCount] = useState({});

    //подгрузка заказа по номеру 
    useEffect(() => {
        const orderNumber = location.state.number;
        api.getOrder(orderNumber)
        .then(res => setOrder(res.orders[0]));
    }, []);

    // подгрузка всех ингредиентов 
    useEffect(() => {
        if (Object.keys(order).length !== 0) {
            getIngredients()
            .then(res => {
                const orderIngredients = order.ingredients.map(ingredientId => {
                    return res.data.find(ingredient => ingredient._id === ingredientId); 
                });
                let count = {};
                orderIngredients.forEach(ingredient => count[ingredient._id] = (count[ingredient._id] || 0) + 1);
                setIngredientCount(count);
                setIngredients(orderIngredients);
            });
        }
    },[order]);

    useEffect(() => {
        if (ingredients.count !== 0) {
            let totalPrice = 0;
            ingredients.map(ingredient => (totalPrice += ingredient.price));
            setPrice(totalPrice);
        }
    }, [ingredients]);

    return (
        <div className={styles.main}>
            <p className={`text text_type_digits-default mb-10 ${styles.center}`}>#{order.number}</p>
            <p className="text text_type_main-medium mb-3">{order.name}</p>
            <p className={`text text_type_main-default mb-15 ${order.status === 'done' ? styles.done : ''}`}>{getStatus(order.status)}</p>
            <p className="text text_type_main-medium mb-6">Состав:</p>
            <div className={`custom-scroll ${styles.wrapper}`}>
                <ul className={styles.list}>
                    { [...new Set(ingredients)].map(ingredient => (
                        <li className={`mb-4 ${styles.details}`} key={uuidv4()}>
                            <div className={styles.flex}>
                                <img className={`mr-4 ${styles.image}`} src={ingredient.image_mobile}/>
                                <p className="text text_type_main-default">{ingredient.name}</p>
                            </div>
                            <div className={styles.flex}>
                                <p className="text text_type_digits-default"> {ingredientCount[ingredient._id]} x {ingredient.price} </p>
                                <CurrencyIcon />
                            </div>
                        </li>
                    )
                    )}
                </ul>
            </div>
            <div className={`mt-10 ${styles.details}`}>
                <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(order.createdAt)}/>
                <div className={styles.flex}>
                    <p className="text text_type_digits-default">{price}</p>
                    <CurrencyIcon />
                </div>
            </div>
        </div>
    );
};