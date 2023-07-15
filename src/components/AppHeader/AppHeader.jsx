import { Logo, BurgerIcon, ListIcon, ProfileIcon, } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css'
import { Link } from "react-router-dom"

function AppHeader() {
    return(
        <header className={styles.header}>
            <nav className={`p-4 ${styles.content}`}>
                <div className={styles.navigation}>
                    <a className={`mr-2 pl-5 pr-5 ${styles.link}`}> 
                        <BurgerIcon />
                        <p className='ml-2 text text_type_main-default'> Конструктор </p>
                    </a>
                    <a className={`pl-5 pr-5 ${styles.link}`}>
                        <ListIcon className='ml-5' type='secondary'/> 
                        <p className='ml-2 text text_type_main-default text_color_inactive'> Лента заказов </p>
                    </a>
                </div>
                <Link to='/' className={styles.logolink}>
                    <Logo />
                </Link>
                <Link to='/profile' className={`pl-5 pr-5 ${styles.link}`}>
                    <ProfileIcon className='ml-5' type='secondary'/> 
                    <p className='ml-2 text text_type_main-default text_color_inactive'> Личный кабинет </p>
                </Link>
            </nav>
        </header>
    )
}

export default AppHeader;