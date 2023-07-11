import React from "react";
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/AppHeader/AppHeader";
import styles from './LoginPage.module.css'

export const LoginPage = () => {
    return (
        <>
            <AppHeader />
            <div className={styles.main}>
                <h1 className="text text_type_main-medium">Вход</h1>
                <EmailInput extraClass="mt-6 mb-6" />
                <PasswordInput extraClass="mb-6" />
                <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">Войти</Button>
                <div className={`mb-4 ${styles.subtitle}`}>
                    <p className="text text_type_main-small text_color_inactive">Вы — новый пользователь?</p>
                    <Button extraClass="text text_type_main-small ml-2" htmlType="button" type="secondary" size="small">Зарегистрироваться</Button>
                </div>
                <div className={styles.subtitle}>
                    <p className="text text_type_main-small text_color_inactive">Забыли пароль?</p>
                    <Button extraClass="text text_type_main-small ml-2" htmlType="button" type="secondary" size="small">Восстановить пароль</Button>
                </div>
            </div>
        </>
    )

}