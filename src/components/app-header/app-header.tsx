import { Logo, BurgerIcon, ListIcon, ProfileIcon, } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { Link, useLocation } from 'react-router-dom';
import { RoutePathname } from '../../utils/constants';
import React from 'react';

export const AppHeader = () => {
    const location = useLocation();

    return(
        <header className={styles.header}>
            <nav className={`p-4 ${styles.content}`}>
                <div className={styles.navigation}>
                    <Link to={RoutePathname.homePage} className={`mr-2 pl-5 pr-5 ${styles.link}`}> 
                        <BurgerIcon type={location.pathname === RoutePathname.homePage ? 'primary': 'secondary'}/>
                        <p className={`ml-2 text text_type_main-default ${location.pathname === RoutePathname.homePage ? '': 'text_color_inactive'}`}> Конструктор </p>
                    </Link>
                    <Link to={RoutePathname.feedPage} className={`pl-5 pr-5 ml-5 ${styles.link}`}>
                        <ListIcon type={location.pathname === RoutePathname.feedPage ? 'primary': 'secondary'} /> 
                        <p className={`ml-2 text text_type_main-default ${location.pathname === RoutePathname.feedPage ? '': 'text_color_inactive'}`}> Лента заказов </p>
                    </Link>
                </div>
                <Link to={RoutePathname.homePage} className={styles.logolink}>
                    <Logo />
                </Link>
                <Link to={RoutePathname.profilePage} className={`pl-5 pr-5 ml-5 ${styles.link}`}>
                    <ProfileIcon 
                    type={location.pathname === RoutePathname.profilePage || location.pathname === RoutePathname.loginPage ? 'primary': 'secondary'}
                    /> 
                    <p className={`ml-2 text text_type_main-default ${location.pathname ===  RoutePathname.profilePage || location.pathname === RoutePathname.loginPage ? '': 'text_color_inactive'}`}> Личный кабинет </p>
                </Link>
            </nav>
        </header>
    );
};