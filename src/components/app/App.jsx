import React from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import api from '../../utils/api';

function App() {
  React.useEffect(() => {
    setIsLoading(true);
    fetch(api)
      .then(data => data.json())
      .then(response => {
        response.data = response.data.map(el => {
          return {
            ...el,
            count: 0
          }
        })
        response.data.find(el => el.type === 'bun').count = 1
        setItems(response.data);
        setBurger(prev => ({
          ...prev,
          bun: {
            ...response.data.find(el => el.type === 'bun')
          }
        }))
        setIsLoading(false);
      })
      .catch(e => {
        console.error(e);
        setIsLoading(false);
      })

  }, []);

  const burger = {
    bun: {
      // _id: 1,
      // name:  'Краторная булка N-200i',
      // price: 1255,
      // image: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
    },
    burgerMain: [
      // {
      //   id: 1,
      //   name: 'Соус традиционный галактический',
      //   price: 15,
      //   image: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
      // },
      // {
      //   id: 2,
      //   name: 'Мясо бессмертных моллюсков Protostomia',
      //   price: 1337,
      //   image: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
      // },
      // {
      //   id: 3,
      //   name: 'Плоды Фалленианского дерева',
      //   price: 874,
      //   image: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
      // },
      // {
      //   id: 4,
      //   name: 'Хрустящие минеральные кольца',
      //   price: 300,
      //   image: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
      // },
      // {
      //   id: 5,
      //   name: 'Хрустящие минеральные кольца',
      //   price: 300,
      //   image: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
      // }
    ]
  };

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [burger1, setBurger] = React.useState(burger);

  const pushIngredient = (item) => {
    const ingredient = items.find(el => el._id === item._id);

    if (ingredient.type === 'bun') {
      if (ingredient.count === 1) {
        return
      } else {
        const newArr = items;
        if (newArr.find(el => el.count === 1 && el.type === 'bun')) {
          newArr.find(el => el.count === 1 && el.type === 'bun').count = 0;
          setItems(newArr)
        }
        ingredient.count = 1;
      }
      setBurger({...burger1, bun: ingredient})
    } else {
      ingredient.count = ingredient.count + 1;

      const newArr = burger1.burgerMain;
      newArr.push(ingredient);

      setBurger({...burger1, burgerMain: newArr});
      setItems(prevState =>
        prevState.map(el => el._id === item._id ? {...el, count: ingredient.count} : el)
      )
    }
  };

  const deleteIngredient = item => {
    const indexElement = burger1.burgerMain.findIndex(el => el._id === item._id);
    const newArr = burger1.burgerMain;

    newArr.splice(indexElement, 1);
    setBurger({...burger1, burgerMain: newArr});

    const ingredient = items.find(el => el._id === item._id);
    ingredient.count = ingredient.count - 1;

    setItems(prevState =>
      prevState.map(el => el._id === item._id ? {...el, count: ingredient.count} : el)
    )
  }

  return (
    <>
      {!isLoading && items.length ? (<div className={`${styles.App}`}>
        <AppHeader/>

        <main className={`${styles.contentBlock} container mt-10` }>
          <h1 className="text text_type_main-large">Соберите бургер</h1>

          <section className={`mt-5 ${styles.ingredientsAndConstructor}`}>
            <BurgerIngredients items={items} pushIngredient={pushIngredient}/>

            <BurgerConstructor burger={burger1} deleteIngredient={deleteIngredient}/>
          </section>
        </main>
      </div>)
      :
      (<p>Загрузка...</p>)}
    </>
  );
}

export default App;
