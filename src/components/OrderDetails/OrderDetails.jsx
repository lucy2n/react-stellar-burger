import React from "react";
import orderStyles from './orderDetails.module.css'
import Done from "../../Done/Done";

function OrderDetails() {
    return (
        <div className={`mt-30 mb-30 ${orderStyles.main}`}>
            <p className={`text text_type_digits-large mb-8 ${orderStyles.orderNumber}`}>034536</p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <div className="mb-15 mt-15">
                <Done />
            </div>
            <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}


export default OrderDetails;