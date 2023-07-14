import PropTypes from "prop-types";
import styles from './ModalOverlay.module.css'

function ModalOverlay( { handleCloseModal } ) {

    return (
        <div className={styles.overlay} onClick={ handleCloseModal }></div>
    );
}

ModalOverlay.propTypes = {
    handleCloseModal: PropTypes.func.isRequired
}

export default ModalOverlay;