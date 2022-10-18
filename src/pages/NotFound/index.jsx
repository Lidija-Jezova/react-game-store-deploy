import React from 'react';
import styles from './NotFound.module.scss'

const NotFound = () => {
  return (
      <div className={styles.page}>
        <span className={styles.code}>404</span>
        <span className={styles.text}>Page not found</span>
      </div>
  );
};

export default NotFound;