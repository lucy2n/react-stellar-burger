import PropTypes from "prop-types";
import styles from './ModalOverlay.module.css'

export const ModalOverlay = ({ handleCloseModal }) => {

    return (
        <div className={styles.overlay} onClick={ handleCloseModal }></div>
    );
}

ModalOverlay.propTypes = {
    handleCloseModal: PropTypes.func.isRequired
}