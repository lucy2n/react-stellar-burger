import React from "react";
import  ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Modal.module.css'
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { closeModal } from "../../services/actions/modal";

const modalRoot = document.getElementById("react-modals")

export const Modal = ({ children, onClose }) => {

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeModal())
        onClose()
    }

    function handleCloseByEsc(e) {
        if (e.key === "Escape") {
            handleClose()
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
                <ModalOverlay handleCloseModal={handleClose} />
                <div className={styles.modal}>
                    <div className={`mt-15 mr-10 ${styles.close}`}>
                        <CloseIcon type="primary" onClick={handleClose}/>
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
    onClose: PropTypes.func.isRequired
}
