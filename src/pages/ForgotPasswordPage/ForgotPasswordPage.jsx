import { useState } from "react";
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ForgotPasswordPage.module.css'
import { useNavigate } from "react-router";
import { forgotPassword } from "../../utils/api";

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const onChange = e => {
        setEmail(e.target.value)
      }

    const forgot = () => {
        if (email) {
            forgotPassword(email)
            .then(res => {
                localStorage.setItem('forgot-password', true)
                navigate('/reset-password')
            })
        }
    }

    return (
        <form className={styles.main}>
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            <EmailInput onChange={onChange} extraClass="mt-6 mb-6" value={email} placeholder="Укажите e-mail"/>
            <Button htmlType="button" type="primary" size="medium" onClick={forgot} extraClass="mb-20">Восстановить</Button>
            <div className={styles.subtitle}>
                <p className="text text_type_main-small text_color_inactive">Вспомнили пароль?</p>
                <Button extraClass="text text_type_main-small ml-2" htmlType="button" type="secondary" size="small">Войти</Button>
            </div>
        </form>
    )
}