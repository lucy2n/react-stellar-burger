import React from "react";
import orderStyles from './OrderDetails.module.css'
import doneImage from '../../images/graphics.svg'
import { OrderContext } from "../../services/OrderContext";

function OrderDetails() {

    const { orderNumber } = React.useContext(OrderContext)

    return (
        <div className={`mt-30 mb-30 ${orderStyles.main}`}>
            <p className={`text text_type_digits-large mb-8 ${orderStyles.orderNumber}`}>{ orderNumber }</p>
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