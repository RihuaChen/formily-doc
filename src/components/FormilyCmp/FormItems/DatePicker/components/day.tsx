import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import getDaysCount from '../utils/index';

const { Option } = Select;
interface DayPickerProps {
  selDay: undefined | number;
  selYear: undefined | number;
  selMonth: undefined | number;
  minDay: number | undefined;
  minMonth: number | undefined;
  minYear: number | undefined;
  maxDay: number | undefined;
  maxMonth: number | undefined;
  maxYear: number | undefined;
  disabled: boolean;
  placeholder: string;
  showSearch: boolean;
  onChange: (value: number, key: string) => void;
}
interface OptionProps {
  value: number;
  disabled: boolean;
}
const DayPicker = (props: DayPickerProps) => {
  const getAllDaysOptions = () => {
    const initialDayList: OptionProps[] = [];
    for (let i = 0; i < 31; i += 1) {
      const day = { value: i + 1, disabled: false };
      initialDayList.push(day);
    }
    return initialDayList;
  };
  const [dayList, setDayList] = useState<OptionProps[]>(() => {
    return getAllDaysOptions();
  });
  useEffect(() => {
    const getNewDaysList = (list: OptionProps[], days: number) => {
      let newDaysList: OptionProps[] = [...list];
      if (days === 28) {
        newDaysList = newDaysList.filter(
          (opt) => opt.value !== 29 && opt.value !== 30 && opt.value !== 31,
        );
      } else if (days === 29) {
        newDaysList = newDaysList.filter((opt) => opt.value !== 30 && opt.value !== 31);
        if (!newDaysList.find((opt) => opt.value === 29)) {
          newDaysList.push({ value: 29, disabled: false });
        }
      } else if (days === 30) {
        newDaysList = newDaysList.filter((opt) => opt.value !== 31);
        if (!newDaysList.find((opt) => opt.value === 29)) {
          newDaysList.push({ value: 29, disabled: false });
        }
        if (!newDaysList.find((opt) => opt.value === 30)) {
          newDaysList.push({ value: 30, disabled: false });
        }
      } else if (days === 31) {
        if (!newDaysList.find((opt) => opt.value === 29)) {
          newDaysList.push({ value: 29, disabled: false });
        }
        if (!newDaysList.find((opt) => opt.value === 30)) {
          newDaysList.push({ value: 30, disabled: false });
        }
        if (!newDaysList.find((opt) => opt.value === 31)) {
          newDaysList.push({ value: 31, disabled: false });
        }
      }
      return newDaysList;
    };
    const { selYear, selMonth, minYear, minMonth, minDay, maxYear, maxMonth, maxDay } = props;
    const days = getDaysCount(selMonth, selYear);
    const newDaysList = getNewDaysList(dayList, days);
    const resultDaysList = newDaysList.map((d) => {
      let optDisabled: boolean = false;
      if (selYear && minYear && minMonth && selMonth && minDay) {
        if (selYear === minYear && minMonth === selMonth && d.value < minDay) {
          optDisabled = true;
        }
      }

      if (selYear && maxYear && maxMonth && selMonth && maxDay) {
        if (selYear === maxYear && maxMonth === selMonth && d.value > maxDay) {
          optDisabled = true;
        }
      }
      return Object.assign(d, { disabled: optDisabled });
    });
    // clearWhenSelDayIsInvalid(resultDaysList.length)
    setDayList(resultDaysList);
  }, [props.selYear, props.selMonth]);
  const handleChange = (value: number) => {
    props.onChange(value, 'day');
  };
  return (
    <Select
      allowClear
      showSearch={props.showSearch !== undefined ? props.showSearch : true}
      value={props.selDay}
      placeholder={props.placeholder ? props.placeholder : 'dd'}
      disabled={props.disabled}
      onChange={(value) => {
        handleChange(value);
      }}
      filterOption={(input: string, option: any) =>
        option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      getPopupContainer={(triggerNode: HTMLElement) => triggerNode.parentElement || document.body}
    >
      {dayList.map(({ value, disabled }) => (
        <Option value={value} key={`month${value}`} disabled={disabled}>
          {value}
        </Option>
      ))}
    </Select>
  );
};
export default DayPicker;
