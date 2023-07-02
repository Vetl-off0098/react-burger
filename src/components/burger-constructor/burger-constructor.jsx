import React from 'react';
import styles from './burger-constructor.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import vector from '../../images/Vector.png'
import FinalBlock from './final-block/final-block';
import PropTypes from "prop-types";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

function BurgerConstructor(props) {
  const totalPrice = props.burger.burgerMain.reduce((acc, cur) => {
    acc += cur.price;
    return acc;
  }, 0) + props.burger.bun.price;

  return(
    <section className={styles.constructorAndButton}>
      <section className={styles.burgerConstructor}>
        {props.burger.bun && <ConstructorElement
          type="top"
          isLocked={true}
          text={props.burger.bun.name}
          price={props.burger.bun.price}
          thumbnail={props.burger.bun.image}
          extraClass={'ml-3'}
        />}

        {props.burger.burgerMain.length ? <section className={`${styles.burgerConstructor} ${styles.burgerConstructor__main}`}>
          {props.burger.burgerMain.map((item, index) => (
            <div className={styles.moverAndElement} key={index}>
              <img src={vector} alt="" className={styles.image}/>

              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                extraClass={`ml-3 ${styles.constructorElement}`}
                handleClose={props.deleteIngredient}
              />
            </div>
          ))}
        </section> : ''}

        {props.burger.bun && <ConstructorElement
          type="bottom"
          isLocked={true}
          text={props.burger.bun.name}
          price={props.burger.bun.price}
          thumbnail={props.burger.bun.image}
          extraClass={'ml-3'}
        />}
      </section>

      <FinalBlock totalPrice={totalPrice}/>
    </section>
  )
}

const itemsPropTypes = PropTypes.shape({
  bun: PropTypes.object,
  burgerMain: PropTypes.array,
});

BurgerIngredients.propTypes = {
  burger: PropTypes.objectOf(itemsPropTypes),
}

export default BurgerConstructor;
