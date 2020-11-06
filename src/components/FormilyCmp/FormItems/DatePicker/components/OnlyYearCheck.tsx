import React from 'react';
import { Checkbox } from 'antd';
import { useIntl } from 'umi';

interface OnlyYearCheckProps {
  value: boolean;
  disabled: boolean;
  labelText: string;
  onChange: (value: boolean) => void;
}
const OnlyYearCheck = (props: OnlyYearCheckProps) => {
  const intl = useIntl();
  const handleChange = (e: any) => {
    props.onChange(e.target.checked);
  };
  return (
    <span>
      <Checkbox disabled={props.disabled} checked={props.value} onChange={(e) => handleChange(e)}>
        {props.labelText ? props.labelText : intl.formatMessage({ id: 'Oic.onlyYear.label' })}
      </Checkbox>
    </span>
  );
};
export default OnlyYearCheck;
