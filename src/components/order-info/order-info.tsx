import { CurrencyIcon,  FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import React, {useState, useEffect} from 'react';
import styles from './order-info.module.css';
import { getStatus } from '../../utils/utils';
import { useLocation } from 'react-router';
import { api } from '../../utils/api';
import { getIngredientsState } from '../../services/ingredients/slice';
import { useAppSelector } from '../../hooks/hooks';
import { TOrder } from '../../types/order';
import { TIngedient } from '../../types/ingredient';

export const OrderInfo = (): JSX.Element => {
    const { ingredients } = useAppSelector(getIngredientsState);
    const location = useLocation();
    const [order, setOrder] = useState<TOrder>();
    const [orderIngredients, setOrderIngredients] = useState<Array<TIngedient>>([]);
    const [price, setPrice] = useState<number>(0);
    const [ingredientCount, setIngredientCount] = useState<{[name: string]: number}>();
    const background = location.state && location.state.background;

    // подгрузка заказа по номеру 
    useEffect(() => {
        const orderNumber = location.pathname.split('/').pop(); // последний элемент
        api.getOrder(orderNumber as string)
        .then(res => setOrder(res.orders[0]));
    }, []);

    // подгрузка всех ингредиентов 
    useEffect(() => {
        if (order !== undefined && Object.keys(order).length !== 0 && ingredients.length !== 0) {
            
            // поиск текущих ингредиентов
            const currentIngredients = order.ingredients.map(ingredientId => {
                return ingredients.find(ingredient => ingredient._id === ingredientId); 
            });
            // подсчет колличества каждого ингредиента
            const count: {[name: string]: number} = {};
            currentIngredients.forEach(ingredient => count[(ingredient as TIngedient)._id] = (count[(ingredient as TIngedient)._id] || 0) + 1);
            setIngredientCount(count);
            setOrderIngredients(currentIngredients as Array<TIngedient>);
        }
    },[order, ingredients]);

    useEffect(() => {
        if (orderIngredients.length !== 0) {
            let totalPrice = 0;
            orderIngredients.map(ingredient => (totalPrice += ingredient.price));
            setPrice(totalPrice);
        }
    }, [orderIngredients]);

    return (
        <div className={background ? styles.modal: styles.main}>
            <p className={`text text_type_digits-default mb-10 ${background ? '': styles.center}`}>#{order?.number}</p>
            <p className={`text text_type_main-medium mb-3 ${styles.name}`}>{order?.name}</p>
            <p className={`text text_type_main-default mb-15 ${order?.status === 'done' ? styles.done : ''}`}>{getStatus(order?.status)}</p>
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
                                <p className="text text_type_digits-default"> { (ingredientCount as {[name: string]: number})[ingredient._id]} x {ingredient.price} </p>
                                <CurrencyIcon type='primary'/>
                            </div>
                        </li>
                    )
                    )}
                </ul>
            </div>
            <div className={`mt-10 ${styles.details}`}>
                <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date((order as TOrder).createdAt)}/>
                <div className={styles.flex}>
                    <p className="text text_type_digits-default">{price}</p>
                    <CurrencyIcon  type='primary'/>
                </div>
            </div>
        </div>
    );
};