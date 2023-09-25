import React from 'react';
import styles from './Main.module.css';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useTypedSelector} from "../../hook/useTypedSelector";

const Main = () => {
  const ingredients = useTypedSelector(state => state.ingredients.ingredients);
  const isLoading = useTypedSelector(state => state.isLoading.isLoading);

  return (
    <>
      {!isLoading && ingredients.length ? (<div className={`${styles.Main}`}>
        <main className={`${styles.contentBlock} container mt-10` }>
          <h1 className="text text_type_main-large">Соберите бургер</h1>

          <DndProvider backend={HTML5Backend}>
            <section className={`mt-5 ${styles.ingredientsAndConstructor}`}>
              <BurgerIngredients />

              <BurgerConstructor />
            </section>
          </DndProvider>
        </main>
      </div>)
      :
      (<p>Загрузка...</p>)}
    </>
  );
}

export default Main;
