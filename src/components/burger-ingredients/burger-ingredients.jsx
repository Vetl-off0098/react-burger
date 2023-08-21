import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import ProductType from "../product-type/product-type";
import {useSelector} from "react-redux";

function BurgerIngredients () {
  const [current, setCurrent] = React.useState('one');

  const ingredients = useSelector(state => state.ingredients.ingredients);

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
            items={ingredients.filter(el => el.type === 'bun')}
          />
        </div>

        <div id={'sauce'}>
          <ProductType
            title={'Соусы'}
            items={ingredients.filter(el => el.type === 'sauce')}
          />
        </div>

        <div id={'main'}>
          <ProductType
            title={'Начинка'}
            items={ingredients.filter(el => el.type === 'main')}
          />
        </div>
      </div>
    </section>
  )
}

export default BurgerIngredients;
