import React from "react";
import styles from './feed-info.module.css';
import {IIngredient} from "../../models/ingredient";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";

const FeedInfo = () => {
  interface IOrderInfo {
    id: string,
    name: string,
    status: string,
    date: string,
    price: number,
    ingredients: IIngredient[],
  }

  const orderInfo: IOrderInfo = {
    id: '034533',
    name: 'Black Hole Singularity острый бургер',
    status: 'Выполнен',
    date: '2022-10-10T17:33:32.877Z',
    price: 510,
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0,
        count: 2,
        burgerIngredientId: '1696771161884'
      },
      {
        _id: '643d69a5c3f7b9001cfa0943',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
        __v: 0,
        count: 1,
        burgerIngredientId: '1696771163345'
      },
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0,
        count: 1,
        burgerIngredientId: '1696771166327'
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0,
        count: 1,
        burgerIngredientId: '1696771167819'
      },
      {
        _id: '643d69a5c3f7b9001cfa0947',
        name: 'Плоды Фалленианского дерева',
        type: 'main',
        proteins: 20,
        fat: 5,
        carbohydrates: 55,
        calories: 77,
        price: 874,
        image: 'https://code.s3.yandex.net/react/code/sp_1.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
        __v: 0,
        count: 1,
        burgerIngredientId: '1696771172193'
      }
    ],
  };

  return (
    <main className={`${styles.feedInfo}`}>
      <div className={`${styles.feedInfoWrap}`}>
        <div className={`${styles.orderId} ${styles.textCenter} text text_type_digits-default`}>
          #{orderInfo.id}
        </div>

        <div className={`${styles.nameAndStatus} mt-10`}>
          <h3 className={`text text_type_main-medium`}>
            {orderInfo.name}
          </h3>

          <div className={`${styles.status} text text_type_main-small mt-3`}>
            {orderInfo.status}
          </div>
        </div>

        <div className={`${styles.compound} mt-15`}>
          <h3 className={`text text_type_main-medium`}>
            Состав:
          </h3>

          <div className={`${styles.ingredientsBlock} mt-6 pr-6`}>
            {orderInfo.ingredients.map((item: IIngredient) => (
              <div className={`${styles.ingredient} orderInfo-ingredient`}>
                <div className={`${styles.imageAndName}`}>
                  <div className={`${styles.ingredientPicture}`}>
                    <img src={item.image_mobile} alt='' className={styles.image}/>
                  </div>

                  <div className={`text text_type_main-default ml-4`}>
                    {item.name}
                  </div>
                </div>

                <div className={`${styles.countAndPrice}`}>
                  {item.count > 0 && <span className="text text_type_digits-default">{item.count}X</span>}
                  <span className="text text_type_digits-default">{item.price}</span>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            ))}
          </div>

          <div className={`${styles.dataAndPrice} mt-10`}>
            <div className={`text_color_inactive`}>
              <FormattedDate date={new Date(orderInfo.date)} />
            </div>

            <div className={styles.priceBlock}>
              <span className="text text_type_digits-default">{orderInfo.price}</span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default FeedInfo;
