const paymentMethodProps = {
  'x-component': 'select',
  title: '首期支付方式',
  'x-component-props': {
    placeholder: 'Please select',
  },
  'x-rules': [
    {
      required: true,
      message: 'This field is required',
    },
  ],
};
const testProps = {
  'x-component': 'input',
  'x-component-props': {
    placeholder: 'Please input',
  },
  'x-rules': [
    {
      required: true,
      message: 'This field is required',
    },
  ],
};
const schema = {
  type: 'object',
  properties: {
    LAYOUT_SECTION_1: {
      key: 'Payor_Details',
      type: 'string',
      name: 'Payor_Details',
      'x-component': 'section-wrapper',
      'x-component-props': {
        title: '支付方式选择',
      },
      properties: {
        LAYOUT_1: {
          key: 'LAYOUT_1',
          type: 'object',
          name: 'LAYOUT_1',
          'x-component': 'mega-layout',
          'x-component-props': {
            labelAlign: 'top',
          },
          properties: {
            paymentMethod: {
              ...paymentMethodProps,
              key: 'paymentMethod',
              type: 'string',
              name: 'paymentMethod',
              'x-component': 'select',
              'x-mega-props': {
                wrapperCol: 24,
              },
              enum: [
                {
                  label: '支付宝',
                  value: '1',
                },
                {
                  label: '微信',
                  value: '3',
                },
                {
                  label: '现金',
                  value: '5',
                },
                {
                  label: '支票',
                  value: '8',
                },
              ],
            },
            AA: {
              ...testProps,
              key: 'AA',
              type: 'string',
              title: 'AA',
              name: 'AA',
              visible: false,
              'x-mega-props': {
                wrapperCol: 24,
              },
            },
            BB: {
              ...testProps,
              key: 'BB',
              type: 'string',
              title: 'BB',
              name: 'BB',
              visible: false,
              'x-mega-props': {
                wrapperCol: 24,
              },
            },
            CC: {
              ...testProps,
              key: 'CC',
              type: 'string',
              title: 'CC',
              name: 'CC',
              visible: false,
              'x-component': 'YearMonthDayPicker',
              'x-component-props': {
                placeholder: { year: 'YYYY', month: 'MM', day: 'DD' },
                isOnlyYearShow: false,
                UIOrder: 'DD-MM-YYYY',
                format: 'YYYY-MM-DD',
                disabledDate: '07-12-2000',
                lan: 'en-US',
                showSearch: true,
              },
              'x-mega-props': {
                wrapperCol: 24,
              },
            },
          },
        },
      },
    },
  },
};

export default schema;
