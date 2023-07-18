import { useEffect } from "react";
import { PasswordInput, Input, EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { getUser, uptadeUserData } from "../../services/actions/user";
import { useDispatch, useSelector } from "react-redux";
import styles from './ProfileDataPage.module.css'
import { getUserState } from "../../services/reducers/user";
import { useForm } from "../../hooks/useForm";

export const ProfileDataPage = () => {
    const dispatch = useDispatch();

    const { user } = useSelector(getUserState)

    const { values, handleChange, setValues } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const setDefault = () => {
        setValues({
            name: user.name,
            email: user.email,
            password: '',
        })
    }

    const submitData = (e) => {
        e.preventDefault()
        dispatch(uptadeUserData(values.password, values.name, values.email))
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
            name="name"
            type={'text'}
            placeholder={'Имя'}
            value={values.name}
            onChange={handleChange}
            icon={'EditIcon'}
            />
            <EmailInput 
            name="email"
            value={values.email}
            extraClass="mt-6 mb-6" 
            onChange={handleChange}
            icon={'EditIcon'}
            />
            <PasswordInput 
            name="password"
            value={values.password}
            extraClass="mb-6" 
            onChange={handleChange}
            icon={'EditIcon'}
            />
            <div 
            className={values.password.length !== 0 || 
                        user.name !== values.name || 
                        user.email !== values.email ? styles.buttons_active: styles.buttons }>
                <Button onClick={setDefault} htmlType="button" type="secondary" size="medium">Отмена</Button>
                <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
            </div>
            </form>
    )
}