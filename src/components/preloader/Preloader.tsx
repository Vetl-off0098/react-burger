import React from "react";
import styles from "../burger-constructor/final-block/final-block.module.css";

const Preloader = () => {
  return (
    <div className={styles.isLoading}>
      <div className={styles.overlay}>
      </div>

      <div className={styles.loadText}>
        <p className="text text_type_main-large">Загрузка...</p>
      </div>
    </div>
  )
}

export default Preloader;
