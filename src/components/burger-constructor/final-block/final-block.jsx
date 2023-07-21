import React from 'react';
import styles from './final-block.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import ReactDOM from "react-dom";
import Modal from "../../modal/modal";
import orderStatus from "../../../images/done.png";
import PropTypes from "prop-types";


function FinalBlock(props) {
  const [isModal, setIsModal] = React.useState(false);
  const [orderId, setOrderId] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const openModal = () => {
    setIsLoading(true);
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          modal: true,
          order: '034536',
        })
      }, 2000)
    }).then(data => {
      setIsModal(data.modal);
      setOrderId(data.order);
      setIsLoading(false);
    }).catch(e => {
      console.log(e);
      setIsLoading(false);
    })
  }

  const closeModal = () => {
    setIsModal(false);
  }

  const root = document.getElementById('root');

  return (
    <>
      {!isLoading ? (<section className={styles.finalBlock}>
        <p className={`${styles.totalPrice} text text_type_digits-medium`}>
        <span className={styles.digits}>
          {props.totalPrice}
        </span>

          <CurrencyIcon type="primary" />
        </p>

        <Button onClick={openModal} htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </section>)
      :
        (
          <section className={styles.isLoading}>
            <section className={styles.overlay}>
            </section>

            <div className={styles.loadText}>
              <p className="text text_type_main-large">Загрузка...</p>
            </div>
          </section>
        )
      }

      {isModal && ReactDOM.createPortal(
        <Modal onClose={closeModal}>
          <div className={styles.innerModal}>
            <span className={`text text_type_digits-large ${styles.orderId}`}>{orderId}</span>

            <p className="text text_type_main-medium mt-8">идентификатор заказа</p>

            <img className={styles.img} src={orderStatus} alt="Done"/>

            <div className={styles.notif}>
              <p className="text text_type_main-small">Ваш заказ начали готовить</p>
              <p className="text text_type_main-small text_color_inactive mt-2">Дождитесь готовности на орбитальной станции</p>
            </div>
          </div>
        </Modal>,
        root
      )}
    </>
  )
}

FinalBlock.propTypes = {
  totalPrice: PropTypes.number,
}

export default FinalBlock;
