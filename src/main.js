import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import Axios from 'axios';
import VueMask from 'v-mask';
import Datetime from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';

import MainView from './components/MainView.vue';
import ValidateEmail from './components/ValidateEmail.vue';
import Admin from './components/Admin.vue';

Vue.config.productionTip = true;
Vue.prototype.$http = Axios;
Vue.use(VueMask);
Vue.use(Datetime);
Vue.use(Router);

const token = localStorage.getItem('henkeltoken');
if (token) {
  Vue.prototype.$http.defaults.headers.common['henkeltoken'] = token
}

const routes = [
  { path: '/', component: MainView, name: 'Henkel promóció' },
  { path: '/verif/:emailtoken', component: MainView, name: 'validation' },
  { path: '/reset/:passwordtoken', component: MainView, name: 'reset' },
  { path: '/admin', component: Admin, name: 'Admin' }
];

const router = new Router({
  mode: 'history',
  routes // short for `routes: routes`
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
