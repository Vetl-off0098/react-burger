import React from 'react';
import styles from './modal.module.css';

function Modal(props) {
  return (
    <section className={styles.modal}>
      <section className={styles.overlay} onClick={props.onClose}>
      </section>

      <div className={styles.modalBlock}>
        <span className={styles.closeModal} onClick={props.onClose}>Закрыть</span>
        {props.children}
      </div>
    </section>
  )
}

export default Modal;
