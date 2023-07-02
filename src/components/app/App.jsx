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
        setItems(response.data);
        setIsLoading(false);
      })
      .catch(e => {
        console.error(e);
        setIsLoading(false);
      })

  }, []);

  const burger = {
    bun: {
      id: 1,
      name:  'Краторная булка N-200i',
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
    },
    burgerMain: [
      {
        id: 1,
        name: 'Соус традиционный галактический',
        price: 15,
        image: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
      },
      {
        id: 2,
        name: 'Мясо бессмертных моллюсков Protostomia',
        price: 1337,
        image: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
      },
      {
        id: 3,
        name: 'Плоды Фалленианского дерева',
        price: 874,
        image: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
      },
      {
        id: 4,
        name: 'Хрустящие минеральные кольца',
        price: 300,
        image: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
      },
      {
        id: 5,
        name: 'Хрустящие минеральные кольца',
        price: 300,
        image: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
      }
    ]
  };

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [burger1, setBurger] = React.useState(burger);

  const pushIngredient = (item) => {
    if (item.type === 'bun') {
      setBurger({...burger1, bun: item})
    } else {
      const newArr = burger1.burgerMain;
      newArr.push(item);
      setBurger({...burger1, burgerMain: newArr})
    }
  };

  const deleteIngredient = item => {
    const indexElement = burger1.burgerMain.findIndex(el => el.id === item.id);
    const newArr = burger1.burgerMain;
    newArr.splice(indexElement, 1);
    setBurger({...burger1, burgerMain: newArr});
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
