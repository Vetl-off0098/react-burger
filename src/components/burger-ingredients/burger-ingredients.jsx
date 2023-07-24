import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import ProductType from "../product-type/product-type";
import PropTypes from 'prop-types';
import ingredients from "../../utils/prop-types";

function BurgerIngredients (props) {
  const [current, setCurrent] = React.useState('one');

  return (
    <section className={styles.burgerIngredientsBlock}>
      <div style={{ display: 'flex' }}>
        <a href="#bun" style={{ textDecoration: 'none' }}>
          <Tab value="one" active={current === 'one'} onClick={setCurrent}>
            Булки
          </Tab>
        </a>

        <a href="#sauce" style={{ textDecoration: 'none' }}>
          <Tab value="two" active={current === 'two'} onClick={setCurrent}>
            Соусы
          </Tab>
        </a>

        <a href="#main" style={{ textDecoration: 'none' }}>
          <Tab value="three" active={current === 'three'} onClick={setCurrent}>
            Начинки
          </Tab>
        </a>
      </div>

      <div className={styles.scrollBlock}>
        <div id={'bun'}>
          <ProductType
            title={'Булки'}
            items={props.items.filter(el => el.type === 'bun')}
            pushIngredient={props.pushIngredient}
          />
        </div>

        <div id={'sauce'}>
          <ProductType
            title={'Соусы'}
            items={props.items.filter(el => el.type === 'sauce')}
            pushIngredient={props.pushIngredient}
          />
        </div>

        <div id={'main'}>
          <ProductType
            title={'Начинка'}
            items={props.items.filter(el => el.type === 'main')}
            pushIngredient={props.pushIngredient}
          />
        </div>
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(ingredients).isRequired).isRequired,
}

export default BurgerIngredients;
