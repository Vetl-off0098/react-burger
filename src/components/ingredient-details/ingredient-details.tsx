import React, {useEffect, useState} from 'react';
import styles from './ingredient-details.module.css';
import {useParams} from "react-router-dom";
import {useTypedSelector} from "../../hook/useTypedSelector";
import {IIngredient} from '../../models/ingredient'

function IngredientDetails() {
  const ingredients = useTypedSelector(state => state.ingredients.ingredients);
  const [ingredient, setIngredient] = useState<IIngredient | any>({});
  const {ingredientId} = useParams();

  useEffect(() => {
    if (ingredients && ingredients.length){
      const item = ingredients.find(el => el._id === ingredientId);
      setIngredient(item)
    }
  }, [ingredients])

  return (
    <>
      <span className="text text_type_main-large">Детали ингредиента</span>

      <div className={styles.innerModal}>
        <img src={ingredient.image} alt='' className={styles.imageModal}/>

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

export default IngredientDetails;
