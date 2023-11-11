import React from "react";
import styles from "./profile-navigation.module.css";
import {NavLink, useLocation} from "react-router-dom";
import {useDispatch} from "../../hook/useTypedDispatch";
import {logoutUser} from "../../services/actions/userActions";

const ProfileNavigation = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const logOut = () => {
    dispatch(logoutUser());
  }

  return (
    <article className={styles.leftPart}>
      <nav className={styles.navigation}>
        <NavLink to="/profile/profile">
          <p className={`text text_type_main-medium ${styles.buttonLink}`}>
            Профиль
          </p>
        </NavLink>

        <NavLink to="/profile/orders">
          <p className={`text text_type_main-medium ${styles.buttonLink}`}>
            История заказов
          </p>
        </NavLink>

        <div onClick={logOut} className={styles.logoutBtn}>
          <p className={`text text_type_main-medium ${styles.buttonLink}`}>
            Выход
          </p>
        </div>
      </nav>

      <div className={`${styles.description} mt-20`}>
        <p className="text text_type_main-small text_color_inactive">
          {location.pathname === '/profile/profile'
            ? 'В этом разделе вы можете изменить свои персональные данные'
            : 'В этом разделе вы можете посмотреть свою историю заказов'
          }
        </p>
      </div>
    </article>
  )
}

export default ProfileNavigation;
