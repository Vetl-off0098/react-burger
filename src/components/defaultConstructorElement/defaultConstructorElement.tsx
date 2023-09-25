import React, {FC} from 'react';
import styles from "../defaultConstructorElement/defaultConstructorElement.module.css";

interface IDCEProps {
	type: string,
	title: string,
	extraClass: any
}

const DefaultConstructorElement: FC<IDCEProps> = ({type, title, extraClass}) => {
	return (
		<div className={`${styles.defaultElement} defaultElement__${type} ${extraClass}`}>
			<span className={styles.title}>{title}</span>
		</div>
	)
}

export default DefaultConstructorElement;
