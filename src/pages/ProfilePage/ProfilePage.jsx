import React, { useState } from "react";
import { Tab, PasswordInput, Input, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/AppHeader/AppHeader";
import styles from './ProfilePage.module.css'

export const ProfilePage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <>
            <AppHeader />
            <div className={styles.main}>
                <div className={`mr-15 ${styles.content}`}>
                    <nav className={`mb-20 ${styles.navigation}`}>
                        <a className={`text text_type_main-medium pt-4 pr-10 pb-4 pl-10 ${ styles.tab, styles.tab_type_current }`} >Профиль</a>
                        <a className={`text text_type_main-medium pt-4 pr-10 pb-4 pl-10 ${ styles.tab }`}> История заказов</a>
                        <a className={`text text_type_main-medium pt-4 pr-10 pb-4 pl-10 ${ styles.tab }`}>Выход</a>
                    </nav>
                    <p className={`text text_type_main-small text_color_inactive pt-4 pb-4 pl-10 ${styles.text_color_dark}`}> В этом разделе вы можете изменить свои персональные данные</p>
                </div>
                <div className={styles.inputs}>
                    <Input 
                    type={'text'}
                    placeholder={'Имя'}
                    extraClass="mt-6" 
                    value={name}
                    onChange={onChangeName}
                    icon={'EditIcon'}
                    />
                    <EmailInput 
                    value={email}
                    extraClass="mt-6 mb-6" 
                    onChange={onChangeEmail}
                    icon={'EditIcon'}
                    />
                    <PasswordInput 
                    value={password}
                    extraClass="mb-6" 
                    onChange={onChangePassword}
                    icon={'EditIcon'}
                    />
                </div>
            </div>
        </>
    )

}