import React from 'react';
import { createControllerBox } from '@formily/antd';
import { v4 as uuidv4 } from 'uuid';
import styles from './style.less';
// const NestedLayout = (children: ReactElement) => {
//   return <div style={{ gridColumnStart: 'span 2' }}>{children}</div>;
// };

const GridLayout = createControllerBox('g-layout', ({ children, schema }) => {
  return (
    <div className={styles.gridLayoutWrapper}>
      <div
        className={styles.gridLayout}
        style={{ display: schema['x-component-props']?.labelAlign === 'top' ? `grid'` : '' }}
      >
        {/*<span className={styles.title}> {schema['x-component-props']?.title}</span>*/}
        {/*{children}*/}
        {children.map((el) => {
          if (el.props.schema['x-component'] === 'g-layout') {
            return (
              <div key={uuidv4()} style={{ gridColumnStart: 'span 2' }}>
                {el}
              </div>
            );
          }
          return el;
        })}
      </div>
    </div>
  );
});

export { GridLayout };
