import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';
import React from 'react';

export const ModalOverlay = ({ handleCloseModal }) => {

    return (
        <div className={styles.overlay} onClick={ handleCloseModal }></div>
    );
};

ModalOverlay.propTypes = {
    handleCloseModal: PropTypes.func.isRequired
};