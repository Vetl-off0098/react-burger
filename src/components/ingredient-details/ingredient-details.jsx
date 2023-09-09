import React, {useEffect, useState} from 'react';
import styles from './ingredient-details.module.css';
import {useDispatch, useSelector} from "react-redux";
import {
  increaseCountIngredientAction,
  resetCountIngredientAction,
  setCountIngredientBunAction
} from "../../services/reducers/ingredientsReducer";
import PropTypes from "prop-types";
import {addBurgerIngredientsAction, removeBurgerIngredientByIdAction} from "../../services/reducers/burgerIngredients";
import {useLocation} from "react-router-dom";

function IngredientDetails(props) {
  const dispatch = useDispatch();

  const viewedIngredient = useSelector(state => state.viewedIngredient.viewedIngredient);
  const ingredients = useSelector(state => state.ingredients.ingredients);
  const burger = useSelector(state => state.burger.burger);

  const location = useLocation();

  const [ingredient, setIngredient] = useState({});

  useEffect(() => {
    if (Object.entries(viewedIngredient).length) {
      setIngredient(viewedIngredient);
    } else if (ingredients && ingredients.length){
      const ingredientId = location.pathname.split('/ingredients/')[1];
      const item = ingredients.find(el => el._id === ingredientId);
      setIngredient(item)
    }
  }, [viewedIngredient, ingredients])

  const increaseIngredient = () => {
    if (ingredient.type === 'bun') {
      if (burger.find(el => el._id === ingredient._id)) {
        props.onClose();
        return
      } else {
        dispatch(resetCountIngredientAction(burger.find(el => el.count === 2)));
        dispatch(removeBurgerIngredientByIdAction(burger.find(el => el.count === 2).burgerIngredientId))

        dispatch(setCountIngredientBunAction(ingredient))
      }
    } else {
      dispatch(increaseCountIngredientAction(ingredient));
    }

    dispatch(addBurgerIngredientsAction({...ingredients.find(el => el._id === ingredient._id), burgerIngredientId: Date.now()}));
    props.onClose();
  }

  return (
    <>
      <span className="text text_type_main-large">Детали ингредиента</span>

      <div className={styles.innerModal}>
        <img onClick={() => increaseIngredient()} src={ingredient.image} alt='' className={styles.imageModal}/>

        <div className="text text_type_main-medium mt-4">{ingredient.name}</div>

        <div className={styles.PFC}>
          <div className="">
            <div className="text text_type_main-small text_color_inactive">
              Калории, ккал
            </div>

            <div className="text text_type_digits-default text_color_inactive">
              {ingredient.calories}
            </div>
          </div>

          <div className="">
            <div className="text text_type_main-small text_color_inactive">
              Белки, г
            </div>

            <div className="text text_type_digits-default text_color_inactive">
              {ingredient.proteins}
            </div>
          </div>

          <div className="">
            <div className="text text_type_main-small text_color_inactive">
              Жиры, г
            </div>

            <div className="text text_type_digits-default text_color_inactive">
              {ingredient.fat}
            </div>
          </div>

          <div className="">
            <div className="text text_type_main-small text_color_inactive">
              Углеводы, г
            </div>

            <div className="text text_type_digits-default text_color_inactive">
              {ingredient.carbohydrates}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

IngredientDetails.propTypes = {
  onClose: PropTypes.func,
}

export default IngredientDetails;
