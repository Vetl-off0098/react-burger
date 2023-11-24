import React, {useEffect, useMemo} from "react";
import styles from './feed.module.css';
import {useTypedSelector} from "../../hook/useTypedSelector";
import FeedOrder from "../../components/feed-order/feed-order";
import {Link, useLocation} from "react-router-dom";
import {useDispatch} from "../../hook/useTypedDispatch";
import {FEED_CONNECTION_CLOSE, FEED_CONNECTION_INIT} from "../../services/action-types/wsActionTypes";
import {BURGER_API_WSS_FEED} from "../../utils/burger-api";
import Preloader from "../../components/preloader/Preloader";
import {IOrder} from "../../models/feed";

const Feed = () => {
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: FEED_CONNECTION_INIT, payload: BURGER_API_WSS_FEED});

    return () => {
      dispatch({type: FEED_CONNECTION_CLOSE});
    }
  }, [dispatch]);

  const orders = useTypedSelector((state) => state.feedReducer.orders);
  const total = useTypedSelector((state) => state.feedReducer.total);
  const totalToday = useTypedSelector((state) => state.feedReducer.totalToday);

  let readyOrders: Array<string> = [];
  let inWorkOrders: Array<string> = [];

  useMemo(() => {
    readyOrders = orders.filter((el: IOrder) => el.status === 'done').map((el: IOrder) => {
      return el.number;
    }).slice(0, 25);

    inWorkOrders = orders.filter((el: IOrder) => el.status === 'pending').map((el: IOrder) => {
      return el.number;
    }).slice(0, 20);
  }, [orders]);

  if (!orders.length) {
    return (<Preloader />);
  }

  return (
    <main className={`${styles.main} container pt-10`}>
      <h1 className="text text_type_main-large">
        Лента заказов
      </h1>

      <section className={styles.content}>
        <div className={styles.ordersBlock}>
          {orders.map((item: IOrder) => (
            <Link
              key={item._id}
              to={`/feed/${item.number}`}
              state={{ background: location}}
            >
              <FeedOrder order={item} key={item._id}/>
            </Link>
          ))}
        </div>

        <div className={`${styles.rightBlock}`}>
          <div className={`${styles.top}`}>
            <div className={`${styles.status} ${styles.ready}`}>
              <h3 className={`text text_type_main-medium`}>
                Готовы:
              </h3>

              <div className={`mt-6 ${styles.readyOrders}`}>
                {readyOrders.map((item: string, index) => (
                  <div className={`${styles.readyOrder} text text_type_digits-default`} key={index}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className={`${styles.status} ${styles.inWork}`}>
              <h3 className={`text text_type_main-medium`}>
                В работе:
              </h3>

              <div className="mt-6">
                {inWorkOrders.map((item: string, index) => (
                  <div className={`text text_type_digits-default`} key={index}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="middle mt-15">
            <h3 className={`text text_type_main-medium`}>
              Выполнено за всё время:
            </h3>

            <div className={`${styles.ordersCount} text text_type_digits-large mt-6`}>
              {total}
            </div>
          </div>

          <div className="bottom mt-15">
            <h3 className={`text text_type_main-medium`}>
              Выполнено за сегодня:
            </h3>

            <div className={`${styles.ordersCount} text text_type_digits-large mt-6`}>
              {totalToday}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Feed;
