import React, {FC, ReactNode} from 'react';
import styles from './modal.module.css';
import ModalOverlay from "./modal-overlay/modal-overlay";
import ReactDOM from "react-dom";

interface IModalProps {
  onClose: () => void,
  children?: ReactNode,
}

const Modal: FC<IModalProps> = ({ onClose, children }) => {
  React.useEffect(() => {
    document.addEventListener('keydown', closeModal)

    return () => {
      document.removeEventListener('keydown', closeModal);
    }
  });

  const ECK_KEYCODE: number = 27;

  const closeModal = (keyPress: KeyboardEvent | React.KeyboardEvent) => {
    if (keyPress.keyCode === ECK_KEYCODE) {
      onClose();
    }
  }

  const root = document.getElementById('root') as HTMLElement;

  return (
    ReactDOM.createPortal(
      <section className={styles.modal}>
        <ModalOverlay onClose={onClose}/>

        <div className={styles.modalBlock}>
          <div data-testid="modal-close" className={styles.closeModal} onClick={onClose}>
            <div className={styles.stripeRight}/>

            <div className={styles.stripeLeft}/>
          </div>

          {children}
        </div>
      </section>,
      root
    )
  )
}

export default Modal;
