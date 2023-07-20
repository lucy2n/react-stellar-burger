import { OrderCard } from "../../components/OrderCard/OrderCard"
import { testOrders } from "../../utils/constants" // временное решениеs
import styles from "./ProfileOrdersPage.module.css"

export const ProfileOrdersPage = () => {

    return (
        <div className={`custom-scroll ${styles.wrapper}`}>
            { testOrders.orders.map((order) => <OrderCard order={order} key={order._id}/> ) }
        </div>
    )
}