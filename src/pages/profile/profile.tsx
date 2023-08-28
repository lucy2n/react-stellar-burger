import { Link, Outlet, useLocation } from 'react-router-dom';
import { logout } from '../../services/user/action';
import styles from './profile.module.css';
import { RoutePathname } from '../../utils/constants';
import React from 'react';
import { useAppDispatch} from '../../hooks/hooks';

export const Profile = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    return (
        <div className={styles.main}>
            <div className={`mr-15 mt-30 ${styles.content}`}>
                <nav className={`mb-20 ${styles.navigation}`}>
                    <Link 
                    to='/profile'
                    className={`text text_type_main-medium pt-4 pr-10 pb-4 pl-10 ${location.pathname === RoutePathname.profilePage ? styles.tab_active : styles.tab}`}>Профиль</Link>
                    <Link 
                    to='/profile/orders' 
                    className={`text text_type_main-medium pt-4 pr-10 pb-4 pl-10 ${location.pathname === '/profile/orders' ? styles.tab_active : styles.tab}`}> История заказов</Link>
                    <a onClick={() => dispatch(logout())} className={`text text_type_main-medium pt-4 pr-10 pb-4 pl-10 ${ styles.tab }`}>Выход</a>
                </nav>
                <p className={`text text_type_main-small text_color_inactive pt-4 pb-4 pl-10 ${styles.text_color_dark}`}> В этом разделе вы можете изменить свои персональные данные</p>
            </div>
            <Outlet/>
        </div>
    );
};