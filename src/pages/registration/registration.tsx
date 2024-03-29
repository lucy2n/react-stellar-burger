import { Button, EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './registration.module.css';
import { Link } from 'react-router-dom';
import { registerUser } from '../../services/user/action';
import { RoutePathname } from '../../utils/constants';
import { useForm } from '../../hooks/useForm';
import React from 'react';
import { useAppDispatch } from '../../hooks/hooks';

export const Registration = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const { values, handleChange } = useForm({
        email: '',
        name: '',
        password: ''
    });


    const register = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (values.email && values.name && values.password) {
            dispatch(registerUser({email: values.email, password: values.password, name: values.name}));
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