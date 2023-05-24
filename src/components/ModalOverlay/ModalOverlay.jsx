import React from "react";
import  ReactDOM from "react-dom";
import PropTypes from "prop-types";
import overlayStyles from './ModalOverlay.module.css'

const modalRoot = document.getElementById("react-modals")

function ModalOverlay( { handleCloseModal } ) {

    return ReactDOM.createPortal(
        (
                <div className={overlayStyles.overlay} onClick={ handleCloseModal }></div>
        ), 
        modalRoot
    );
}

ModalOverlay.propTypes = {
    handleCloseModal: PropTypes.func.isRequired
}

export default ModalOverlay;