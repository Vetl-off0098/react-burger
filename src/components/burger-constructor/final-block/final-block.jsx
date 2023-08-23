import React from 'react';
import styles from './final-block.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../../modal/modal";
import OrderDetails from "../../order-details/order-details";
import orderStatus from "../../../images/done.png";
import {useDispatch, useSelector} from "react-redux";
import {fetchCreateOrder} from "../../../services/async-actions/ingredients";
import {toggleOrderAction} from "../../../services/reducers/createdOrderReducer";
import {isLoadingOrderAction} from "../../../services/reducers/isLoadingOrder";

function FinalBlock() {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = React.useState(0);
  const burger = useSelector(state => state.burger.burger);
  const isLoadingOrder = useSelector(state => state.isLoadingOrder.isLoadingOrder);
  const isSuccess = useSelector(state => state.createdOrder.order.isSuccess);
  const orderId = useSelector(state => state.createdOrder.order.orderId);
  const isOpen = useSelector(state => state.createdOrder.order.isOpen);

  React.useMemo(() => {
    const newTotalPrice = burger.filter(el => el.type !== 'bun').reduce((acc, cur) => {
      acc += cur.price;
      return acc;
    }, 0) + burger.find(el => el.type ==='bun').price * 2;

    setTotalPrice(newTotalPrice);
  }, [burger])

  const handleClickCreateOrder = () => {
    dispatch(isLoadingOrderAction(true))
    dispatch(fetchCreateOrder(burger));
  }

  const closeModal = () => {
    dispatch(toggleOrderAction(false))
  }

  return (
    <>
      {!isLoadingOrder ? (<div className={styles.finalBlock}>
        <p className={`${styles.totalPrice} text text_type_digits-medium`}>
          <span className={styles.digits}>
            {totalPrice}
          </span>

          <CurrencyIcon type="primary" />
        </p>

        <Button onClick={() => handleClickCreateOrder()} htmlType="button" type="primary" size="medium">
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

      {isOpen && isSuccess && <Modal onClose={() => closeModal()}>
        <OrderDetails orderId={orderId} orderStatus={orderStatus} />
      </Modal>}
    </>
  )
}

export default FinalBlock;
