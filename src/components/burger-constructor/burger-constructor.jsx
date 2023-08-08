import React, { useContext } from 'react';
import styles from './burger-constructor.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import vector from '../../images/Vector.png'
import FinalBlock from './final-block/final-block';
import PropTypes from "prop-types";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { BurgerConstructorContext } from '../../services/appContext';

function BurgerConstructor(props) {
  const burger = useContext(BurgerConstructorContext);

  const deleteElement = (item) => {
    props.deleteIngredient(item);
  }

  return(
    <section className={styles.constructorAndButton}>
      <div className={styles.burgerConstructor}>
        {burger.bun && <ConstructorElement
          type="top"
          isLocked={true}
          text={burger.bun.name}
          price={burger.bun.price}
          thumbnail={burger.bun.image}
          extraClass={'ml-3'}
        />}

        {burger.burgerMain.length ? <div className={`${styles.burgerConstructor} ${styles.burgerConstructor__main}`}>
          {burger.burgerMain.map((item, index) => (
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

        {burger.bun && <ConstructorElement
          type="bottom"
          isLocked={true}
          text={burger.bun.name}
          price={burger.bun.price}
          thumbnail={burger.bun.image}
          extraClass={'ml-3'}
        />}
      </div>

      <FinalBlock/>
    </section>
  )
}

BurgerIngredients.propTypes = {
  deleteIngredient: PropTypes.func
}

export default BurgerConstructor;
