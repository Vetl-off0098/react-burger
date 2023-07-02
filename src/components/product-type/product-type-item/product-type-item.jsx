import React from 'react';
import ReactDOM from 'react-dom';
import styles from './product-type-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../modal/modal';

function ProductTypeItem(props) {
  const [count, setCount] = React.useState(0);
  const [isModal, setIsModal] = React.useState(false);

  const incrementCount = () => {
    setCount(count + 1);
    props.pushIngredient(props.info);
    closeModal();
  };

  const closeModal = () => {
    setIsModal(false);
  }

  const root = document.getElementById('root');

  return (
    <>
      <section className={`${styles.item} mt-6` } onClick={() => setIsModal(true)}>
        <img src={props.info.image} alt='' className={styles.image}/>

        <div className={ styles.priceBlock }>
          <p className="text text_type_digits-default">{props.info.price}</p>
          <span className='ml-2'><CurrencyIcon type="primary"/></span>
        </div>

        <h4 className={`text text_type_main-default mt-2 ${styles.name}`}>{props.info.name}</h4>

        {count > 0 &&
        <span className={styles.counter}>
          <Counter count={count} size="default" extraClass="m-1" />
        </span>
        }
      </section>

      {isModal && ReactDOM.createPortal(
        <Modal onClose={closeModal}>
          Привет, мир!

          <span onClick={incrementCount}>{props.info.price}</span>
        </Modal>,
        root
      )}
    </>
  )
}

export default ProductTypeItem;
