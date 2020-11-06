export default interface GenerateConfig<DateType> {
  getYear: (value: DateType) => number;
  getMonth: (value: DateType) => number;
  getDate: (value: DateType) => number;
  toDayjs: (value: string, format?: string) => DateType;
  format: (value: DateType, format: string | undefined) => string;
  setYear: (value: DateType, year: number) => DateType;
  setMonth: (value: DateType, month: number) => DateType;
  setDate: (value: DateType, date: number) => DateType;
}
