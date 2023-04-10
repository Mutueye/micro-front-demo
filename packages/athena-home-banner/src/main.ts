import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import App from '@/App.vue';
import pinia from './store';
import { initQstTheme } from 'qst-ui-system';

// element-plus styles
import 'element-plus/dist/index.css';
// element-plus darkmode css variables
import 'element-plus/theme-chalk/dark/css-vars.css';
// unocss styles
import 'uno.css';

const app = createApp(App);
app.use(ElementPlus, { locale: zhCn }).use(pinia).mount('#app');

// 初始化主题样式
initQstTheme();
