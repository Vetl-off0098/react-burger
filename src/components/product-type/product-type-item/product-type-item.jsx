import React from 'react';
import styles from './product-type-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../modal/modal';
import IngredientDetails from '../../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';
import ingredients from "../../../utils/prop-types";
import {useDispatch} from "react-redux";
import {setViewedIngredientsAction} from "../../../services/reducers/viewedIngredient";
import {useDrag} from "react-dnd";

function ProductTypeItem(props) {
  const [isModal, setIsModal] = React.useState(false);
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: {item: props.info}
  });

  const handleClickIngredient = () => {
    setIsModal(true);
    dispatch(setViewedIngredientsAction(props.info))
  }

  const closeModal = () => {
    setIsModal(false);
  }

  return (
    <>
      <div
        ref={dragRef}
        className={`${styles.item} mt-6` }
        onClick={handleClickIngredient}
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

      {isModal && <Modal onClose={closeModal}>
        <IngredientDetails onClose={closeModal}/>
      </Modal>}
    </>
  )
}

ProductTypeItem.propTypes = {
  info: PropTypes.shape(ingredients).isRequired,
}

export default ProductTypeItem;
