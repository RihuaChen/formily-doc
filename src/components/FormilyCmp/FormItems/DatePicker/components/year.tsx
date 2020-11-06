import React, { useState } from 'react';
import { Select } from 'antd';
import dayjs from 'dayjs';
import generateConfig from '../generate/day';

const { Option } = Select;
interface YearPickerProps {
  selYear: undefined | number;
  onChange: (value: number, key: string) => void;
  minYear?: number | undefined;
  maxYear: number | undefined;
  lan: string | undefined;
  placeholder: string;
  disabled: boolean;
  showSearch: boolean;
  yearOrder: string;
}
interface OptionProps {
  value: number;
  text: number;
  disabled: boolean;
}
const YearPicker = (props: YearPickerProps) => {
  const getAllYearOption = (
    minYear: undefined | number,
    maxYear: undefined | number,
    yearOrder: undefined | string,
  ) => {
    const currentYearText =
      props.lan === 'th-TH'
        ? generateConfig.getYear(dayjs()) + 543
        : generateConfig.getYear(dayjs());
    const currentYearValue = generateConfig.getYear(dayjs());
    let initialYearList: OptionProps[] = [];
    for (let i = -70; i < 120; i += 1) {
      const yearValue = currentYearValue - i;
      const yearText = currentYearText - i;
      const optDisabled: boolean = false;
      const yearOpt = { value: yearValue, disabled: optDisabled, text: yearText };
      // if (minYear && yearValue >= minYear && maxYear && yearValue <= maxYear) {
      //   initialYearList.push(yearOpt);
      // }
      // if (minYear && yearValue < minYear) {
      //   optDisabled = true;
      // }
      // if () {
      //   optDisabled = true;
      // }
      // const yearOpt = { value: yearValue, disabled: optDisabled, text: yearText };
      initialYearList.push(yearOpt);
    }
    if (minYear) {
      initialYearList = initialYearList.filter((el) => minYear && el.value >= minYear);
    }
    if (maxYear) {
      initialYearList = initialYearList.filter((el) => maxYear && el.value <= maxYear);
    }
    if (yearOrder === 'smallToBig') {
      initialYearList.reverse();
    }
    return initialYearList;
  };
  const [yearList] = useState<OptionProps[]>(() => {
    return getAllYearOption(props.minYear, props.maxYear, props.yearOrder);
  });
  // useEffect(() => {
  //   const { selYear, minYear } = props;
  //   const newYearList: OptionProps[] = yearList.map((y) => {
  //     if (selYear && minYear) {
  //       let optDisabled: boolean  = y.value < minYear ? true : false;
  //       return Object.assign(y, { disabled: optDisabled });
  //     }
  //     return y;
  //   });
  //   setYearList(newYearList);
  // }, [props.selYear]);
  const handleChange = (value: number) => {
    props.onChange(value, 'year');
  };
  return (
    <Select
      value={props.selYear}
      allowClear
      showSearch={props.showSearch !== undefined ? props.showSearch : true}
      placeholder={props.placeholder ? props.placeholder : 'yyyy'}
      disabled={props.disabled}
      onChange={(value) => {
        handleChange(value);
      }}
      filterOption={(input: string, option: any) =>
        option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      getPopupContainer={(triggerNode: HTMLElement) => triggerNode.parentElement || document.body}
    >
      {yearList.map(({ value, disabled, text }) => (
        <Option value={value} key={`month${value}`} disabled={disabled}>
          {text}
        </Option>
      ))}
    </Select>
  );
};
export default YearPicker;
