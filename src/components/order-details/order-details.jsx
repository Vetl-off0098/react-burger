import React from "react";
import styles from './order-details.module.css';
import PropTypes from "prop-types";

function OrderDetails(props) {
  return (
    <section className={styles.innerModal}>
      <span className={`text text_type_digits-large ${styles.orderId}`}>{props.orderId}</span>

      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>

      <img className={styles.img} src={props.orderStatus} alt="Done"/>

      <div className={styles.notif}>
        <p className="text text_type_main-small">Ваш заказ начали готовить</p>
        <p className="text text_type_main-small text_color_inactive mt-2">Дождитесь готовности на орбитальной станции</p>
      </div>
    </section>
  )
}

OrderDetails.propTypes = {
  orderId: PropTypes.string,
  orderStatus: PropTypes.any,
}

export default OrderDetails
