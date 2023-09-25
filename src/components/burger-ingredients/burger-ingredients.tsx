import React, {useEffect, useMemo, useState} from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import ProductType from "../product-type/product-type";
import {useInView} from "react-intersection-observer";
import {useTypedSelector} from "../../hook/useTypedSelector";

const BurgerIngredients = () => {
  interface IIngredient {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
    count: number,
    burgerIngredientId?: string
  }

  const {ingredients} = useTypedSelector((state) => state.ingredients);

  const [rootHeight, setRootHeight] = useState<number>(0);

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
    setRootHeight(document.querySelector<HTMLElement>('.root')!.offsetHeight);

    return function() {
      window.removeEventListener('resize', onResize);
    }
  }, [rootHeight])

  const onResize = () => {
    setRootHeight(document.querySelector<HTMLElement>('.root')!.offsetHeight);
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
          <Tab value="one" active={inViewBun} onClick={() => console.log('Tab click')}>
            Булки
          </Tab>
        </a>

        <a href="#sauce" style={{ textDecoration: 'none' }}>
          <Tab value="two" active={inViewSauce} onClick={() => console.log('Tab click')}>
            Соусы
          </Tab>
        </a>

        <a href="#main" style={{ textDecoration: 'none' }}>
          <Tab value="three" active={inViewMain} onClick={() => console.log('Tab click')}>
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
