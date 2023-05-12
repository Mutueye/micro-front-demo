import Vue from 'vue';
import { createPinia, PiniaVuePlugin } from 'pinia';
import ElementUI from 'element-ui';
import { initQstTheme } from '@itshixun/qst-ui-system';

import App from './App.vue';
import router from './router';

import 'element-ui/lib/theme-chalk/index.css';
import './styles/element-override.css';
// unocss styles
import 'uno.css';

Vue.use(PiniaVuePlugin);
Vue.use(ElementUI);

new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App),
}).$mount('#app');

initQstTheme({ overrideElementPlus: false });
