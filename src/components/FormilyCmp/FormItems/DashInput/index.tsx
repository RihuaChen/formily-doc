/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-escape */
import { Input } from 'antd';
import React from 'react';

const mobileInput = (value: string): string => {
  if (!value) {
    return '';
  }
  value += '';
  let foo = value.split('-').join(''); // remove hyphens
  if (foo.length > 0) {
    if (foo.length === 10) {
      foo = foo.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
  }
  return foo;
};
const telephoneInput = (value: string): string => {
  if (!value) {
    return '';
  }
  value += '';
  let foo = value.split('-').join(''); // remove hyphens
  if (foo.length > 0) {
    if (foo.length === 9) {
      foo = foo.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
    }
  }
  return foo;
};
const ddbaInput = (value: string): string => {
  if (!value) {
    return '';
  }
  value += '';
  let foo = value.split('-').join(''); // remove hyphens
  if (foo.length > 0) {
    if (foo.length === 10) {
      foo = foo.replace(/(\d{3})(\d)(\d{5})(\d)/, '$1-$2-$3-$4');
    } else if (foo.length === 12) {
      // foo = foo.match(new RegExp('.{1,4}', 'g')).join("-");
      foo = foo.replace(/(\d{2})(\d{3})(\d)(\d{5})(\d)/, '$1-$2-$3-$4-$5');
    } else if (foo.length === 14) {
      foo = foo.replace(/(\d{4})(\d{3})(\d{6})(\d)/, '$1-$2-$3-$4');
    }
  }
  return foo;
};

const dividendAccountInput = (value: string): string => {
  if (!value) {
    return '';
  }
  value += '';
  let foo = value.split('-').join(''); // remove hyphens
  if (foo.length > 0) {
    if (foo.length === 10) {
      foo = foo.replace(/(\d{3})(\d)(\d{5})(\d)/, '$1-$2-$3-$4');
    } else if (foo.length === 12) {
      // foo = foo.match(new RegExp('.{1,4}', 'g')).join("-");
      foo = foo.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (foo.length === 14) {
      foo = foo.replace(/(\d{4})(\d{6})(\d{4})/, '$1-$2-$3');
    }
  }
  return foo;
};

const creditCardInput = (value: string): string => {
  if (!value) {
    return '';
  }
  value += '';
  let foo = value.split('-').join(''); // remove hyphens
  if (foo.length > 0) {
    foo = foo.match(new RegExp('.{1,4}', 'g')).join('-');
  }
  return foo;
};

function tbankInput(value: string): string {
  if (!value) {
    return '';
  }
  value += '';
  let foo = value.split('-').join(''); // remove hyphens
  const { length } = foo;
  if (length > 3 && length <= 4) {
    foo = foo.replace(/(.{3})(.)/, '$1-$2');
  } else if (length > 4 && length <= 9) {
    foo = foo.replace(/(.{3})(.)(.{0,5})/, '$1-$2-$3');
  } else if (length >= 10) {
    foo = foo.replace(/(.{3})(.)(.{5})(.)/, '$1-$2-$3-$4');
  }
  return foo;
}

interface DashInputProps {
  value: string;
  onChange: (args0: string) => void;
  dashInputType: string;
}
const DashInput = (props: DashInputProps) => {
  const formatNumber = (value: string): string => {
    if (!value) {
      return '';
    }
    const { dashInputType } = props;
    let foo = '';
    switch (dashInputType) {
      case 'mobile':
        foo = mobileInput(value);
        break;
      case 'telephone':
        foo = telephoneInput(value);
        break;
      case 'creditCardInput':
        foo = creditCardInput(value);
        break;
      case 'ddbaInput':
        foo = ddbaInput(value);
        break;
      case 'dividendAccountInput':
        foo = dividendAccountInput(value);
        break;
      case 'tbankInput':
        foo = tbankInput(value);
        break;
      default:
    }
    return foo;
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const reg = /^[0-9\-]*$/;
    if (reg.test(value)) {
      props.onChange(value.split('-').join(''));
    } else {
      props.onChange('');
    }
  };

  const onBlur = () => {};
  const { dashInputType, ...rest } = props;

  return <Input {...rest} onChange={onChange} onBlur={onBlur} value={formatNumber(props.value)} />;
};
export default DashInput;
