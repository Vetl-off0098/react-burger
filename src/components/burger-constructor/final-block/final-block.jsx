import React from 'react';
import styles from './final-block.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../../modal/modal";
import OrderDetails from "../../order-details/order-details";
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

  return (
    <>
      {!isLoading ? (<div className={styles.finalBlock}>
        <p className={`${styles.totalPrice} text text_type_digits-medium`}>
        <span className={styles.digits}>
          {props.totalPrice}
        </span>

          <CurrencyIcon type="primary" />
        </p>

        <Button onClick={openModal} htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>)
      :
        (
          <div className={styles.isLoading}>
            <div className={styles.overlay}>
            </div>

            <div className={styles.loadText}>
              <p className="text text_type_main-large">Загрузка...</p>
            </div>
          </div>
        )
      }

      {isModal && <Modal onClose={closeModal}>
        <OrderDetails orderId={orderId} orderStatus={orderStatus} />
      </Modal>}
    </>
  )
}

FinalBlock.propTypes = {
  totalPrice: PropTypes.number,
}

export default FinalBlock;
