import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import Axios from 'axios';
import VueMask from 'v-mask';
// import VueTheMask from 'vue-the-mask'

import MainView from './components/MainView.vue';
import ValidateEmail from './components/ValidateEmail.vue';

Vue.config.productionTip = true;
Vue.prototype.$http = Axios;
Vue.use(VueMask);
Vue.use(Router);

const token = localStorage.getItem('henkelToken');
if (token) {
  Vue.prototype.$http.defaults.headers.common['henkelToken'] = token
}

const routes = [
  { path: '/', component: MainView, name: 'home' },
  // { path: '/verif/:emailtoken', component: ValidateEmail }
  { path: '/verif/:emailtoken', component: MainView, name: 'validation' }
];

const router = new Router({
  mode: 'history',
  routes // short for `routes: routes`
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
