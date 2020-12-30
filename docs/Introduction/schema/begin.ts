const schema = {
  type: 'object',
  properties: {
    paymentMethod: {
      key: 'paymentMethod',
      type: 'string',
      name: 'paymentMethod',
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
  },
};

export default schema;
