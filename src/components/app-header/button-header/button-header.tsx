import React, {FC, ReactNode} from 'react';
import styles from './button-header.module.css';

interface IButtonHeaderProps {
  children: ReactNode[]
}

const ButtonHeader:FC<IButtonHeaderProps> = ({children}) => {
  return (
    <button className={styles.button}>
      { children[0] }
      { children[1] }
    </button>
  )
}

export default ButtonHeader;
