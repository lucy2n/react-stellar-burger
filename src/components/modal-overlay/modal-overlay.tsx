import styles from './modal-overlay.module.css';
import React from 'react';

export const ModalOverlay = ({ handleCloseModal }: {handleCloseModal(): void}) => {

    return (
        <div className={styles.overlay} onClick={ handleCloseModal }></div>
    );
};