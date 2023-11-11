import React, {useEffect} from "react";
import styles from "./orders-profile.module.css";
import {Link, useLocation} from "react-router-dom";
import FeedOrder from "../../components/feed-order/feed-order";
import {useTypedSelector} from "../../hook/useTypedSelector";
import {useDispatch} from "../../hook/useTypedDispatch";
import {deleteCookie, getCookie} from "../../utils/cookie";
import {ORDERS_CONNECTION_CLOSE, ORDERS_CONNECTION_INIT} from "../../services/action-types/wsActionTypes";
import {BURGER_API_WSS_ORDERS} from "../../utils/burger-api";
import Preloader from "../../components/preloader/Preloader";
import {TOrder} from "../../models/feed";

const OrdersProfile = () => {
  const location = useLocation();

  const dispatch = useDispatch();
  const orders = useTypedSelector((state) => state.orders.data);

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    if (!accessToken) return;

    dispatch({
      type: ORDERS_CONNECTION_INIT,
      payload: `${BURGER_API_WSS_ORDERS}?token=${accessToken.replace("Bearer ", "")}`
    });

    return () => {
      dispatch({
        type: ORDERS_CONNECTION_CLOSE,
      });
    }
  }, [dispatch])

  return (
    <article className={styles.rightPart}>
      <div className={styles.ordersBlock}>
        {orders?.length ? orders.map((item: TOrder) => (
          <Link
            key={item._id}
            to={`/profile/orders/${item.number}`}
            state={{ background: location}}
          >
            <FeedOrder order={item} key={item._id}/>
          </Link>
        )) : 'Лента заказов пуста'}
      </div>
    </article>
  )
}

export default OrdersProfile;
