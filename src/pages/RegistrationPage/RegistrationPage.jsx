import React from "react";
import { Button, EmailInput, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/AppHeader/AppHeader";
import styles from './RegistrationPage.module.css'

export const RegistrationPage = () => {
    return (
        <>
            <AppHeader />
            <div className={styles.main}>
                <h1 className="text text_type_main-medium">Регистрация</h1>
                <Input 
                type={'text'}
                placeholder={'Имя'}
                extraClass="mt-6" 
                />
                <EmailInput extraClass="mt-6 mb-6" />
                <PasswordInput extraClass="mb-6" />
                <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">Зарегестрироваться</Button>
                <div className={styles.subtitle}>
                    <p className="text text_type_main-small text_color_inactive">Уже зарегистрированы?</p>
                    <Button extraClass="text text_type_main-small ml-2" htmlType="button" type="secondary" size="small">Войти</Button>
                </div>
            </div>
        </>
    )

}