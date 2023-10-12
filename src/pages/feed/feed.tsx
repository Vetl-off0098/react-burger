import React, {useEffect} from "react";
import styles from './feed.module.css';
import {useTypedSelector} from "../../hook/useTypedSelector";
import FeedOrder from "../../components/feed-order/feed-order";
import {Link} from "react-router-dom";
import {socketMiddleware} from "../../services/middleware/socketMiddleware";
import {wsConnectionClosed, wsConnectionStart} from "../../services/actions/websocketActions";
import {useDispatch} from "../../hook/useTypedDispatch";
import {FEED_CONNECTION_CLOSE, FEED_CONNECTION_INIT} from "../../services/action-types/wsActionTypes";
import {BURGER_API_WSS_FEED} from "../../utils/burger-api";

const Feed = () => {
  const {ingredients} = useTypedSelector((state) => state.ingredients);

  interface IOrder {
    id: string,
    date: string,
    name: string,
    ingredients: Array<string>,
    price: number
  }

  const orders: IOrder[] = [
    {
      id: '034534',
      date: '2022-10-10T17:33:32.877Z',
      name: 'Interstellar бургер',
      ingredients: [
        ingredients[0].image_mobile,
        ingredients[1].image_mobile,
        ingredients[2].image_mobile,
        ingredients[3].image_mobile,
        ingredients[4].image_mobile,
      ],
      price: 560,
    },
    {
      id: '034535',
      date: '2022-10-10T17:33:32.877Z',
      name: 'Interstellar бургер',
      ingredients: [
        ingredients[0].image_mobile,
        ingredients[1].image_mobile,
        ingredients[2].image_mobile,
        ingredients[3].image_mobile,
        ingredients[4].image_mobile,
      ],
      price: 480,
    },
    {
      id: '034536',
      date: '2022-10-10T17:33:32.877Z',
      name: 'Interstellar бургер',
      ingredients: [
        ingredients[0].image_mobile,
        ingredients[1].image_mobile,
        ingredients[2].image_mobile,
        ingredients[3].image_mobile,
        ingredients[4].image_mobile,
      ],
      price: 480,
    },
    {
      id: '034537',
      date: '2022-10-10T17:33:32.877Z',
      name: 'Interstellar бургер',
      ingredients: [
        ingredients[0].image_mobile,
        ingredients[1].image_mobile,
        ingredients[2].image_mobile,
        ingredients[3].image_mobile,
        ingredients[4].image_mobile,
      ],
      price: 480,
    },
    {
      id: '034538',
      date: '2022-10-10T17:33:32.877Z',
      name: 'Interstellar бургер',
      ingredients: [
        ingredients[0].image_mobile,
        ingredients[1].image_mobile,
        ingredients[2].image_mobile,
        ingredients[3].image_mobile,
        ingredients[4].image_mobile,
      ],
      price: 480,
    },
    {
      id: '034539',
      date: '2022-10-10T17:33:32.877Z',
      name: 'Interstellar бургер',
      ingredients: [
        ingredients[0].image_mobile,
        ingredients[1].image_mobile,
        ingredients[2].image_mobile,
        ingredients[3].image_mobile,
        ingredients[4].image_mobile,
      ],
      price: 480,
    }
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: FEED_CONNECTION_INIT, payload: BURGER_API_WSS_FEED})

    return () => {
      dispatch({type: FEED_CONNECTION_CLOSE})
    }
  }, [dispatch])

  const readyOrders: Array<string> = ['034533', '034532', '034530', '034527', '034525'];
  const inWorkOrders: Array<string> = ['034538', '034541', '034542'];

  const allTimeOrders: number = 28752;
  const todayOrders: number = 138;

  return (
    <main className={`${styles.main} container pt-10`}>
      <h1 className="text text_type_main-large">
        Лента заказов
      </h1>

      <section className={styles.content}>
        <div className={styles.ordersBlock}>
          {orders.map((item: IOrder) => (
            <Link
              key={item.id}
              to={`/feed/${item.id}`}
              // state={{ background: location}}
            >
              <FeedOrder order={item} key={item.id}/>
            </Link>
          ))}
        </div>

        <div className={`${styles.rightBlock} ml-15`}>
          <div className={`${styles.top}`}>
            <div className={`${styles.status} ${styles.ready}`}>
              <h3 className={`text text_type_main-medium`}>
                Готовы:
              </h3>

              <div className="mt-6">
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
              {allTimeOrders}
            </div>
          </div>

          <div className="bottom mt-15">
            <h3 className={`text text_type_main-medium`}>
              Выполнено за сегодня:
            </h3>

            <div className={`${styles.ordersCount} text text_type_digits-large mt-6`}>
              {todayOrders}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Feed;
