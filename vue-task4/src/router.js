import Vue from 'vue';
import Router from 'vue-router';
import SignUp from './views/SignUp.vue';
import LogIn from './views/LogIn.vue';
import MyPage from './views/MyPage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/login',
      name: 'login',
      component: LogIn
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPage
    },
  ]
});
