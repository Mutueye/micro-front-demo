import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
// import WujieVue from 'wujie-vue3';

import App from '@/App.vue';
import { router } from '@/router/index';
import pinia from './store';
import { initThemeStyle } from './utils/theme/themeManager';
// import lifecycles from './lifecycle';

// const { setupApp } = WujieVue;

// css reset
import '@/styles/reset.scss';
// element-plus styles
import 'element-plus/dist/index.css';
// element-plus darkmode css variables
import 'element-plus/theme-chalk/dark/css-vars.css';
// unocss styles
import 'uno.css';
// project global styles
import '@/styles/index.scss';

const app = createApp(App);
app.use(ElementPlus, { locale: zhCn }).use(pinia).use(router).mount('#app');

initThemeStyle();

// const degrade =
//   window.localStorage.getItem('degrade') === 'true' ||
//   !window.Proxy ||
//   !window.CustomElementRegistry;
// const props = {
//   jump: (name: string) => {
//     router.push({ name });
//   },
// };

// setupApp({
//   name: 'athena-home-banner',
//   url: '//localhost:5200/',
//   exec: true,
//   props,
//   degrade,
//   ...lifecycles,
// });
