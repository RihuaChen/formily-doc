```ts
import React from 'react';
import { Spin, Input } from 'antd';

const SpinInput = (props: any) => {
  const { value, loading, props: cmpProps } = props;
  return (
    <Spin spinning={loading} delay={100}>
      <Input value={value} {...cmpProps['x-component-props']} />
    </Spin>
  );
};

SpinInput.isFieldComponent = true;

export default SpinInput;
```
