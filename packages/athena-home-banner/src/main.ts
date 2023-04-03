import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import App from '@/App.vue';
import pinia from './store';
import { initQstThemeStyles, setThemeClassByIndex } from 'qst-ui-system';

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
app.use(ElementPlus, { locale: zhCn }).use(pinia).mount('#app');

// 初始化主题样式
initQstThemeStyles();
// 跟随基座项目改变主题
if (window.__POWERED_BY_WUJIE__) {
  window.$wujie?.bus.$on('theme-change', (themIndex: number) => {
    setThemeClassByIndex(themIndex);
  });
}
