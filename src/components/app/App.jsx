import React from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import api from '../../utils/api';
import checkResponse from '../../utils/check-response';
import { BurgerConstructorContext } from '../../services/appContext';

function App() {
  React.useEffect(() => {
    setIsLoading(true);
    fetch(`${api}/ingredients`)
      .then(data => checkResponse(data))
      .then(response => {
        response.data = response.data.map(el => {
          return {
            ...el,
            count: 0
          }
        })
        response.data.find(el => el.type === 'bun').count = 2
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

  // const checkResponse = (res) => {
  //   return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  // };

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

  // function reducer(state, action) {
  //   switch (action.type) {
  //     case "increment":
  //       return {
  //         count: state.count + 1
  //       };
  //     case "decrement":
  //       return { count: state.count - 1 };
  //     default:
  //       throw new Error(`Wrong type of action: ${action.type}`);
  //   }
  // }

  const pushIngredient = (item) => {
    const ingredient = items.find(el => el._id === item._id);

    if (ingredient.type === 'bun') {
      if (ingredient.count === 2) {
        return
      } else {
        const newArr = items;
        if (newArr.find(el => el.count === 2 && el.type === 'bun')) {
          newArr.find(el => el.count === 2 && el.type === 'bun').count = 0;
          setItems(newArr)
        }
        ingredient.count = 2;
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

            <BurgerConstructorContext.Provider value={burger1}>
              <BurgerConstructor burger={burger1} deleteIngredient={deleteIngredient}/>
            </BurgerConstructorContext.Provider>
          </section>
        </main>
      </div>)
      :
      (<p>Загрузка...</p>)}
    </>
  );
}

export default App;
