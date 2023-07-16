import { useEffect, useState } from "react";
import { PasswordInput, Input, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { getUser } from "../../services/actions/user";
import { useDispatch, useSelector } from "react-redux";
import styles from './ProfileDataPage.module.css'

export const ProfileDataPage = () => {
    const dispatch = useDispatch();

    const { user } = useSelector(store => store.user)

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

    useEffect(() => {
        dispatch(getUser())
        if (user) {
            setEmail(user.email)
            setName(user.name)
        }
    }, [])

    return (
        <form className={styles.inputs}>
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
            </form>
    )
}