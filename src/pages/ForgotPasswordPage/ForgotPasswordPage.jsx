import { useState } from "react";
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ForgotPasswordPage.module.css'
import { useNavigate } from "react-router";
import { forgotPassword } from "../../utils/api";
import { Link } from "react-router-dom";
import { RoutePathname } from "../../utils/constants";

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const onChange = e => {
        setEmail(e.target.value)
      }

    const forgot = (e) => {
        e.preventDefault()
        if (email) {
            forgotPassword(email)
            .then(res => {
                localStorage.setItem('forgot-password', true)
                navigate(RoutePathname.resetPassPage)
            })
        }
    }

    return (
        <form className={styles.main} onSubmit={forgot}>
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            <EmailInput onChange={onChange} extraClass="mt-6 mb-6" value={email} placeholder="Укажите e-mail"/>
            <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">Восстановить</Button>
            <div className={styles.subtitle}>
                <p className="text text_type_main-small text_color_inactive">Вспомнили пароль?</p>
                <Link to='/login'>
                    <Button extraClass="text text_type_main-small ml-2" htmlType="button" type="secondary" size="small">Войти</Button>
                </Link>
            </div>
        </form>
    )
}