import React from 'react';
import PropTypes from 'prop-types';
import styles from './button-header.module.css';

function ButtonHeader(props) {
  return (
    <button className={styles.button}>
      { props.children[0] }
      { props.children[1] }
    </button>
  )
}

ButtonHeader.propTypes = {
  children: PropTypes.any
}

export default ButtonHeader;
