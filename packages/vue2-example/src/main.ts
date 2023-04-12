import Vue from 'vue';
import { createPinia, PiniaVuePlugin } from 'pinia';
import { initQstTheme } from 'qst-ui-system';

import App from './App.vue';
import router from './router';

import './assets/main.css';
// unocss styles
import 'uno.css';

Vue.use(PiniaVuePlugin);

new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App),
}).$mount('#app');

initQstTheme();
