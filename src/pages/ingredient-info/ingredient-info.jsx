import React, {useEffect, useState} from 'react';
import AppHeader from "../../components/app-header/app-header";
import styles from './ingredient-info.module.css';
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";

function IngredientInfo () {
		const ingredients = useSelector(state => state.ingredients.ingredients);
		const location = useLocation();

		const [ingredient, setIngredient] = useState({});

		useEffect(() => {
				if (ingredients && ingredients.length) {
						const ingredientId = location.pathname.split('/ingredients/')[1];
						const item = ingredients.find(el => el._id === ingredientId);
						setIngredient(item)
				}
		}, [ingredients, location.pathname])

		return (
				<>
						<AppHeader/>

						<main className={styles.info}>
								<section className={styles.centerBlock}>
										<span className="text text_type_main-large">Детали ингредиента</span>

										<div className={styles.innerInfo}>
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
								</section>
						</main>
				</>
		)
}

export default IngredientInfo;
