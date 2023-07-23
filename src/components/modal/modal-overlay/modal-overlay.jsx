import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from "prop-types";

function ModalOverlay(props) {
  return (
    <section className={styles.overlay} onClick={props.onClose}>
    </section>
  )
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
}

export default ModalOverlay;
