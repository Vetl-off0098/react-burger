import React, {FC} from 'react';
import styles from './draggeble-constructor-element.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import vector from '../../../images/Vector.png'
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import {IIngredient} from '../../../models/ingredient'

interface IDCEProps {
	ingredientInfo: IIngredient | undefined,
	deleteElement?: (param: IIngredient) => void
}

const DraggableConstructorElement:FC<IDCEProps> = ({ingredientInfo, deleteElement}) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		setActivatorNodeRef
		// @ts-ignore
	} = useSortable({id: ingredientInfo.burgerIngredientId});
	const dragStyle = {
		transition,
		transform: CSS.Transform.toString(transform),
	}

	const deleteHandler = (): void => {
		if (deleteElement && ingredientInfo) {
			deleteElement(ingredientInfo)
		}
	}

	return (
		<div
			ref={setNodeRef}
			// @ts-ignore
			style={{dragStyle}}
			{...attributes}
			className={styles.moverAndElement}
		>
			<img src={vector} alt="" className={styles.image} ref={setActivatorNodeRef} {...listeners}/>

			{ingredientInfo && (<ConstructorElement
				text={ingredientInfo.name}
				price={ingredientInfo.price}
				thumbnail={ingredientInfo.image}
				extraClass={`ml-3 ${styles.constructorElement}`}
				handleClose={deleteHandler}
			/>)}
		</div>
	)
}

export default DraggableConstructorElement;
