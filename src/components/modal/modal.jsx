import React from 'react';
import styles from './modal.module.css';

function Modal(props) {
  return (
    <section className={styles.modal}>
      <section className={styles.overlay} onClick={props.onClose}>
      </section>

      <div className={styles.modalBlock}>
        <div className={styles.closeModal} onClick={props.onClose}>
          <div className={styles.stripeRight}/>

          <div className={styles.stripeLeft}/>
        </div>

        {props.children}
      </div>
    </section>
  )
}

export default Modal;
