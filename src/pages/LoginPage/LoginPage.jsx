import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './LoginPage.module.css'
import { useDispatch } from "react-redux";
import { signInUser } from "../../utils/api";
import { login } from "../../services/actions/user";

export const LoginPage = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmail = e => {
        setEmail(e.target.value)
    }

    const onChangePassword = e => {
        setPassword(e.target.value)
    }

    const signIn = () => {
        if(email && password) {
            dispatch(login(email, password))
        }
    }

    return (
        <form className={styles.main}>
            <h1 className="text text_type_main-medium">Вход</h1>
            <EmailInput value={email} onChange={onChangeEmail} extraClass="mt-6 mb-6" />
            <PasswordInput value={password} onChange={onChangePassword} extraClass="mb-6" />
            <Button onClick={signIn} htmlType="button" type="primary" size="medium" extraClass="mb-20">Войти</Button>
            <div className={`mb-4 ${styles.subtitle}`}>
                <p className="text text_type_main-small text_color_inactive">Вы — новый пользователь?</p>
                <Link to='/register'>
                    <Button extraClass="text text_type_main-small ml-2" htmlType="button" type="secondary" size="small">Зарегистрироваться</Button>
                </Link>
            </div>
            <div className={styles.subtitle}>
                <p className="text text_type_main-small text_color_inactive">Забыли пароль?</p>
                <Link to='/forgot-password'>
                    <Button extraClass="text text_type_main-small ml-2" htmlType="button" type="secondary" size="small">Восстановить пароль</Button>
                </Link>
            </div>
        </form>
    )
}