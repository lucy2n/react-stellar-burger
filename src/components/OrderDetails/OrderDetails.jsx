import { useSelector } from 'react-redux';
import styles from './OrderDetails.module.css'
import doneImage from '../../images/graphics.svg'
import { getOrderState } from '../../services/reducers/order';

export const OrderDetails = () => {

    const { order } = useSelector(getOrderState)

    return (
        <div className={`mt-30 mb-30 ${styles.main}`}>
            <p className={`text text_type_digits-large mb-8 ${styles.orderNumber}`}>{ order.number }</p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <div className="mb-15 mt-15">
                <img src={doneImage} alt="Готово" />
            </div>
            <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}