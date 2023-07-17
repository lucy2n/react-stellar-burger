import { useState } from "react";
import { Button, EmailInput, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './RegistrationPage.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { registerUser } from "../../services/actions/user";

export const RegistrationPage = () => {
    const dispatch = useDispatch();
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

    const register = (e) => {
        e.preventDefault()
        if (email && name && password) {
            dispatch(registerUser(email, password, name))
        }
    }

    return (
        <form className={styles.main}>
            <h1 className="text text_type_main-medium">Регистрация</h1>
            <Input 
            type={'text'}
            placeholder={'Имя'}
            extraClass="mt-6" 
            value={name}
            onChange={onChangeName}
            />
            <EmailInput 
            value={email}
            extraClass="mt-6 mb-6" 
            onChange={onChangeEmail}
            />
            <PasswordInput 
            value={password}
            extraClass="mb-6" 
            onChange={onChangePassword}
            />
            <Button onClick={register} htmlType="submit" type="primary" size="medium" extraClass="mb-20">Зарегестрироваться</Button>
            <div className={styles.subtitle}>
                <p className="text text_type_main-small text_color_inactive">Уже зарегистрированы?</p>
                <Link to='/login'>
                    <Button extraClass="text text_type_main-small ml-2" htmlType="button" type="secondary" size="small">Войти</Button>
                </Link>
            </div>
        </form>
    )
}