import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  base: '/formily-doc/',
  publicPath: '/formily-doc/',
  title: '表单解决方案',
  mode: 'site',
  // more config: https://d.umijs.org/config
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
});
