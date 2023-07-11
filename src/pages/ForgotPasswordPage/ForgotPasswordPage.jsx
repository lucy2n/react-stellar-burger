import React from "react";
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/AppHeader/AppHeader";
import styles from './ForgotPasswordPage.module.css'

export const ForgotPasswordPage = () => {
    return (
        <>
            <AppHeader />
            <div className={styles.main}>
                <h1 className="text text_type_main-medium">Восстановление пароля</h1>
                <EmailInput extraClass="mt-6 mb-6"  placeholder="Укажите e-mail"/>
                <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">Восстановить</Button>
                <div className={styles.subtitle}>
                    <p className="text text_type_main-small text_color_inactive">Вспомнили пароль?</p>
                    <Button extraClass="text text_type_main-small ml-2" htmlType="button" type="secondary" size="small">Войти</Button>
                </div>
            </div>
        </>
    )

}