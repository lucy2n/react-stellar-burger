import React from "react";
import { Button, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ResetPasswordPage.module.css'
import { resetPassword } from "../../utils/api";
import { useNavigate } from "react-router";

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

    const reset = () => {
        resetPassword(password, token)
        .then(res => {
            console.log("Reset", res)
            navigate('/login')
        })
    }

    return (
        <form className={styles.main}>
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            <PasswordInput onChange={onChange} value={password} extraClass="mt-6 mb-6"  placeholder="Введите новый пароль"/>
            <Input extraClass="mb-6" onChange={onChangeToken} value={token}  placeholder="Введите код из письма"/>
            <Button htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={reset}>Сохранить</Button>
            <div className={styles.subtitle}>
                <p className="text text_type_main-small text_color_inactive">Вспомнили пароль?</p>
                <Button onClick={reset} extraClass="text text_type_main-small ml-2" htmlType="button" type="secondary" size="small">Войти</Button>
            </div>
        </form>
    )
}