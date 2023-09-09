import React, {useEffect, useMemo, useState} from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import ProductType from "../product-type/product-type";
import {useSelector} from "react-redux";
import {useInView} from "react-intersection-observer";

function BurgerIngredients () {
  const ingredients = useSelector(state => state.ingredients.ingredients);

  const [rootHeight, setRootHeight] = useState(0);

  const [refBun, inViewBun] = useInView({
    root: document.querySelector('.root'), // 26% 70%
    rootMargin: `-${rootHeight*26/100}px 0px -${rootHeight*70/100}px 0px`,
    // threshold: 1
  });
  const [refSauce, inViewSauce] = useInView({
    root: document.querySelector('.root'),
    rootMargin: `-${rootHeight*26/100}px 0px -${rootHeight*70/100}px 0px`,
    // threshold: 1
  });
  const [refMain, inViewMain] = useInView({
    root: document.querySelector('.root'),
    rootMargin: `-${rootHeight*26/100}px 0px -${rootHeight*70/100}px 0px`,
    // threshold: 1
  });

  useEffect(() => {
    window.addEventListener('resize', onResize);
    setRootHeight(document.querySelector('.root').offsetHeight);

    return function() {
      window.removeEventListener('resize', onResize);
    }
  }, [rootHeight])

  const onResize = () => {
    setRootHeight(document.querySelector('.root').offsetHeight);
  }

  const buns = useMemo(() => (
    ingredients.filter(el => el.type === 'bun')
  ), [ingredients]);

  const sauces = useMemo(() => (
    ingredients.filter(el => el.type === 'sauce')
  ), [ingredients]);

  const mains = useMemo(() => (
    ingredients.filter(el => el.type === 'main')
  ), [ingredients]);

  return (
    <section className={`${styles.burgerIngredientsBlock} root`}>
      <div className={`${styles.tab}`}>
        <a href="#bun" style={{ textDecoration: 'none' }}>
          <Tab value="one" active={inViewBun}>
            Булки
          </Tab>
        </a>

        <a href="#sauce" style={{ textDecoration: 'none' }}>
          <Tab value="two" active={inViewSauce}>
            Соусы
          </Tab>
        </a>

        <a href="#main" style={{ textDecoration: 'none' }}>
          <Tab value="three" active={inViewMain}>
            Начинки
          </Tab>
        </a>
      </div>

      <div className={styles.scrollBlock}>
        <div id={'bun'} ref={refBun}>
          <ProductType
            title={'Булки'}
            items={buns}
          />
        </div>

        <div id={'sauce'} ref={refSauce}>
          <ProductType
            title={'Соусы'}
            items={sauces}
          />
        </div>

        <div id={'main'} ref={refMain}>
          <ProductType
            title={'Начинка'}
            items={mains}
          />
        </div>
      </div>
    </section>
  )
}

export default BurgerIngredients;
