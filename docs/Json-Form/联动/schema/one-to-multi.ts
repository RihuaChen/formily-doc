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
        RENEW_CREDIT_CARD_PART: {
          key: 'RENEW_CREDIT_CARD_PART',
          type: 'object',
          name: 'RENEW_CREDIT_CARD_PART',
          visible: false,
          'x-component': 'blank-wrapper',
          properties: {
            AA: {
              ...testProps,
              key: 'AA',
              type: 'string',
              title: 'AA',
              name: 'AA',
              visible: true,
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
              visible: true,
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
              visible: true,
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
