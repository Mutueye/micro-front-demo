import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { initQstTheme } from 'qst-ui-system';

import App from '@/App.vue';
import { router } from '@/router/index';
import pinia from '@/store';
import { useAppConfigStore } from '@/store/appConfig';

// element-plus styles
import 'element-plus/dist/index.css';
// element-plus darkmode css variables
import 'element-plus/theme-chalk/dark/css-vars.css';
// unocss styles
import 'uno.css';

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(ElementPlus, { locale: zhCn });

initQstTheme();

useAppConfigStore()
  .getAppConfig()
  .then(() => {
    app.mount('#app');
  });
