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
  removeBurgerIngredientByIdAction, setBurgerIngredientsArrayAction,
} from "../../services/reducers/burgerIngredients";
import {useDrop} from "react-dnd";
import DraggableConstructorElement from "./draggeble-constructor-element/draggeble-constructor-element";
import {closestCenter, DndContext, DragOverlay} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import DefaultConstructorElement from "../defaultConstructorElement/defaultConstructorElement";

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
    if (burger.length && burger.filter(el => el.type === 'bun').length) {
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
      const burgerBun = burger.find(el => el.type === 'bun');

      if (burger.find(el => el._id === item._id)) {
        return
      } else {
        if (burger.length && burgerBun) {
          dispatch(resetCountIngredientAction(burger.find(el => el.count === 2 && el.type === 'bun')));
          dispatch(removeBurgerIngredientByIdAction(burger.find(el => el.count === 2 && el.type === 'bun').burgerIngredientId))
        }

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
    setActiveId(null);

    const { active, over } = event;

    if (active.id === over.id) {
      return;
    }

    setOtherIngr((ingrs) => {
      const oldIndex = ingrs.findIndex(i => i.burgerIngredientId === active.id);
      const newIndex = ingrs.findIndex(i => i.burgerIngredientId === over.id);

      const newBurger = [burger.find(el => el.type === 'bun'), ...arrayMove(ingrs, oldIndex, newIndex)];
      dispatch(setBurgerIngredientsArrayAction(newBurger))

      return arrayMove(ingrs, oldIndex, newIndex);
    });
  }

  return(
    <section ref={dropTarget} className={styles.constructorAndButton}>
      <div className={styles.burgerConstructor}>
        {Object.entries(bun).length ? <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`ml-3 ${isHover ? styles.isDrop : ''}`}
        /> : <DefaultConstructorElement
          type={"top"}
          title={'Добавьте булку в конструктор'}
          extraClass={`${isHover ? styles.isDrop : ''}`}
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
        </div> : <DefaultConstructorElement
          type={"main"}
          title={'Добавьте начинку в конструктор'}
          extraClass={`${isHover ? styles.isDrop : ''}`}
        />}

        {Object.entries(bun).length ? <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={`ml-3 ${isHover ? styles.isDrop : ''}`}
        /> : <DefaultConstructorElement
          type={"bottom"}
          title={'Добавьте булку в конструктор'}
          extraClass={`${isHover ? styles.isDrop : ''}`}
        />}
      </div>

      <FinalBlock/>
    </section>
  )
}

export default BurgerConstructor;
