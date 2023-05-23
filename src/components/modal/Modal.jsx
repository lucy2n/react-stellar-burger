import React from "react";
import  ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from './modal.module.css'
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const modalRoot = document.getElementById("react-modals")

function Modal({ children, isVisible, setVisibility }) {

    function handleCloseModal() {
        console.log("click")
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
            { isVisible && 
                <>
                    <ModalOverlay handleCloseModal={ handleCloseModal } />
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