import React from 'react';
import styles from './product-type.module.css';
import ProductTypeItem from './product-type-item/product-type-item';
import PropTypes from "prop-types";

function ProductType(props) {
  return (
    <section className={`mt-10 ${styles.product}`}>
      <h2 className={ `text text_type_main-medium ${styles.product__title}` }>
        {props.title}
      </h2>

      <section className={styles.items}>
        {props.items.map(el => (
          <ProductTypeItem
            key={el._id}
            info={el}
            pushIngredient={props.pushIngredient}
          />
        ))}
      </section>
    </section>
  )
}

const itemsPropTypes = PropTypes.shape({
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
});

ProductType.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(itemsPropTypes),
  pushIngredient: PropTypes.func,
}

export default ProductType;
