import React from 'react';
import { Checkbox } from 'antd';

interface OnlyYearCheckProps {
  value: boolean;
  disabled: boolean;
  labelText: string;
  onChange: (value: boolean) => void;
}
const CheckBox = (props: OnlyYearCheckProps) => {
  const handleChange = (e: any) => {
    props.onChange(e.target.checked);
  };
  return (
    <span>
      <Checkbox disabled={props.disabled} checked={props.value} onChange={(e) => handleChange(e)}>
        {props.labelText ? props.labelText : ''}
      </Checkbox>
    </span>
  );
};
export default CheckBox;
