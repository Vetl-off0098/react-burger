import React from 'react';
import styles from './ingredient-info.module.css';
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

function IngredientInfo () {
		return (
				<>
						<main className={styles.info}>
								<section className={styles.centerBlock}>
										<IngredientDetails />
								</section>
						</main>
				</>
		)
}

export default IngredientInfo;
