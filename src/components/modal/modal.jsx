import React from 'react';
import styles from './modal.module.css';
import ModalOverlay from "./modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

function Modal(props) {
  React.useEffect(() => {
    document.addEventListener('keydown', closeModal)

    return () => {
      document.removeEventListener('keydown', closeModal);
    }
  });

  const ECK_KEYCODE = 27

  const closeModal = (keyPress) => {
    if (keyPress.keyCode === ECK_KEYCODE) {
      props.onClose();
    }
  }

  const root = document.getElementById('root');

  return (
    ReactDOM.createPortal(
      <section className={styles.modal}>
        <ModalOverlay onClose={props.onClose}/>

        <div className={styles.modalBlock}>
          <div className={styles.closeModal} onClick={props.onClose}>
            <div className={styles.stripeRight}/>

            <div className={styles.stripeLeft}/>
          </div>

          {props.children}
        </div>
      </section>,
      root
    )
  )
}

Modal.propTypes = {
  onClose: PropTypes.func,
}

export default Modal;
