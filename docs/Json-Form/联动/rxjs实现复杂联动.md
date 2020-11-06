---
order: 6
---

## 使用 rxjs 实现复杂联动

1. **combineLatest**: 当任意 observable 发出值时，发出每个 observable 的最新值(类似“与”操作)

- 例： 首期、续期、其他支付方式都选择支付宝, 出现 DD 输入框

2. **merge**: 将多个 observables 转换成单个 observable(类似“或”操作)

- 例： 首期或续期选择微信，出现 AA、BB、CC 选择框

```jsx
import React from 'react';
import { useDispatch, useLocation, useSelector, useIntl } from 'umi';
import {
  SchemaForm,
  FormEffectHooks,
  FormButtonGroup,
  Submit,
  createAsyncFormActions,
} from '@formily/antd';
import { merge, combineLatest } from 'rxjs';
import 'antd/dist/antd.less';
import { Input, Select } from '@formily/antd-components';
import schema from './schema/rxjs';
import { PAYMENT_METHOD } from '@/utils/constant-value';
import { createLinkageUtils } from '@/utils/createLinkageUtils';
import {
  SectionWrapper,
  BlankWrapper,
} from '@/components/FormilyCmp/VirturalLayouts';

const actions = createAsyncFormActions();
const {
  onFieldInputChange$,
  onFieldInit$,
  onFormInit$,
  onFieldValueChange$,
} = FormEffectHooks;
const { ALIPAY, WECHAT, CASH, CHEQUE } = PAYMENT_METHOD;

const Demo = () => {
  const chainEffects = () => {
    const linkage = createLinkageUtils();
    onFormInit$().subscribe(() => {});
    merge(
      onFieldInputChange$('paymentMethod'),
      onFieldInputChange$('renewPaymentMethod'),
    ).subscribe(({ value }) => {
      linkage.show('*(AA,BB,CC)', value === WECHAT);
    });
    combineLatest([
      onFieldInputChange$('paymentMethod'),
      onFieldInputChange$('renewPaymentMethod'),
      onFieldInputChange$('otherPaymentMethod'),
    ]).subscribe(([{ value: v1 }, { value: v2 }, { value: v3 }]) => {
      linkage.show('DD', v1 === ALIPAY && v2 === ALIPAY && v3 === ALIPAY);
    });
    onFieldInputChange$('CC').subscribe(({ value }) => {
      linkage.show('*(CC~)', value === ALIPAY);
    });
  };

  return (
    <SchemaForm
      actions={actions}
      components={{
        Input,
        Select,
      }}
      effects={() => {
        chainEffects();
      }}
      schema={schema}
    >
      <FormButtonGroup>
        <Submit />
      </FormButtonGroup>
    </SchemaForm>
  );
};

export default Demo;
```
