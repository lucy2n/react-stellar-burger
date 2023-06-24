import React from 'react';
import { useSelector } from 'react-redux';
import orderStyles from './OrderDetails.module.css'
import doneImage from '../../images/graphics.svg'

function OrderDetails() {

    const order = useSelector(state => state.order.order)

    return (
        <div className={`mt-30 mb-30 ${orderStyles.main}`}>
            <p className={`text text_type_digits-large mb-8 ${orderStyles.orderNumber}`}>{ order.number }</p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <div className="mb-15 mt-15">
                <img src={doneImage} alt="Готово" />
            </div>
            <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;