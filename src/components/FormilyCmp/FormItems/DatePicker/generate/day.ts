import dayjs, { Dayjs } from 'dayjs';
import GenerateConfig from './index';

const generateConfig: GenerateConfig<Dayjs> = {
  getYear: (date) => date.year(),
  getMonth: (date) => date.month(),
  getDate: (date) => date.date(),
  toDayjs: (value, format) => {
    if (!format) {
      return dayjs(value);
    }
    const newDateStr: string[] = [];
    const yearIndex = format.split('-').findIndex((f) => f === 'YYYY');
    newDateStr.push(value.split('-')[yearIndex]);
    const monthIndex = format.split('-').findIndex((f) => f === 'MM');
    newDateStr.push(value.split('-')[monthIndex]);
    const dayIndex = format.split('-').findIndex((f) => f === 'DD');
    newDateStr.push(value.split('-')[dayIndex]);
    return dayjs(newDateStr.join('-'));
  },
  format: (date, format) => date.format(format),
  setYear: (date, year) => date.year(year),
  setMonth: (date, month) => date.month(month),
  setDate: (date, num) => date.date(num),
};
export default generateConfig;
