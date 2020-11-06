import React, { useState, useEffect } from 'react';
import YearPicker from '../components/year';
import MonthPicker from '../components/month';
import DayPicker from '../components/day';
import styles from './index.less';
import generateConfig from '../generate/day';
import getDaysCount from '../utils/index';

const dateFormat = generateConfig.format;
type PlaceHolderType = {
  year: string;
  month: string;
  day: string;
};
interface IndexPros {
  value: string | undefined;
  disabled: boolean;
  format?: string;
  onChange: (args: string | undefined) => void;
  minDate: string;
  maxDate: string;
  lan: string;
  UIOrder: string;
  placeholder: PlaceHolderType;
  showSearch: boolean;
  yearOrder: string;
}
const Index = (props: IndexPros) => {
  //默认日期格式
  const { format = 'DD-MM-YYYY' } = props;

  const [selYear, setSelYear] = useState<number>();
  const [selMonth, setSelMonth] = useState<number>();
  const [selDay, setSelDay] = useState<number>();
  //从minDate和maxDate中取要disabled的最小或最大年月日
  const getDisabledYearMontDay = (disabledDate: string) => {
    let disabledYear: number | undefined;
    let disabledMonth: number | undefined;
    let disabledDay: number | undefined;
    if (disabledDate) {
      const date = generateConfig.toDayjs(disabledDate, format);
      disabledYear = generateConfig.getYear(date);
      disabledMonth = generateConfig.getMonth(date) + 1;
      disabledDay = generateConfig.getDate(date);
    }
    const result = [disabledYear, disabledMonth, disabledDay];
    return result;
  };
  const [minYear, minMonth, minDay] = getDisabledYearMontDay(props.minDate);
  const [maxYear, maxMonth, maxDay] = getDisabledYearMontDay(props.maxDate);
  const { disabled, placeholder, yearOrder, showSearch, lan } = props;
  //从placeholder中解构出年月日的placeholder
  const {
    year: yearPlaceHolder,
    month: monthPlaceHolder,
    day: dayPlaceHolder,
  }: PlaceHolderType = placeholder;
  //当day的选项无效时，清空day的选项
  const clearDayWhenInvalid = (month: number | undefined, year: number | undefined) => {
    const maxDayCount = getDaysCount(month, year);
    if (selDay && selDay > maxDayCount) {
      return true;
    }
    return false;
  };
  const triggerChange = (
    selYearPara: number | undefined,
    selMonthPara: number | undefined,
    selDayPara: number | undefined,
  ) => {
    /*
  清除月的选择
  选择的年和minDate中的年一样
  并且选择的月小于minDate中的月 
   */
    if (selYearPara && minYear && selMonthPara && minMonth) {
      if (selYearPara === minYear && selMonthPara < minMonth) {
        setSelMonth(undefined);
        selMonthPara = undefined;
      }
    }
    /*
清除天的选择
选择的年月和minDate中的年月一样
并且选择的天小于minDate中的天
 */
    if (selYearPara && minYear && selMonthPara && minMonth && selDayPara && minDay) {
      if (selYearPara === minYear && minMonth === selMonthPara && selDayPara < minDay) {
        setSelDay(undefined);
        selDayPara = undefined;
      }
    }
    /*
  清除月的选择
  选择的年和maxDate中的年一样
  并且选择的月大于max中的月 
   */
    if (selYearPara && maxYear && selMonthPara && maxMonth) {
      if (selYearPara === maxYear && selMonthPara > maxMonth) {
        setSelMonth(undefined);
        selMonthPara = undefined;
      }
    }
    /*
清除天的选择
选择的年月和maxDate中的年月一样
并且选择的天大于maxDate中的天
*/
    if (selYearPara && maxYear && selMonthPara && maxMonth && selDayPara && maxDay) {
      if (selYearPara === maxYear && maxMonth === selMonthPara && selDayPara < maxDay) {
        setSelDay(undefined);
        selDayPara = undefined;
      }
    }
    const needClearDay = clearDayWhenInvalid(selMonthPara, selYearPara);
    if (needClearDay) {
      setSelDay(undefined);
      selDayPara = undefined;
    }
    let formatDate: string = '';
    if (selYearPara && selMonthPara && selDayPara) {
      const month = selMonthPara < 10 ? '0'.concat(selMonthPara.toString()) : selMonthPara;
      const day = selDayPara < 10 ? '0'.concat(selDayPara.toString()) : selDayPara;
      const newDateStr = `${selYearPara.toString()}-${month.toString()}-${day.toString()}`;
      const newDate = generateConfig.toDayjs(newDateStr);
      formatDate = dateFormat(newDate, format);
      props.onChange(formatDate);
    } else {
      props.onChange('');
    }
  };
  useEffect(() => {
    if (props.value) {
      const date = generateConfig.toDayjs(props.value, format);
      const year = generateConfig.getYear(date);
      setSelYear(year);
      const month = generateConfig.getMonth(date);
      setSelMonth(month + 1);
      const day = generateConfig.getDate(date);
      setSelDay(day);
    }
    if (props.value === undefined) {
      setSelYear(undefined);
      setSelMonth(undefined);
      setSelDay(undefined);
    }
    // else {
    //   setSelYear(undefined);
    //   setSelMonth(undefined);
    //   setSelDay(undefined);
    // }
  }, [props.value]);

  //年月日下拉框change事件
  const onChange = (selValue: number, key: string) => {
    if (key === 'year') {
      setSelYear(selValue);
      triggerChange(selValue, selMonth, selDay);
    } else if (key === 'month') {
      setSelMonth(selValue);
      triggerChange(selYear, selValue, selDay);
    } else if (key === 'day') {
      setSelDay(selValue);
      triggerChange(selYear, selMonth, selValue);
    }
  };

  //年下拉框属性
  const yearChildProps = {
    selYear,
    minYear,
    maxYear,
    onChange,
    lan,
    placeholder: yearPlaceHolder,
    disabled,
    showSearch,
    yearOrder,
  };
  //月下拉框属性
  const monthChildProps = {
    selMonth,
    selYear,
    minYear,
    maxYear,
    minMonth,
    maxMonth,
    placeholder: monthPlaceHolder,
    disabled,
    showSearch,
    onChange,
  };
  //日下拉框的属性
  const dayChildProps = {
    selDay,
    selYear,
    selMonth,
    disabled,
    minYear,
    maxYear,
    minMonth,
    maxMonth,
    minDay,
    maxDay,
    placeholder: dayPlaceHolder,
    showSearch,
    onChange,
  };
  const UIRender = (UIOrder: string | undefined) => {
    if (UIOrder) {
      return (
        <>
          {UIOrder.split('-').map((f) => {
            if (f === 'YYYY') {
              return (
                <div key="year">
                  <YearPicker {...yearChildProps} />
                </div>
              );
            }
            if (f === 'MM') {
              return (
                <div key="month">
                  <MonthPicker {...monthChildProps} />
                </div>
              );
            }
            if (f === 'DD') {
              return (
                <div key="day">
                  <DayPicker {...dayChildProps} />
                </div>
              );
            }
            return '';
          })}
        </>
      );
    }
    return (
      <>
        <div>
          <YearPicker {...yearChildProps} />
        </div>
        <div>
          <MonthPicker {...monthChildProps} />
        </div>
        <div>
          <DayPicker {...dayChildProps} />
        </div>
      </>
    );
  };
  return <div className={styles.datePickerWrap}>{UIRender(props.UIOrder)}</div>;
};
export default Index;
