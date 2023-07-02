import React from 'react';
import styles from './final-block.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';


function FinalBlock(props) {
  return (
    <section className={styles.finalBlock}>
      <p className={`${styles.totalPrice} text text_type_digits-medium`}>
        <span className={styles.digits}>
          {props.totalPrice}
        </span>

        <CurrencyIcon type="primary" />
      </p>

      <Button htmlType="button" type="primary" size="medium">
        Оформить заказ
      </Button>
    </section>
  )
}

export default FinalBlock;
