import React from "react";
import  ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from './Modal.module.css'
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals")

function Modal({ children, setVisibility }) {

    function handleCloseModal() {
        setVisibility(false)
    }

    function handleCloseByEsc(e) {
        if (e.key === "Escape") {
            handleCloseModal()
        }
    }

    React.useEffect(() => {
        document.addEventListener("keydown", handleCloseByEsc);
    
        return () => {
          document.removeEventListener("keydown", handleCloseByEsc);
        }
    }, [])

    return ReactDOM.createPortal(
        (       
            <>
                <ModalOverlay handleCloseModal={ handleCloseModal } />
                <div className={modalStyles.modal}>
                    <div className={`mt-15 mr-10 ${modalStyles.close}`}>
                        <CloseIcon type="primary" onClick={handleCloseModal}/>
                    </div>
                    { children }
                </div>
            </>
        ), 
        modalRoot
    );
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    isVisible: PropTypes.bool.isRequired,
    setVisibility: PropTypes.func.isRequired
}

export default Modal;