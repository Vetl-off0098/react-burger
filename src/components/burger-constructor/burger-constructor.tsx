import React, {useEffect, useState} from 'react';
import styles from './burger-constructor.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import FinalBlock from './final-block/final-block';
import {
  decreaseCountIngredientAction, increaseCountIngredientAction,
  resetCountIngredientAction,
  setCountIngredientBunAction
} from "../../services/actions/ingredientsAction";
import {
  addBurgerIngredientsAction,
  removeBurgerIngredientByIdAction, setBurgerIngredientsArrayAction,
} from "../../services/actions/burgerIngredientsActions";
import {useDrop} from "react-dnd";
import DraggableConstructorElement from "./draggeble-constructor-element/draggeble-constructor-element";
import {closestCenter, DndContext, DragOverlay} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import DefaultConstructorElement from "../defaultConstructorElement/defaultConstructorElement";
import {useTypedSelector} from "../../hook/useTypedSelector";
import {IIngredient} from '../../models/ingredient'
import {useDispatch} from "../../hook/useTypedDispatch";

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const burger = useTypedSelector((state) => state.burger.burger);
  const ingredients = useTypedSelector(state => state.ingredients.ingredients);

  const [bun, setBun] = useState<IIngredient | null>(null);
  const [otherIngrs, setOtherIngr] = useState<Array<IIngredient>>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const [{isHover}, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: any) {
      increaseIngredient(item.item);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  useEffect(() => {
    if (burger.length && burger.filter(el => el.type === 'bun').length) {
      let newBun = burger.find(el => el.type === 'bun');
      if (newBun) setBun(newBun);
    }

    setOtherIngr([
      ...burger.filter(el => el.type !== 'bun')
    ])
  }, [burger]);

  const increaseIngredient = (item: IIngredient) => {
    if (item.type === 'bun') {
      const burgerBun = burger.find(el => el.type === 'bun');

      if (burger.find(el => el._id === item._id)) {
        return
      } else {
        if (burger.length && burgerBun) {
          let newBun = burger.find(el => el.count === 2 && el.type === 'bun');
          if (newBun && newBun.burgerIngredientId) {
            dispatch(resetCountIngredientAction(newBun));
            dispatch(removeBurgerIngredientByIdAction(newBun.burgerIngredientId))
          }
        }

        dispatch(setCountIngredientBunAction(item))
      }
    } else {
      dispatch(increaseCountIngredientAction(item));
    }

    const findIngredient: IIngredient | undefined = ingredients.find(el => el._id === item._id);
    if (findIngredient) {
      dispatch(addBurgerIngredientsAction({...findIngredient, burgerIngredientId: String(Date.now())}));
    }
  }

  const deleteElement = (item: IIngredient) => {
    dispatch(decreaseCountIngredientAction(item));
    if (item?.burgerIngredientId) {
      dispatch(removeBurgerIngredientByIdAction(item.burgerIngredientId));
    }
  }

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  }

  const onDragEnd = (event: any) => {
    setActiveId(null);

    const { active, over } = event;

    if (active.id === over.id) {
      return;
    }

    const oldIndex = otherIngrs.findIndex((i: IIngredient) => i.burgerIngredientId === active.id);
    const newIndex = otherIngrs.findIndex((i: IIngredient) => i.burgerIngredientId === over.id);

    const bun: IIngredient | undefined = burger.find(el => el.type === 'bun');
    if (bun) {
      const newBurger: IIngredient[] = [bun, ...arrayMove(otherIngrs, oldIndex, newIndex)];
      if (newBurger) {
        dispatch(setBurgerIngredientsArrayAction(newBurger))
      }
    }
  }

  return(
    <section ref={dropTarget} className={styles.constructorAndButton}>
      <div className={styles.burgerConstructor}>
        {bun && Object.entries(bun).length ? <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name + ' (верх)'}
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
              {otherIngrs.map((item: IIngredient, index: number) => (
                <DraggableConstructorElement
                  key={item.burgerIngredientId}
                  ingredientInfo={item}
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

        {bun && Object.entries(bun).length ? <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name + ' (низ)'}
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
