import React from "react";
import  ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from './Modal.module.css'
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../services/actions/modal";

const modalRoot = document.getElementById("react-modals")

function Modal({ children }) {

    const dispatch = useDispatch();

    function handleCloseByEsc(e) {
        if (e.key === "Escape") {
            closeModal();
        }
    }

    function closeModal() {
        dispatch({
            type: CLOSE_MODAL
        })
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
                <ModalOverlay handleCloseModal={closeModal} />
                <div className={modalStyles.modal}>
                    <div className={`mt-15 mr-10 ${modalStyles.close}`}>
                        <CloseIcon type="primary" onClick={closeModal}/>
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
}

export default Modal;