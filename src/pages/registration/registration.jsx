import { Button, EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './registration.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../services/user/action';
import { RoutePathname } from '../../utils/constants';
import { useForm } from '../../hooks/useForm';
import React from 'react';

export const Registration = () => {
    const dispatch = useDispatch();
    const { values, handleChange } = useForm({
        email: '',
        name: '',
        password: ''
    });


    const register = (e) => {
        e.preventDefault();
        if (values.email && values.name && values.password) {
            dispatch(registerUser(values.email, values.password, values.name));
        }
    };

    return (
        <form className={styles.main} onSubmit={register}>
            <h1 className='text text_type_main-medium'>Регистрация</h1>
            <Input 
            name='name'
            type={'text'}
            placeholder={'Имя'}
            extraClass='mt-6' 
            value={values.name}
            onChange={handleChange}
            />
            <EmailInput 
            name='email'
            value={values.email}
            extraClass='mt-6 mb-6' 
            onChange={handleChange}
            />
            <PasswordInput 
            name='password'
            value={values.password}
            extraClass='mb-6' 
            onChange={handleChange}
            />
            <Button htmlType='submit' type='primary' size='medium' extraClass='mb-20'>Зарегестрироваться</Button>
            <div className={styles.subtitle}>
                <p className='text text_type_main-small text_color_inactive'>Уже зарегистрированы?</p>
                <Link to={RoutePathname.loginPage}>
                    <Button extraClass='text text_type_main-small ml-2' htmlType='button' type='secondary' size='small'>Войти</Button>
                </Link>
            </div>
        </form>
    );
};