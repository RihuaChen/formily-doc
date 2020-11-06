import React, { useState, useEffect } from 'react';
import { Select } from 'antd';

const { Option } = Select;
interface MonthPickerProps {
  selMonth: undefined | number;
  selYear: undefined | number;
  minMonth: number | undefined;
  minYear: number | undefined;
  maxYear: number | undefined;
  maxMonth: number | undefined;
  disabled: boolean;
  placeholder: string;
  showSearch: boolean;
  onChange: (value: number, key: string) => void;
}
interface OptionProps {
  value: number;
  disabled: boolean;
}
const MonthPicker = (props: MonthPickerProps) => {
  const getAllMonthOption = () => {
    const initialMonthList: OptionProps[] = [];
    for (let i = 0; i < 12; i += 1) {
      const month = i + 1;
      const monthOpt = { value: month, disabled: false };
      initialMonthList.push(monthOpt);
    }
    return initialMonthList;
  };
  const [monthList, setMothList] = useState<OptionProps[]>(() => {
    return getAllMonthOption();
  });
  useEffect(() => {
    const { selYear, maxYear, minYear, maxMonth, minMonth } = props;
    const newMonthList: OptionProps[] = monthList.map((m) => {
      let optDisabled: boolean = false;
      if (selYear && minYear && minMonth) {
        if (selYear === minYear && m.value < minMonth) {
          optDisabled = true;
        }
      }
      if (selYear && maxYear && maxMonth) {
        if (selYear === maxYear && m.value > maxMonth) {
          optDisabled = true;
        }
      }
      return Object.assign(m, { disabled: optDisabled });
    });
    setMothList(newMonthList);
  }, [props.selYear]);
  const handleChange = (value: number) => {
    props.onChange(value, 'month');
  };
  return (
    <Select
      value={props.selMonth}
      allowClear
      showSearch={props.showSearch !== undefined ? props.showSearch : true}
      placeholder={props.placeholder ? props.placeholder : 'mm'}
      disabled={props.disabled}
      onChange={(value) => {
        handleChange(value);
      }}
      filterOption={(input: string, option: any) =>
        option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      getPopupContainer={(triggerNode: HTMLElement) => triggerNode.parentElement || document.body}
    >
      {monthList.map(({ value, disabled }) => (
        <Option value={value} key={`month${value}`} disabled={disabled}>
          {value}
        </Option>
      ))}
    </Select>
  );
};
export default MonthPicker;
