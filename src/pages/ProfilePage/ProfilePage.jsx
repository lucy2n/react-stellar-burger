import { Link, Outlet } from "react-router-dom";
import { logout } from "../../services/actions/user";
import styles from './ProfilePage.module.css'
import { useDispatch } from "react-redux";

export const ProfilePage = () => {
    const dispatch = useDispatch();

    return (
        <div className={styles.main}>
            <div className={`mr-15 ${styles.content}`}>
                <nav className={`mb-20 ${styles.navigation}`}>
                    <Link 
                    to="/profile"
                    className={`text text_type_main-medium pt-4 pr-10 pb-4 pl-10 ${ styles.tab }`} >Профиль</Link>
                    <Link 
                    to="/profile/orders" 
                    className={`text text_type_main-medium pt-4 pr-10 pb-4 pl-10 ${ styles.tab }`}> История заказов</Link>
                    <a onClick={() => dispatch(logout())} className={`text text_type_main-medium pt-4 pr-10 pb-4 pl-10 ${ styles.tab }`}>Выход</a>
                </nav>
                <p className={`text text_type_main-small text_color_inactive pt-4 pb-4 pl-10 ${styles.text_color_dark}`}> В этом разделе вы можете изменить свои персональные данные</p>
            </div>
            <Outlet/>
        </div>
    )
}