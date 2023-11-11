import React, {useEffect, useMemo} from "react";
import styles from "../feed-info-details/feed-info-details.module.css";
import {IIngredient, TIngredient} from "../../models/ingredient";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useParams} from "react-router-dom";
import {useTypedSelector} from "../../hook/useTypedSelector";
import {IOrder} from "../../models/feed";
import Preloader from "../preloader/Preloader";
import {useDispatch} from "../../hook/useTypedDispatch";
import {getOrderByNumber} from "../../services/actions/order";
import OrderStatus from "../order-status/order-status";

const FeedInfoDetails = () => {

  const dispatch = useDispatch();
  const {ingredients} = useTypedSelector((state) => state.ingredients);

  const number = useParams().number || "";

  const orderData = useTypedSelector(state => {
    if (state.feedReducer.isOpen && state.feedReducer.orders.length) {
      const data: IOrder = state.feedReducer.orders.find((el: IOrder) => el.number === +number);
      if (data) return data;
    }

    if (state.order.orderByNumber?.number === +number) {
      return state.order.orderByNumber;
    }

    return null;
  });

  useEffect(() => {
    if (!orderData) {
      dispatch(getOrderByNumber(+number));
    }
  }, [dispatch, orderData, number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    type TIngredientsWithCount = {
      [key: string]: TIngredient & {totalCount: number};
    };

    const ingredientsInfo: TIngredientsWithCount = orderData.ingredients.reduce((acc: TIngredientsWithCount, cur) => {
      if (!acc[cur]) {
        const ingredient: IIngredient | undefined = ingredients.find((el: IIngredient) => el._id === cur);

        if (ingredient) {
          acc[cur] = {
            ...ingredient,
            totalCount: 1
          }
        }
      }

      else {
        acc[cur].totalCount++;
      }

      return acc;
    }, {});

    const totalPrice = Object.values(ingredientsInfo).reduce((acc, cur) => acc + cur.price * cur.totalCount, 0);

    return {
      ...orderData,
      ingredientsInfo,
      totalPrice
    }
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return (
    <div className={`${styles.feedInfoWrap}`}>
      <div className={`${styles.orderId} ${styles.textCenter} text text_type_digits-default`}>
        #{orderInfo.number}
      </div>

      <div className={`${styles.nameAndStatus} mt-10`}>
        <h3 className={`text text_type_main-medium`}>
          {orderInfo.name}
        </h3>

        <OrderStatus status={orderInfo.status} />

        {/*<div className={`${styles.status} text text_type_main-small mt-3`}>*/}
        {/*  {orderInfo.status}*/}
        {/*</div>*/}
      </div>

      <div className={`${styles.compound} mt-15`}>
        <h3 className={`text text_type_main-medium`}>
          Состав:
        </h3>

        <div className={`${styles.ingredientsBlock} mt-6 pr-6`}>
          {Object.values(orderInfo.ingredientsInfo).map((item: IIngredient & {totalCount: number}, index) => (
            <div className={`${styles.ingredient} orderInfo-ingredient`} key={index}>
              <div className={`${styles.imageAndName}`}>
                <div className={`${styles.ingredientPicture}`}>
                  <img src={item.image_mobile} alt='' className={styles.image}/>
                </div>

                <div className={`text text_type_main-default ml-4`}>
                  {item.name}
                </div>
              </div>

              <div className={`${styles.countAndPrice}`}>
                {item.totalCount > 0 && <span className="text text_type_digits-default">{item.totalCount}X</span>}
                <span className="text text_type_digits-default">{item.price}</span>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          ))}
        </div>

        <div className={`${styles.dataAndPrice} mt-10`}>
          <div className={`text_color_inactive`}>
            <FormattedDate date={new Date(orderInfo.createdAt)} />
          </div>

          <div className={styles.priceBlock}>
            <span className="text text_type_digits-default">{orderInfo.totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedInfoDetails;
