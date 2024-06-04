import React from 'react';

import styles from './NotFoundBlock.module.scss'

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>:(</span>
        <br />
        Ничего не найдено
      </h1>
      <h2>Эта страница не работает</h2>
    </div>
  );
}

export default NotFoundBlock;
