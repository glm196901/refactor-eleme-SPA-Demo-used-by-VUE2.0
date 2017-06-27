// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App.vue';
import goods from './components/goods/goods.vue';
import ratings from './components/ratings/ratings.vue';
import seller from './components/seller/seller.vue';
import Vuex from 'vuex';

import 'common/stylus/index.styl';
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);
Vue.config.productionTip = false;

/* eslint-disable no-new */
const router = new VueRouter({
  routes: [{
    path: '/goods', component: goods
  }, {
    path: '/ratings', component: ratings
  }, {
    path: '/seller', component: seller
  }, {
    path: '/', redirect: '/goods'
  }]
});

new Vue({
  router
}).$mount('#app');

new Vue({
  el: '#app',
  router,
  eventHub: new Vue(),
  template: '<App/>',
  components: {App}
});
