import React from 'react';
import OnlyYearCheck from '../components/OnlyYearCheck';

interface OnlyYearCheckBoxPros {
  value: boolean;
  disabled: boolean;
  labelText: string;
  onChange: (args: boolean) => void;
}
const Index = (props: OnlyYearCheckBoxPros) => {
  const onChange = (value: boolean) => {
    props.onChange(value);
  };
  return <OnlyYearCheck {...props} onChange={onChange} />;
};
export default Index;
