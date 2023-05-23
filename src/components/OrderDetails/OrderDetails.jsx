import React from "react";
import Modal from "../Modal/Modal";
import orderStyles from './orderDetails.module.css'
import Done from "../../Done/Done";
import PropTypes from "prop-types";

function OrderDetails({ isVisible, setVisibility }) {
    return (
        <Modal 
            isVisible={ isVisible }
            setVisibility={ setVisibility }
            children={
                <div className={`mt-30 mb-30 ${orderStyles.main}`}>
                    <p className={`text text_type_digits-large mb-8 ${orderStyles.orderNumber}`}>034536</p>
                    <p className="text text_type_main-medium">идентификатор заказа</p>
                    <div className="mb-15 mt-15">
                        <Done />
                    </div>
                    <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
                    <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
                </div>
            }
        />
    )
}

OrderDetails.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    setVisibility: PropTypes.func.isRequired
}

export default OrderDetails;