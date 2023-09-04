import React from 'react';
import AppHeader from "../../components/app-header/app-header";
import styles from './ingredient-info.module.css';
import {useSelector} from "react-redux";

function IngredientInfo () {
		const viewedIngredient = useSelector(state => state.viewedIngredient.viewedIngredient);

		return (
				<>
						<AppHeader/>

						<main className={styles.info}>
								<span className="text text_type_main-large">Детали ингредиента</span>

								<div className={styles.innerInfo}>
										<img src={viewedIngredient.image} alt='' className={styles.imageModal}/>

										<div className="text text_type_main-medium mt-4">{viewedIngredient.name}</div>

										<div className={styles.PFC}>
												<div className="">
														<div className="text text_type_main-small text_color_inactive">
																Калории, ккал
														</div>

														<div className="text text_type_digits-default text_color_inactive">
																{viewedIngredient.calories}
														</div>
												</div>

												<div className="">
														<div className="text text_type_main-small text_color_inactive">
																Белки, г
														</div>

														<div className="text text_type_digits-default text_color_inactive">
																{viewedIngredient.proteins}
														</div>
												</div>

												<div className="">
														<div className="text text_type_main-small text_color_inactive">
																Жиры, г
														</div>

														<div className="text text_type_digits-default text_color_inactive">
																{viewedIngredient.fat}
														</div>
												</div>

												<div className="">
														<div className="text text_type_main-small text_color_inactive">
																Углеводы, г
														</div>

														<div className="text text_type_digits-default text_color_inactive">
																{viewedIngredient.carbohydrates}
														</div>
												</div>
										</div>
								</div>
						</main>
				</>
		)
}

export default IngredientInfo;
