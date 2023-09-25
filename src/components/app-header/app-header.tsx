import React from 'react';
import styles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ButtonHeader from "./button-header/button-header";
import {NavLink} from "react-router-dom";

function AppHeader() {
  const display = {
    visible: 'burgerConstructor', //orderFeed, userArea
  }
  return (
    <header className={ styles.appHeader }>
      <div className="container">
        <div className={ styles.navWrap }>
          <nav>
            <ul className={ styles.buttonsBlock }>
              <li>
                <NavLink to="/">
                  <ButtonHeader>
                    <BurgerIcon type={'secondary'} />
                    <p className={`text text_type_main-default secondaryText`}>
                      Конструктор
                    </p>
                  </ButtonHeader>
                </NavLink>
              </li>

              <li>
                <ButtonHeader>
                  <ListIcon type={ display.visible === 'orderFeed' ? 'primary' : 'secondary' } />
                  <p className={`text text_type_main-default ${display.visible === 'orderFeed' ? 'standartText' : 'secondaryText'}`}>
                    Лента заказов
                  </p>
                </ButtonHeader>
              </li>
            </ul>
          </nav>

          <Logo />

          <nav>
            <ul className={ styles.buttonsBlock }>
              <li className={ styles.hiddenBlock }>
                <ButtonHeader>
                  <ProfileIcon type='secondary' />
                  <p className='text text_type_main-default secondaryText'>
                    Личный кабинет
                  </p>
                </ButtonHeader>
              </li>

              <li>
                <NavLink to="/profile">
                  <ButtonHeader>
                    <ProfileIcon type={'secondary'} />
                    <p className={`text text_type_main-default secondaryText`}>
                      Личный кабинет
                    </p>
                  </ButtonHeader>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default AppHeader;
