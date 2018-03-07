import Vue from 'vue';
import router from './router';

import ElementUI from 'element-ui';
import DataTables from 'vue-data-tables';
import 'element-ui/lib/theme-chalk/index.css';

import { createState } from './store/state';
import { createStore } from './store';

import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

Vue.use(ElementUI);
Vue.use(DataTables);

locale.use(lang);


new Vue({
  el: '#app',
  store: createStore(createState()),  router
});

