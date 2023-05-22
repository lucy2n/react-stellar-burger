import React from "react";
import  ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from './modal.module.css'
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const modalRoot = document.getElementById("react-modals")

 const Modal = ({ children, isVisible, setVisibility }) => {

    function handleCloseModal() {
        setVisibility(false)
    }

    return ReactDOM.createPortal(
        (       
            <>
            { isVisible && 
                <>
                    <ModalOverlay />
                    <div className={modalStyles.modal}>
                        <div className={`mt-15 mr-10 ${modalStyles.close}`}>
                            <CloseIcon type="primary" onClick={handleCloseModal}/>
                        </div>
                        { children }
                    </div>
                </>
            }
            </>
        ), 
        modalRoot
    );
}

export default Modal;