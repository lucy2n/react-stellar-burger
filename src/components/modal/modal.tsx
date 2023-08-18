import React, { KeyboardEvent} from 'react';
import  ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { closeModal } from '../../services/modal/action';
import { useAppDispatch } from '../../hooks/hooks';

const modalRoot = document.getElementById('react-modals');

type TModal = {
    children: JSX.Element;
    onClose(): void;
};

export const Modal = ({ children, onClose }: TModal): JSX.Element => {

    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(closeModal());
        onClose();
    };

    const handleCloseByEsc = (e: Event & { key: string }) => {
        if (e.key === 'Escape') {
            handleClose();
        }
    };

    React.useEffect(() => {
        document.addEventListener('keydown', handleCloseByEsc);
    
        return () => {
          document.removeEventListener('keydown', handleCloseByEsc);
        };
    }, []);

    return ReactDOM.createPortal(
        (       
            <>
                <ModalOverlay handleCloseModal={handleClose} />
                <div className={styles.modal}>
                    <div className={`mt-15 mr-10 ${styles.close}`}>
                        <CloseIcon type='primary' onClick={handleClose}/>
                    </div>
                    { children }
                </div>
            </>
        ), 
        modalRoot as HTMLElement
    );
};
