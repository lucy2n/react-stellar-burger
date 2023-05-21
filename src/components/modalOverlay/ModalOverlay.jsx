import React from "react";
import  ReactDOM from "react-dom";

import overlayStyles from './modalOverlay.module.css'

const modalRoot = document.getElementById("react-modals")

function ModalOverlay() {
    return ReactDOM.createPortal(
        (
                <div className={overlayStyles.overlay}></div>
        ), 
        modalRoot
    );
}

export default ModalOverlay;