import React from 'react';
import styles from './ingredient-details.module.css';
import PropTypes from "prop-types";
import ingredients from "../../utils/prop-types";

function IngredientDetails(props) {
  return (
    <>
      <span className="text text_type_main-large">Детали ингредиента</span>

      <div className={styles.innerModal}>
        <img onClick={props.incrementCount} src={props.info.image} alt='' className={styles.imageModal}/>

        <div className="text text_type_main-medium mt-4">{props.info.name}</div>

        <div className={styles.PFC}>
          <div className="">
            <div className="text text_type_main-small text_color_inactive">
              Калории, ккал
            </div>

            <div className="text text_type_digits-default text_color_inactive">
              {props.info.calories}
            </div>
          </div>

          <div className="">
            <div className="text text_type_main-small text_color_inactive">
              Белки, г
            </div>

            <div className="text text_type_digits-default text_color_inactive">
              {props.info.proteins}
            </div>
          </div>

          <div className="">
            <div className="text text_type_main-small text_color_inactive">
              Жиры, г
            </div>

            <div className="text text_type_digits-default text_color_inactive">
              {props.info.fat}
            </div>
          </div>

          <div className="">
            <div className="text text_type_main-small text_color_inactive">
              Углеводы, г
            </div>

            <div className="text text_type_digits-default text_color_inactive">
              {props.info.carbohydrates}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

IngredientDetails.propTypes = {
  info: PropTypes.shape(ingredients).isRequired,
  incrementCount: PropTypes.func,
}

export default IngredientDetails;
