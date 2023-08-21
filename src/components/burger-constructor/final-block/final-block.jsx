import React, { useContext } from 'react';
import styles from './final-block.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../../modal/modal";
import OrderDetails from "../../order-details/order-details";
import orderStatus from "../../../images/done.png";
import api from '../../../utils/api';
import checkResponse from "../../../utils/check-response";
import {useSelector} from "react-redux";

function FinalBlock() {
  const [isModal, setIsModal] = React.useState(false);
  const [orderId, setOrderId] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const burger = useSelector(state => state.burger.burger);

  React.useMemo(() => {
    const newTotalPrice = burger.filter(el => el.type !== 'bun').reduce((acc, cur) => {
      acc += cur.price;
      return acc;
    }, 0) + burger.find(el => el.type ==='bun').price * 2;

    setTotalPrice(newTotalPrice);
  }, [burger])

  const openModal = () => {
    setIsLoading(true);

    fetch(`${api}/orders`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'ingredients': [
          burger.find(el => el.type === 'bun'),
          burger.find(el => el.type === 'bun'),
          ...burger.filter(el => el.type !== 'bun'),
        ].map(el => el._id)
      })
    })
      .then(data => checkResponse(data))
      .then(data => {
        setIsModal(data.success);
        setOrderId(String(data.order.number));
        setIsLoading(false);
      })
      .catch(e => {
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
          {totalPrice}
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

export default FinalBlock;
