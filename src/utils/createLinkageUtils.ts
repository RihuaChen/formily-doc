import { createFormActions, FormPath } from '@formily/antd';

const createLinkageUtils = () => {
  const { setFieldState } = createFormActions();
  const linkage = (key: string, defaultValue?: [] | boolean) => (
    path: string,
    value?: string | boolean | {} | [],
  ) =>
    setFieldState(path, (state) => {
      FormPath.setIn(state, key, value !== undefined ? value : defaultValue);
    });
  return {
    hide: linkage('visible', false),
    show: linkage('visible', true),
    enum: linkage('props.enum', []),
    loading: linkage('loading', true),
    loaded: linkage('loading', false),
    editable: linkage('editable', false),
    disabled: linkage('props.x-component-props.disabled', true),
    options: linkage('props.x-component-props.options'),
    value: linkage('value'),
  };
};

export { createLinkageUtils };

