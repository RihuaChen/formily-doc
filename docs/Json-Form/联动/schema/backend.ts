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
        AA: {
          ...testProps,
          key: 'AA',
          type: 'string',
          title: 'AA',
          name: 'AA',
          // triggerType: 'onBlur',
          visible: true,
          'x-mega-props': {
            wrapperCol: 12,
          },
          'x-rules': [
            {
              required: true,
              message: 'This field is required',
            },
            { min: 8, message: 'Please input 8 digit' },
          ],
          'x-component-props': {
            maxLength: 8,
          },
        },
        BB: {
          ...testProps,
          key: 'BB',
          type: 'string',
          title: 'BB',
          name: 'BB',
          'x-component': 'SpinInput',
          visible: true,
          'x-component-props': {},
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
            wrapperCol: 12,
          },
        },
      },
    },
  },
};

export default schema;
