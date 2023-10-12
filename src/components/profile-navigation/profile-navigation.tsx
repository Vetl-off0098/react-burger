import React from "react";
import styles from "./profile-navigation.module.css";
import {NavLink} from "react-router-dom";
import {fetchLogOut} from "../../services/async-actions/logOut";
import {useDispatch} from "../../hook/useTypedDispatch";

const ProfileNavigation = () => {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(fetchLogOut())
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

      <div className={styles.description}>
        <p className="text text_type_main-small text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
    </article>
  )
}

export default ProfileNavigation;
