import React, {FC, useMemo} from "react";
import styles from './feed-order.module.css';
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useTypedSelector} from "../../hook/useTypedSelector";
import {IIngredient} from "../../models/ingredient";
import {useLocation} from "react-router-dom";
import OrderStatus from "../order-status/order-status";

interface IOrder {
  _id: string,
  ingredients: Array<string>,
  status: string,
  name: string,
  createdAt: string,
  updatedAt: string,
  number: number,
}

interface IFeedOrderProps {
  order: IOrder
}

const FeedOrder:FC<IFeedOrderProps> = ({order}) => {
  const {ingredients} = useTypedSelector((state) => state.ingredients);
  const location = useLocation();


  const orderInfo = useMemo(() => {
    if (!ingredients.length) return null;

    const ingredientsIfo = order.ingredients.reduce((acc: IIngredient[], cur: string) => {
      const ingredient: IIngredient | undefined = ingredients.find((el: IIngredient) => el._id === cur);

      if (ingredient) {
        return [...acc, ingredient];
      } else {
        return acc;
      }
    }, []);

    const totalPrice = ingredientsIfo.reduce((acc: number, cur: IIngredient) => {
      acc += cur.price;
      return acc;
    }, 0);

    const ingredientsToShow = ingredientsIfo.slice(0, 6);

    const remainder = ingredientsIfo.length > 6 ? ingredientsIfo.length - 6 : 0;

    return {
      ...order,
      ingredientsIfo,
      totalPrice,
      ingredientsToShow,
      remainder
    };
  }, [order, ingredients]);

  if (!orderInfo) return null;

  return (
    <div className={`${styles.feedOrder} mt-4`}>
      <div className={styles.top}>
        <div className={`${styles.orderId} text text_type_digits-default`}>
          #{order.number}
        </div>

        <div className={`${styles.orderDate} text_color_inactive`}>
          <FormattedDate date={new Date(order.createdAt)} />
        </div>
      </div>

      <div className={`${styles.middle} text text_type_main-medium mt-6`}>
        {order.name}
      </div>

      {location.pathname === "/profile/orders" && (
        <OrderStatus status={orderInfo.status} />
      )}

      <div className={`${styles.bottom} mt-6`}>
        {orderInfo?.ingredientsToShow?.length && <div className={`${styles.pictures} pictures`}>
          {orderInfo.ingredientsToShow.map((item, index) => (
            <div
              key={index}
              className={styles.orderIngredientsWrap}
              style={{zIndex: `${order.ingredients.length - index}`}}
            >
              <div className={`${styles.orderIngredients} orderIngredients`}>
                <img src={item.image_mobile} alt='ingredient' className={styles.image}/>

                {!!orderInfo?.remainder && index === orderInfo.ingredientsToShow.length - 1 &&
                  <div className={`${styles.remainder}`} data-descr={`${orderInfo.remainder}`}>
                    <div className={`${styles.remainder_shell}`}>
                    </div>

		                  <div className={`${styles.remainder_value} text text_type_digits-default`}>
                        +{ orderInfo.remainder }
		                  </div>
                  </div>
                }
              </div>
            </div>
          ))}
        </div>}

        <div className={styles.priceBlock}>
          <span className="text text_type_digits-default">{orderInfo?.totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default FeedOrder;
