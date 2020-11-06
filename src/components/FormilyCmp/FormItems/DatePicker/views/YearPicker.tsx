import React, { useState } from 'react';
import YearPicker from '../components/year';
import styles from './index.less';

interface IndexPros {
  value: number;
  disabled: boolean;
  onChange: (args: number) => void;
  minYear: number;
  maxYear: number;
  lan: string;
  placeholder: string;
  showSearch: boolean;
  yearOrder: string;
}
const Index = (props: IndexPros) => {
  const [selYear, setSelYear] = useState(props.value);
  const onChange = (value: number) => {
    setSelYear(value);
    props.onChange(value);
  };

  return (
    <div className={styles.datePickerWrap}>
      <div>
        <YearPicker selYear={selYear} {...props} onChange={onChange} />
      </div>
    </div>
  );
};
export default Index;
