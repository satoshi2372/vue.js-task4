import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'

import firebase from './firebase'
firebase.init();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  firebase,
  render: h => h(App),
}).$mount('#app')
