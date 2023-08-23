import React from 'react';
import styles from './draggeble-constructor-element.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import vector from '../../../images/Vector.png'
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';

const DraggableConstructorElement = ({ingredientInfo, deleteElement}) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		setActivatorNodeRef
	} = useSortable({id: ingredientInfo.burgerIngredientId});
	const dragStyle = {
		transition,
		transform: CSS.Transform.toString(transform),
	}

	return (
		<div
			ref={setNodeRef}
			style={{dragStyle}}
			{...attributes}
			className={styles.moverAndElement}
		>
			<img src={vector} alt="" className={styles.image} ref={setActivatorNodeRef} {...listeners}/>

			<ConstructorElement
				text={ingredientInfo.name}
				price={ingredientInfo.price}
				thumbnail={ingredientInfo.image}
				extraClass={`ml-3 ${styles.constructorElement}`}
				handleClose={() => deleteElement(ingredientInfo)}
			/>
		</div>
	)
}

export default DraggableConstructorElement;
