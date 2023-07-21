import React from 'react';
import ReactDOM from 'react-dom';
import styles from './product-type-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../modal/modal';
import PropTypes from 'prop-types';

function ProductTypeItem(props) {
  // const [count, setCount] = React.useState(0);
  const [isModal, setIsModal] = React.useState(false);

  const incrementCount = () => {
    // setCount(count + 1);
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

        {props.info.count > 0 &&
        <span className={styles.counter}>
          <Counter count={props.info.count} size="default" extraClass="m-1" />
        </span>
        }
      </section>

      {isModal && ReactDOM.createPortal(
        <Modal onClose={closeModal}>
          <span className="text text_type_main-large">Детали ингредиента</span>

          <div className={styles.innerModal}>
            <img onClick={incrementCount} src={props.info.image} alt='' className={styles.imageModal}/>

            <div className="text text_type_main-medium mt-4">{props.info.name}</div>

            <div className={styles.PFC}>
              <div className="">
                <div className="text text_type_main-default text_color_inactive">
                  Калории, ккал
                </div>

                <div className="text text_type_digits-default text_color_inactive">
                  {props.info.calories}
                </div>
              </div>

              <div className="">
                <div className="text text_type_main-small text_color_inactive">
                  Белки, г
                </div>

                <div className="text text_type_digits-default text_color_inactive">
                  {props.info.proteins}
                </div>
              </div>

              <div className="">
                <div className="text text_type_main-small text_color_inactive">
                  Жиры, г
                </div>

                <div className="text text_type_digits-default text_color_inactive">
                  {props.info.fat}
                </div>
              </div>

              <div className="">
                <div className="text text_type_main-small text_color_inactive">
                  Углеводы, г
                </div>

                <div className="text text_type_digits-default text_color_inactive">
                  {props.info.carbohydrates}
                </div>
              </div>
            </div>
          </div>
        </Modal>,
        root
      )}
    </>
  )
}

ProductTypeItem.propTypes = {
  info: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    _v: PropTypes.number
  }),
  // info: PropTypes.object,
  pushIngredient: PropTypes.func,
}

export default ProductTypeItem;
