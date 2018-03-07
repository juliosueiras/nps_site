import Vue from 'vue';
import VueRouter from 'vue-router';

/**
 * import your page or compoennt.
 * 
 * grouping components in the same chunk, see: 
 * https://router.vuejs.org/en/advanced/lazy-loading.html
 */
// import { App } from '../components/app';
// import { HomePage } from '../pages/home';
// import { AboutPage } from '../pages/about';
// import { ListPage } from '../pages/list';

const App = () => import(/* webpackChunkName: "psv" */'../containers/app').then(m => m.App);
const PSVPage = () => import(/* webpackChunkName: "psv" */'../pages/psv').then(m => m.PSVPage);

/**
 * use router plugin.
 */
Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: App,
      redirect: '/',
      children: [
        { path: '/', component: PSVPage }
      ]
    }
  ]
});
