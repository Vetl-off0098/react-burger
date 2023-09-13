import React from 'react';
import styles from './product-type-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ingredients from "../../../utils/prop-types";
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";

function ProductTypeItem(props) {
  const location = useLocation();

  const ingredientId = props.info._id;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: {item: props.info}
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
          <img src={props.info.image} alt='' className={styles.image}/>

          <div className={ styles.priceBlock }>
            <p className="text text_type_digits-default">{props.info.price}</p>
            <span className='ml-2'><CurrencyIcon type="primary"/></span>
          </div>

          <h4 className={`text text_type_main-default mt-2 ${styles.name}`}>{props.info.name}</h4>

          {props.info.count > 0 &&
          <span className={styles.counter}>
          <Counter count={props.info.count} size="default" extraClass="m-1" />
        </span>
          }
        </div>
      </Link>
    </>
  )
}

ProductTypeItem.propTypes = {
  info: PropTypes.shape(ingredients).isRequired,
}

export default ProductTypeItem;
