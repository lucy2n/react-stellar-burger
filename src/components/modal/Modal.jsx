import React from "react";
import  ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from './modal.module.css'

const modalRoot = document.getElementById("react-modals")

function Modal() {
    return ReactDOM.createPortal(
        (
                <div className={modalStyles.modal}>
                    <div className={`mt-15 mr-10 ${modalStyles.close}`}>
                        <CloseIcon type="primary" />
                    </div>
                </div>
        ), 
        modalRoot
    );
}

export default Modal;