import Vue from 'vue'
import firebase from 'firebase'
import router from './router'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "AIzaSyD0PfRHTu6b2o2Qpkj1vuyc3DK7V1INM4k",
  authDomain: "vue-task4-32162.firebaseapp.com",
  databaseURL: "https://vue-task4-32162.firebaseio.com",
  projectId: "vue-task4-32162",
  storageBucket: "vue-task4-32162.appspot.com",
  messagingSenderId: "37178538721",
  appId: "1:37178538721:web:39a118e57b6a991b0615a0",
  measurementId: "G-MBVM7ECX74"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
