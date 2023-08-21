import React, {useEffect, useState} from 'react';
import styles from './burger-constructor.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import vector from '../../images/Vector.png'
import FinalBlock from './final-block/final-block';
import {useDispatch, useSelector} from "react-redux";
import {decreaseCountIngredientAction} from "../../services/reducers/ingredientsReducer";
import {removeBurgerIngredientByIdAction} from "../../services/reducers/burgerIngredients";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const burger = useSelector(state => state.burger.burger);
  const [bun, setBun] = useState({});
  const [otherIngrs, setOtherIngr] = useState([]);

  useEffect(() => {
    if (burger.filter(el => el.type === 'bun').length) {
      setBun(
        burger.find(el => el.type === 'bun')
      );
    }

    setOtherIngr([
      ...burger.filter(el => el.type !== 'bun')
    ])
  }, [burger]);

  const deleteElement = (item) => {
    dispatch(decreaseCountIngredientAction(item));
    dispatch(removeBurgerIngredientByIdAction(item.burgerIngredientId));
  }

  // const modifyOtherIngrsArr = (item) => {
  //   if (item.count > 1) {
  //     const resultArr = [];
  //     for (let i = 0; i < item.count; i++) {
  //       resultArr.push(item)
  //     }
  //     return resultArr;
  //   } else {
  //     return [item];
  //   }
  // }

  return(
    <section className={styles.constructorAndButton}>
      <div className={styles.burgerConstructor}>
        {bun && <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={'ml-3'}
        />}

        {otherIngrs.length ? <div className={`${styles.burgerConstructor} ${styles.burgerConstructor__main}`}>
          {otherIngrs.map((item, index) => (
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

        {bun && <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={'ml-3'}
        />}
      </div>

      <FinalBlock/>
    </section>
  )
}

export default BurgerConstructor;
