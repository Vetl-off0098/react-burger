import React from 'react';
import styles from './product-type.module.css';
import ProductTypeItem from './product-type-item/product-type-item';

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

export default ProductType;
