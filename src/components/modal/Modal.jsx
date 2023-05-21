import React from "react";
import  ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from './modal.module.css'
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const modalRoot = document.getElementById("react-modals")

function Modal({ children }) {

    const[state, setState] = React.useState({visible: true})

    function handleOpeneModal() {
        setState({ visible: true })
    }

    function handleCloseModal() {
        setState({ visible: false })
    }


    return ReactDOM.createPortal(
        (       
            <>
            { state.visible && 
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