import React from 'react';
import { Select as AntdSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';

interface IDataSourceProps {
  dataSource: {
    label: string;
    value: string;
  }[];
}

const Select = (props: SelectProps<SelectValue> & IDataSourceProps) => {
  const { dataSource, ...rest } = props;

  return (
    <AntdSelect
      {...rest}
      options={dataSource}
      getPopupContainer={(triggerNode: HTMLElement) => triggerNode.parentElement || document.body}
    />
  );
};

export default Select;
