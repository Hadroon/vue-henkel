import Vue from 'vue';
import App from './App.vue';
// import Router from 'vue-router';
import Axios from 'axios';
import VueMask from 'v-mask';
// import VueTheMask from 'vue-the-mask'

Vue.config.productionTip = true;
Vue.prototype.$http = Axios;
Vue.use(VueMask);


new Vue({
  render: h => h(App),
}).$mount('#app');
