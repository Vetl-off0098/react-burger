import React from 'react';
import styles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ButtonHeader from "./button-header/button-header";

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
                <ButtonHeader>
                  <BurgerIcon type={ display.visible === 'burgerConstructor' ? 'primary' : 'secondary' } />
                  <p className={`text text_type_main-default ${display.visible === 'burgerConstructor' ? 'standartText' : 'secondaryText'}`}>
                    Конструктор
                  </p>
                </ButtonHeader>
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
                  <ProfileIcon type='primary' />
                  <p className='text text_type_main-default standartText'>
                    Личный кабинет
                  </p>
                </ButtonHeader>
              </li>

              <li>
                <ButtonHeader>
                  <ProfileIcon type={ display.visible === 'userArea' ? 'primary' : 'secondary' } />
                  <p className={`text text_type_main-default ${display.visible === 'userArea' ? 'standartText' : 'secondaryText'}`}>
                    Личный кабинет
                  </p>
                </ButtonHeader>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default AppHeader;
