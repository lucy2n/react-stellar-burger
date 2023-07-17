import { useEffect, useState } from "react";
import { PasswordInput, Input, EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { getUser, uptadeUserData } from "../../services/actions/user";
import { useDispatch, useSelector } from "react-redux";
import styles from './ProfileDataPage.module.css'
import { getUserState } from "../../services/reducers/user";

export const ProfileDataPage = () => {
    const dispatch = useDispatch();

    const { user } = useSelector(getUserState)

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

    const setDefault = () => {
        setEmail(user.email)
        setName(user.name)
        setPassword('')
    }

    const submitData = (e) => {
        e.preventDefault()
        dispatch(uptadeUserData(password, name, email))
    }

    useEffect(() => {
        dispatch(getUser())
        if (user) {
            setDefault();
        }
    }, [])

    return (
        <form className={styles.inputs} onSubmit={submitData}>
                <Input 
                type={'text'}
                placeholder={'Имя'}
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
                <div 
                className={password.length !== 0 || 
                           user.name !== name || 
                           user.email !== email ? styles.buttons_active: styles.buttons }>
                    <Button onClick={setDefault} htmlType="button" type="secondary" size="medium">Отмена</Button>
                    <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
                </div>
            </form>
    )
}