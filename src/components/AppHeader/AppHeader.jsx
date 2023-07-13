import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon, } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './AppHeader.module.css'
import { Link } from "react-router-dom"

function AppHeader() {
    return(
        <header className={appHeaderStyles.header}>
            <nav className={`m-4 ${appHeaderStyles.content}`}>
                <div className={appHeaderStyles.navigation}>
                    <a className={`mr-2 pl-5 pr-5 ${appHeaderStyles.link}`}> 
                        <BurgerIcon />
                        <p className='ml-2 text text_type_main-default'> Конструктор </p>
                    </a>
                    <a className={`pl-5 pr-5 ${appHeaderStyles.link}`}>
                        <ListIcon className='ml-5' type='secondary'/> 
                        <p className='ml-2 text text_type_main-default text_color_inactive'> Лента заказов </p>
                    </a>
                </div>
                <a className={appHeaderStyles.logolink}>
                    <Logo />
                </a>
                    <Link to='/profile' className={`pl-5 pr-5 ${appHeaderStyles.link}`}>
                        <ProfileIcon className='ml-5' type='secondary'/> 
                        <p className='ml-2 text text_type_main-default text_color_inactive'> Личный кабинет </p>
                    </Link>
            </nav>
        </header>
    )
}

export default AppHeader;