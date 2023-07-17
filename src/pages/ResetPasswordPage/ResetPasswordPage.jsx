import React from "react";
import { Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ResetPasswordPage.module.css'
import { resetPassword } from "../../utils/api";
import { useNavigate, Navigate } from "react-router";
import { Link } from "react-router-dom";

export const ResettPasswordPage = () => {

    const [password, setPassword] = React.useState('')
    const [token, setToken] = React.useState('');
    const navigate = useNavigate();

    const onChange = e => {
        setPassword(e.target.value)
    }

    const onChangeToken = e => {
        setToken(e.target.value)
    }

    const reset = (e) => {
        e.preventDefault()
        resetPassword(password, token)
        .then(() => {
            localStorage.removeItem('forgot-password')
            navigate('/login')
        })
    }

    return (
        ( !localStorage.getItem('forgot-password') ?  <Navigate to='/' /> :
        <form className={styles.main} onSubmit={reset}>
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            <PasswordInput onChange={onChange} value={password} extraClass="mt-6 mb-6"  placeholder="Введите новый пароль"/>
            <Input extraClass="mb-6" onChange={onChangeToken} value={token}  placeholder="Введите код из письма"/>
            <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">Сохранить</Button>
            <div className={styles.subtitle}>
                <p className="text text_type_main-small text_color_inactive">Вспомнили пароль?</p>
                <Link to='/login'>
                    <Button extraClass="text text_type_main-small ml-2" htmlType="button" type="secondary" size="small">Войти</Button>
                </Link>
            </div>
        </form>
        )
    )
}