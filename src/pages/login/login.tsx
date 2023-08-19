import { useForm } from '../../hooks/useForm';
import { Link, useNavigate } from 'react-router-dom';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { login } from '../../services/user/action';
import { RoutePathname } from '../../utils/constants';
import React from 'react';
import { useAppDispatch } from '../../hooks/hooks';

export const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { values, handleChange } = useForm({
        email: '',
        password: '',
    });

    const signIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(values.email && values.password) {
            dispatch(
                login(values.email, values.password)
            )
            .then(() => {
                navigate(RoutePathname.homePage);
            })
            .catch(err => {
                console.log(`Error: ${err}`);
            });
        }
    };

    return (
        <form className={styles.main} onSubmit={signIn}>
            <h1 className='text text_type_main-medium'>Вход</h1>
            <EmailInput 
            name='email'
            value={values.email} 
            onChange={handleChange} 
            extraClass='mt-6 mb-6' 
            />
            <PasswordInput 
            name='password'
            value={values.password} 
            onChange={handleChange} 
            extraClass='mb-6' 
            />
            <Button htmlType='submit' type='primary' size='medium' extraClass='mb-20'>Войти</Button>
            <div className={`mb-4 ${styles.subtitle}`}>
                <p className='text text_type_main-small text_color_inactive'>Вы — новый пользователь?</p>
                <Link to={RoutePathname.registerPage}>
                    <Button extraClass='text text_type_main-small ml-2' htmlType='button' type='secondary' size='small'>Зарегистрироваться</Button>
                </Link>
            </div>
            <div className={styles.subtitle}>
                <p className='text text_type_main-small text_color_inactive'>Забыли пароль?</p>
                <Link to={RoutePathname.forgotPassPage}>
                    <Button extraClass='text text_type_main-small ml-2' htmlType='button' type='secondary' size='small'>Восстановить пароль</Button>
                </Link>
            </div>
        </form>
    );
};