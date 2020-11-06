const getYearType = (year: number) => {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return 'leap year';
  }
  return 'common year';
};
const getDaysCount = (selMonth: number | undefined, seLYear: number | undefined) => {
  const month = Number(selMonth);
  const year = Number(seLYear);
  let days: number;
  if (month === 2) {
    const yearType = getYearType(year);
    //如果是闰年
    if (yearType === 'leap year') {
      days = 29;
      //如果是平年
    } else {
      days = 28;
    }
    //如果是第4、6、9、11月
  } else if ([4, 6, 9, 11].find((m) => m === month)) {
    days = 30;
  } else {
    days = 31;
  }
  return days;
};
export default getDaysCount;
