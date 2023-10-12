import React from "react";
import styles from "./orders-profile.module.css";
import {Link, useLocation} from "react-router-dom";
import FeedOrder from "../../components/feed-order/feed-order";
import {useTypedSelector} from "../../hook/useTypedSelector";

const OrdersProfile = () => {
  const {ingredients} = useTypedSelector((state) => state.ingredients);
  const location = useLocation();

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

  return (
    <article className={styles.rightPart}>
      <div className={styles.ordersBlock}>
        {orders.map((item: IOrder) => (
          <Link
            key={item.id}
            to={`/profile/orders/${item.id}`}
            // state={{ background: location}}
          >
            <FeedOrder order={item} key={item.id}/>
          </Link>
        ))}
      </div>
    </article>
  )
}

export default OrdersProfile;
