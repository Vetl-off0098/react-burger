import React from 'react';
import styles from './product-type.module.css';
import ProductTypeItem from './product-type-item/product-type-item';
import PropTypes from "prop-types";
import ingredients from "../../utils/prop-types";

function ProductType(props) {
  return (
    <section className={`mt-10 ${styles.product}`}>
      <h2 className={ `text text_type_main-medium ${styles.product__title}` }>
        {props.title}
      </h2>

      <div className={styles.items}>
        {props.items.map(el => (
          <ProductTypeItem
            key={el._id}
            info={el}
          />
        ))}
      </div>
    </section>
  )
}

ProductType.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape(ingredients).isRequired).isRequired,
}

export default ProductType;
