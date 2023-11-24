import React from 'react';
import {Outlet} from 'react-router-dom';
import styles from "./profile-layout.module.css";
import ProfileNavigation from "../profile-navigation/profile-navigation";

function ProfileLayout() {
  return (
    <main className={`${styles.container}`}>
      <section className={styles.content}>
        <ProfileNavigation/>
        <Outlet />
      </section>
    </main>
  );
}

export default ProfileLayout;
