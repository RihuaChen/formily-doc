import React, { useState, useEffect } from 'react';
import YearPicker from '../components/year';
import MonthPicker from '../components/month';
import styles from './index.less';
import generateConfig from '../generate/day';

const dateFormat = generateConfig.format;
type PlaceHolderType = {
  year: string;
  month: string;
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
  const { format = 'MM-YYYY' } = props;

  const [selYear, setSelYear] = useState<number>();
  const [selMonth, setSelMonth] = useState<number>();
  //从minDate和maxDate中取要disabled的最小或最大年月
  const getDisabledYearMontDay = (disabledDate: string) => {
    let disabledYear: number | undefined;
    let disabledMonth: number | undefined;
    if (disabledDate) {
      const date = generateConfig.toDayjs(disabledDate, format);
      disabledYear = generateConfig.getYear(date);
      disabledMonth = generateConfig.getMonth(date) + 1;
    }
    const result = [disabledYear, disabledMonth];
    return result;
  };
  const [minYear, minMonth] = getDisabledYearMontDay(props.minDate);
  const [maxYear, maxMonth] = getDisabledYearMontDay(props.maxDate);
  const { disabled, placeholder, yearOrder, showSearch, lan } = props;
  //从placeholder中解构出年月的placeholder
  const { year: yearPlaceHolder, month: monthPlaceHolder }: PlaceHolderType = placeholder;
  const triggerChange = (selYearPara: number | undefined, selMonthPara: number | undefined) => {
    /*
  清除月的选择
  选择的年和minDisabledDate中的年一样
  并且选择的月小于minDisabledDate中的月 
   */
    if (selYearPara && minYear && selMonthPara && minMonth) {
      if (selYearPara === minYear && selMonthPara < minMonth) {
        setSelMonth(undefined);
        selMonthPara = undefined;
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
    let formatDate: string = '';
    if (selYearPara && selMonthPara) {
      const month = selMonthPara < 10 ? '0'.concat(selMonthPara.toString()) : selMonthPara;
      const newDateStr = `${selYearPara.toString()}-${month.toString()}}`;
      const newDate = generateConfig.toDayjs(newDateStr);
      formatDate = dateFormat(newDate, format);
      props.onChange(formatDate);
    } else {
      props.onChange(undefined);
    }
  };
  //
  useEffect(() => {
    if (props.value) {
      const date = generateConfig.toDayjs(props.value, format);
      const year = generateConfig.getYear(date);
      setSelYear(year);
      const month = generateConfig.getMonth(date);
      setSelMonth(month + 1);
    } else {
      setSelYear(undefined);
      setSelMonth(undefined);
    }
  }, [undefined]);
  //年月日下拉框change事件
  const onChange = (selValue: number, key: string) => {
    if (key === 'year') {
      setSelYear(selValue);
      triggerChange(selValue, selMonth);
    } else if (key === 'month') {
      setSelMonth(selValue);
      triggerChange(selYear, selValue);
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
    maxYear,
    minYear,
    maxMonth,
    minMonth,
    placeholder: monthPlaceHolder,
    disabled,
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
      </>
    );
  };
  return <div className={styles.datePickerWrap}>{UIRender(props.UIOrder)}</div>;
};
export default Index;
