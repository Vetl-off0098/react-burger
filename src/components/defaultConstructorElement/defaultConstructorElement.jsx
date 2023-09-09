import React from 'react';
import styles from "../defaultConstructorElement/defaultConstructorElement.module.css";

const DefaultConstructorElement = ({type, title, extraClass}) => {
		return (
				<div className={`${styles.defaultElement} defaultElement__${type} ${extraClass}`}>
						<span className={styles.title}>{title}</span>
				</div>
		)
}

export default DefaultConstructorElement;
