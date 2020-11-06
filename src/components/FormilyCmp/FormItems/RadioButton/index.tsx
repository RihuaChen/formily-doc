import React from 'react';
import { Radio } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const FormilyRadioBtn = (props: {
  dataSource: [{ value: string; label: string }];
  value: any;
  disabled: boolean;
  onChange: (arg0: string) => void;
}) => {
  return (
    <Radio.Group
      buttonStyle="outline"
      onChange={(e) => props.onChange(e.target.value)}
      defaultValue={props.value}
      value={props.value}
      disabled={props.disabled}
    >
      {props.dataSource.map((ele) => {
        return (
          <Radio.Button key={uuidv4()} value={ele.value}>
            {ele.label}
          </Radio.Button>
        );
      })}
    </Radio.Group>
  );
};

export { FormilyRadioBtn as RadioButton };
