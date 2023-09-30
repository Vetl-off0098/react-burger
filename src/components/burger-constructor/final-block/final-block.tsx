import React, {useState, useMemo} from 'react';
import styles from './final-block.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../../modal/modal";
import OrderDetails from "../../order-details/order-details";
import orderStatus from "../../../images/done.png";
import {fetchCreateOrder} from "../../../services/async-actions/ingredients";
import {toggleOrderAction} from "../../../services/actions/createdOrderActions";
import {isLoadingOrderAction} from "../../../services/actions/isLoadingOrderActions";
import {useNavigate} from "react-router-dom";
import {useTypedSelector} from "../../../hook/useTypedSelector";
import {IIngredient} from "../../../models/ingredient";
import {useDispatch} from "../../../hook/useTypedDispatch";

function FinalBlock() {
  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = useState(0);

  const burger = useTypedSelector(state => state.burger.burger);
  const isLoadingOrder = useTypedSelector(state => state.isLoadingOrder.isLoadingOrder);
  const isSuccess = useTypedSelector(state => state.createdOrder.order.isSuccess);
  const orderId = useTypedSelector(state => state.createdOrder.order.orderId);
  const isOpen = useTypedSelector(state => state.createdOrder.order.isOpen);
  const user = useTypedSelector(state => state.user.user);

  const navigate = useNavigate();

  useMemo(() => {
    if (burger.length) {
      let burgerBun: IIngredient | undefined = burger.find(el => el.type ==='bun');
      const bunsPrice: number = burgerBun ? burgerBun.price * 2 : 0;
      const newTotalPrice = burger.filter(el => el.type !== 'bun').reduce((acc, cur) => {
        acc += cur.price;
        return acc;
      }, 0) + bunsPrice;

      setTotalPrice(newTotalPrice);
    } else {
      setTotalPrice(0);
    }
  }, [burger])

  const handleClickCreateOrder = () => {
    dispatch(isLoadingOrderAction(true));

    if (user) {
      dispatch(fetchCreateOrder(burger));
      dispatch(isLoadingOrderAction(false));
    } else {
      dispatch(isLoadingOrderAction(false));
      navigate('/login', {state: burger});
    }
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

        <Button
          disabled={!burger.find(el => el.type ==='bun')}
          onClick={() => handleClickCreateOrder()}
          htmlType="button"
          type="primary"
          size="medium"
        >
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
