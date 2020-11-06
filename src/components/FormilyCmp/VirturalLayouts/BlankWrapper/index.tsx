import React from 'react';
import { createVirtualBox } from '@formily/antd';
// import styles from './style.less';

const BlankWrapper = createVirtualBox('blank-wrapper', ({ children }) => {
  return <> {children}</>;
});

export { BlankWrapper };
