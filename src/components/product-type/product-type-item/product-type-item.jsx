import React from 'react';
import styles from './product-type-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../modal/modal';
import IngredientDetails from '../../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';

function ProductTypeItem(props) {
  const [isModal, setIsModal] = React.useState(false);

  const incrementCount = () => {
    props.pushIngredient(props.info);
    closeModal();
  };

  const closeModal = () => {
    setIsModal(false);
  }

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

      {isModal && <Modal onClose={closeModal}>
        <IngredientDetails incrementCount={incrementCount} info={props.info}/>
      </Modal>}
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
