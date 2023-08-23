import React, {useEffect, useState} from 'react';
import styles from './burger-constructor.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import FinalBlock from './final-block/final-block';
import {useDispatch, useSelector} from "react-redux";
import {
  decreaseCountIngredientAction, increaseCountIngredientAction,
  resetCountIngredientAction,
  setCountIngredientBunAction
} from "../../services/reducers/ingredientsReducer";
import {
  addBurgerIngredientsAction,
  removeBurgerIngredientByIdAction,
} from "../../services/reducers/burgerIngredients";
import {useDrop} from "react-dnd";
import DraggableConstructorElement from "./draggeble-constructor-element/draggeble-constructor-element";
import {closestCenter, DndContext, DragOverlay} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const burger = useSelector(state => state.burger.burger);
  const ingredients = useSelector(state => state.ingredients.ingredients);
  const [bun, setBun] = useState({});
  const [otherIngrs, setOtherIngr] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [{isHover}, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      increaseIngredient(item.item);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  useEffect(() => {
    if (burger.filter(el => el.type === 'bun').length) {
      setBun(
        burger.find(el => el.type === 'bun')
      );
    }

    setOtherIngr([
      ...burger.filter(el => el.type !== 'bun')
    ])
  }, [burger]);

  const increaseIngredient = (item) => {
    if (item.type === 'bun') {
      if (burger.find(el => el._id === item._id)) {
        return
      } else {
        dispatch(resetCountIngredientAction(burger.find(el => el.count === 2 && el.type === 'bun')));
        dispatch(removeBurgerIngredientByIdAction(burger.find(el => el.count === 2 && el.type === 'bun').burgerIngredientId))

        dispatch(setCountIngredientBunAction(item))
      }
    } else {
      dispatch(increaseCountIngredientAction(item));
    }

    dispatch(addBurgerIngredientsAction({...ingredients.find(el => el._id === item._id), burgerIngredientId: Date.now()}));
  }

  const deleteElement = (item) => {
    dispatch(decreaseCountIngredientAction(item));
    dispatch(removeBurgerIngredientByIdAction(item.burgerIngredientId));
  }

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  }

  const onDragEnd = (event) => {
    console.log('onDragEnd', event);
    setActiveId(null);

    const { active, over } = event;

    if (active.id === over.id) {
      return;
    }
    setOtherIngr((ingrs) => {
      const oldIndex = ingrs.findIndex(i => i.burgerIngredientId === active.id);
      const newIndex = ingrs.findIndex(i => i.burgerIngredientId === over.id);
      return arrayMove(ingrs, oldIndex, newIndex);
    })
  }

  return(
    <section ref={dropTarget} className={styles.constructorAndButton}>
      <div className={styles.burgerConstructor}>
        {bun && <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`ml-3 ${isHover ? styles.isDrop : ''}`}
        />}

        {otherIngrs.length ? <div className={`${styles.burgerConstructor} ${styles.burgerConstructor__main}`}>
          <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={onDragEnd}>
            <SortableContext items={otherIngrs} strategy={verticalListSortingStrategy}>
              {otherIngrs.map((item, index) => (
                <DraggableConstructorElement
                  key={item.burgerIngredientId}
                  ingredientInfo={item}
                  ingredientIndex={index}
                  deleteElement={deleteElement}
                />
              ))}
            </SortableContext>

            <DragOverlay>
              {activeId ? (
                <DraggableConstructorElement
                  ingredientInfo={burger.find(el => el.burgerIngredientId === activeId)}
                />
              ): null}
            </DragOverlay>
          </DndContext>
        </div> : ''}

        {bun && <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`ml-3 ${isHover ? styles.isDrop : ''}`}
        />}
      </div>

      <FinalBlock/>
    </section>
  )
}

export default BurgerConstructor;
