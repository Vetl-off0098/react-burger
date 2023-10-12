import React, {FC} from "react";
import styles from './feed-order.module.css';
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";

interface IOrder {
  id: string,
  date: string,
  name: string,
  ingredients: Array<string>,
  price: number
}

interface IFeedOrderProps {
  order: IOrder
}

const FeedOrder:FC<IFeedOrderProps> = ({order}) => {
  return (
    <div className={`${styles.feedOrder} mt-4`}>
      <div className={styles.top}>
        <div className={`${styles.orderId} text text_type_digits-default`}>
          #{order.id}
        </div>

        <div className={`${styles.orderDate} text_color_inactive`}>
          <FormattedDate date={new Date(order.date)} />
        </div>
      </div>

      <div className={`${styles.middle} text text_type_main-medium mt-6`}>
        {order.name}
      </div>

      <div className={`${styles.bottom} mt-6`}>
        <div className={`${styles.pictures} pictures`}>
          {order.ingredients.map((item:string, index) => (
            <div key={index} className={styles.orderIngredientsWrap} style={{zIndex: `${order.ingredients.length - index}`}}>
              <div className={`${styles.orderIngredients} orderIngredients`}>
                <img src={item} alt='' className={styles.image}/>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.priceBlock}>
          <span className="text text_type_digits-default">{order.price}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default FeedOrder;
