import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { getIngredients } from '../../utils/api';
import styles from './OrderCard.module.css';
import { useEffect, useState } from 'react';

export const OrderCard = ({ order }) => {
    const today = new Date()
    const yesterday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1,
        today.getHours(),
        today.getMinutes() - 1,
        0,
    )

    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        getIngredients()
            .then(res => {
                const allIngredients = res.data;
                const orderIngredients = order.ingredients.map((id) => {
                    return allIngredients.find(ingredient => ingredient._id === id)
                })
                setIngredients(orderIngredients)
            })
    }, [])

    return (
        <div className={`mb-4 mr-2 ${styles.main}`}>
            <div className={`mt-6 mb-6 ${styles.content}`}>
                <div className={`mb-6 ${styles.info}`}>
                    <p className='text text_type_digits-default'>{`#${order.number}`}</p>
                    <FormattedDate className='text text_type_main-default text_color_inactive' date={yesterday} />
                </div>
                <p className='text text_type_main-medium mb-2'>Death Star Starship Main бургер</p>
                <p className='text text_type_main-small mb-6'>{order.status}</p>
                <div className={` ${styles.info}`}>
                    <div className={styles.images}>
                        {
                        ingredients.slice(0, 6).map((ingredient, index) =>
                            <img 
                            className={styles.image} 
                            src={ingredient.image_mobile} 
                            style={{
                                left: `-${16 * index}px`,
                                zIndex: `${6 - index}`
                            }}/>
                        )}
                    </div>
                    <div className={`mt-6 ${styles.sum}`}>
                        <p className='text text_type_digits-default mr-2'>480</p>
                        <CurrencyIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}