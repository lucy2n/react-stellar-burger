import React, { useEffect } from 'react';
import { PasswordInput, Input, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser, uptadeUserData } from '../../services/user/action';
import styles from './profile-data.module.css';
import { getUserState } from '../../services/user/reducer';
import { useForm } from '../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

export const ProfileData = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const { user } = useAppSelector(getUserState);

    const { values, handleChange, setValues } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const setDefault = () => {
        if(user !== null) {
            setValues({
                name: user.name,
                email: user.email,
                password: '',
            });
        }
    };

    const submitData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(uptadeUserData(values.password, values.name, values.email));
    };

    useEffect(() => {
        dispatch(getUser());
        if (user) {
            setDefault();
        }
    }, []);

    return (
        <form className={`mt-30 ${styles.inputs}`} onSubmit={submitData}>
            <Input 
            name='name'
            type={'text'}
            placeholder={'Имя'}
            value={values.name}
            onChange={handleChange}
            icon={'EditIcon'}
            />
            <EmailInput 
            name='email'
            value={values.email}
            extraClass='mt-6 mb-6' 
            onChange={handleChange}
            isIcon={true}
            />
            <PasswordInput 
            name='password'
            value={values.password}
            extraClass='mb-6' 
            onChange={handleChange}
            icon={'EditIcon'}
            />
            <div 
            className={values.password.length !== 0 || 
                        user?.name !== values.name || 
                        user.email !== values.email ? styles.buttons_active: styles.buttons }>
                <Button onClick={setDefault} htmlType='button' type='secondary' size='medium'>Отмена</Button>
                <Button htmlType='submit' type='primary' size='medium'>Сохранить</Button>
            </div>
        </form>
    );
};