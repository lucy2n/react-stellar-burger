import React from 'react';
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password.module.css';
import { resetPassword } from '../../utils/api';
import { useNavigate, Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { RoutePathname } from '../../utils/constants';
import { useForm } from '../../hooks/useForm';

export const ResettPassword = (): JSX.Element => {
    const { values, handleChange } = useForm({
        token: '',
        password: '',
    });

    const navigate = useNavigate();

    const reset = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        resetPassword(values.password, values.token)
        .then(() => {
            localStorage.removeItem('forgot-password');
            navigate(RoutePathname.loginPage);
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        });
    };

    return (
        ( !localStorage.getItem('forgot-password') ?  <Navigate to={RoutePathname.homePage} /> :
        <form className={styles.main} onSubmit={reset}>
            <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
            <PasswordInput 
            name='password'
            onChange={handleChange} 
            value={values.password} 
            extraClass='mt-6 mb-6'  
            placeholder='Введите новый пароль'
            />
            <Input 
            name='token'
            extraClass='mb-6' 
            onChange={handleChange} 
            value={values.token}  
            placeholder='Введите код из письма'
            />
            <Button htmlType='submit' type='primary' size='medium' extraClass='mb-20'>Сохранить</Button>
            <div className={styles.subtitle}>
                <p className='text text_type_main-small text_color_inactive'>Вспомнили пароль?</p>
                <Link to={RoutePathname.loginPage}>
                    <Button extraClass='text text_type_main-small ml-2' htmlType='button' type='secondary' size='small'>Войти</Button>
                </Link>
            </div>
        </form>
        )
    );
};