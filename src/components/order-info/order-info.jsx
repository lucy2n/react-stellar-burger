import { CurrencyIcon,  FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import React, {useState, useEffect} from 'react';
import styles from './order-info.module.css';
import { getStatus } from '../../utils/utils';
import { useLocation } from 'react-router';
import { api } from '../../utils/api';
import { getIngredientsState } from '../../services/ingredients/reducer';
import { useSelector } from 'react-redux';

export const OrderInfo = () => {
    const { ingredients } = useSelector(getIngredientsState);
    const location = useLocation();
    const [order, setOrder] = useState({});
    const [orderIngredients, setOrderIngredients] = useState([]);
    const [price, setPrice] = useState(0);
    const [ingredientCount, setIngredientCount] = useState({});
    const background = location.state && location.state.background;

    // подгрузка заказа по номеру 
    useEffect(() => {
        const orderNumber = location.pathname.split('/').pop(); // последний элемент
        api.getOrder(orderNumber)
        .then(res => setOrder(res.orders[0]));
    }, []);

    // подгрузка всех ингредиентов 
    useEffect(() => {
        if (Object.keys(order).length !== 0 && ingredients.length !== 0) {
            
            const currentIngredients = order.ingredients.map(ingredientId => {
                return ingredients.find(ingredient => ingredient._id === ingredientId); 
            });
            let count = {};
            currentIngredients.forEach(ingredient => count[ingredient._id] = (count[ingredient._id] || 0) + 1);
            setIngredientCount(count);
            setOrderIngredients(currentIngredients);
        }
    },[order, ingredients]);

    useEffect(() => {
        if (orderIngredients.count !== 0) {
            let totalPrice = 0;
            orderIngredients.map(ingredient => (totalPrice += ingredient.price));
            setPrice(totalPrice);
        }
    }, [orderIngredients]);

    return (
        <div className={background ? styles.modal: styles.main}>
            <p className={`text text_type_digits-default mb-10 ${background ? '': styles.center}`}>#{order.number}</p>
            <p className={`text text_type_main-medium mb-3 ${styles.name}`}>{order.name}</p>
            <p className={`text text_type_main-default mb-15 ${order.status === 'done' ? styles.done : ''}`}>{getStatus(order.status)}</p>
            <p className="text text_type_main-medium mb-6">Состав:</p>
            <div className={`custom-scroll ${styles.wrapper}`}>
                <ul className={styles.list}>
                    { [...new Set(orderIngredients)].map((ingredient, index) => (
                        <li className={`mb-4 ${styles.details}`} key={ `${ingredient._id}${index}` }>
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