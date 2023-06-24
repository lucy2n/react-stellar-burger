import PropTypes from "prop-types";
import overlayStyles from './ModalOverlay.module.css'

function ModalOverlay( { handleCloseModal } ) {

    return (
        <div className={overlayStyles.overlay} onClick={ handleCloseModal }></div>
    );
}

ModalOverlay.propTypes = {
    handleCloseModal: PropTypes.func.isRequired
}

export default ModalOverlay;