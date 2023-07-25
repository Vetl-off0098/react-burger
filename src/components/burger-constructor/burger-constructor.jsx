import React from 'react';
import styles from './burger-constructor.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import vector from '../../images/Vector.png'
import FinalBlock from './final-block/final-block';
import PropTypes from "prop-types";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

function BurgerConstructor(props) {
  const [totalPrice, setTotalPrice] = React.useState(0);

  React.useMemo(() => {
    const newTotalPrice = props.burger.burgerMain.reduce((acc, cur) => {
      acc += cur.price;
      return acc;
    }, 0) + props.burger.bun.price;

    setTotalPrice(newTotalPrice);
  }, [props.burger])

  const deleteElement = (item) => {
    props.deleteIngredient(item);
  }

  return(
    <section className={styles.constructorAndButton}>
      <div className={styles.burgerConstructor}>
        {props.burger.bun && <ConstructorElement
          type="top"
          isLocked={true}
          text={props.burger.bun.name}
          price={props.burger.bun.price}
          thumbnail={props.burger.bun.image}
          extraClass={'ml-3'}
        />}

        {props.burger.burgerMain.length ? <div className={`${styles.burgerConstructor} ${styles.burgerConstructor__main}`}>
          {props.burger.burgerMain.map((item, index) => (
            <div className={styles.moverAndElement} key={index}>
              <img src={vector} alt="" className={styles.image}/>

              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                extraClass={`ml-3 ${styles.constructorElement}`}
                handleClose={() => deleteElement(item)}
              />
            </div>
          ))}
        </div> : ''}

        {props.burger.bun && <ConstructorElement
          type="bottom"
          isLocked={true}
          text={props.burger.bun.name}
          price={props.burger.bun.price}
          thumbnail={props.burger.bun.image}
          extraClass={'ml-3'}
        />}
      </div>

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
