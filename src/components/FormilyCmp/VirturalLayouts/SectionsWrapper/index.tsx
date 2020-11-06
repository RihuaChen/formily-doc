import React from 'react';
import { createVirtualBox } from '@formily/antd';
import styles from './style.less';

const SectionWrapper = createVirtualBox('section-wrapper', (props) => {
  const { children, title, name, descriptor } = props;

  if (name) {
    return (
      <div id={name} className={styles.customLayout}>
        <span className={styles.title}>{title}</span>
        {descriptor || null}
        {children}
      </div>
    );
  }

  return (
    <div className={styles.customLayout}>
      <span className={styles.title}>{title}</span>
      {descriptor || null}
      {children}
    </div>
  );
});

export { SectionWrapper };
