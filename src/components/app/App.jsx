import React from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients} from "../../services/async-actions/ingredients";
import {isLoadingAction} from "../../services/reducers/isLoadingReducer";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
  React.useEffect(() => {
    dispatch(isLoadingAction(true))
    dispatch(fetchIngredients());
  }, []);

  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.ingredients.ingredients);
  const isLoading = useSelector(state => state.isLoading.isLoading);
  const burger = useSelector(state => state.burger.burger);

  return (
    <>
      {!isLoading && ingredients.length && burger.length ? (<div className={`${styles.App}`}>
        <AppHeader/>

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

export default App;
