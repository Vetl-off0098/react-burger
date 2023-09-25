import React, {FC} from 'react';
import styles from './product-type-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";
import {IIngredient} from "../../../models/ingredient";

interface IProductTypeItemProps {
  info: IIngredient
}

const ProductTypeItem: FC<IProductTypeItemProps> = ({info}) => {
  const location = useLocation();

  const ingredientId = info._id;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: {item: info}
  });

  return (
    <>
      <Link
        key={ingredientId}
        to={`/ingredients/${ingredientId}`}
        state={{ background: location}}
      >
        <div
          ref={dragRef}
          className={`${styles.item} mt-6` }
        >
          <img src={info.image} alt='' className={styles.image}/>

          <div className={ styles.priceBlock }>
            <p className="text text_type_digits-default">{info.price}</p>
            <span className='ml-2'><CurrencyIcon type="primary"/></span>
          </div>

          <h4 className={`text text_type_main-default mt-2 ${styles.name}`}>{info.name}</h4>

          {info.count > 0 &&
          <span className={styles.counter}>
          <Counter count={info.count} size="default" extraClass="m-1" />
        </span>
          }
        </div>
      </Link>
    </>
  )
}

export default ProductTypeItem;
