import React, {FC} from "react";
import styles from './order-details.module.css';

interface OrderDetailsProps {
  orderId: string,
  orderStatus: string
}

const OrderDetails: FC<OrderDetailsProps> = ({orderId, orderStatus}) => {
  return (
    <section className={styles.innerModal}>
      <span className={`text text_type_digits-large ${styles.orderId}`}>{orderId}</span>

      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>

      <img className={styles.img} src={orderStatus} alt="Done"/>

      <div className={styles.notif}>
        <p className="text text_type_main-small">Ваш заказ начали готовить</p>
        <p className="text text_type_main-small text_color_inactive mt-2">Дождитесь готовности на орбитальной станции</p>
      </div>
    </section>
  )
}

export default OrderDetails
