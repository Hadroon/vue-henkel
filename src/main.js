import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import Axios from 'axios';

Vue.config.productionTip = true;
Vue.prototype.$http = Axios;

new Vue({
  render: h => h(App),
}).$mount('#app');
