import React, {FC} from 'react';
import styles from './product-type.module.css';
import ProductTypeItem from './product-type-item/product-type-item';
import {IIngredient} from '../../models/ingredient'

interface IProductTypeProps {
  title: string,
  items: IIngredient[]
}

const ProductType: FC<IProductTypeProps> = ({title, items}) => {
  return (
    <section className={`mt-10 ${styles.product}`}>
      <h2 className={ `text text_type_main-medium ${styles.product__title}` }>
        {title}
      </h2>

      <div className={styles.items}>
        {items.map(el => (
          <ProductTypeItem
            key={el._id}
            info={el}
          />
        ))}
      </div>
    </section>
  )
}

export default ProductType;
