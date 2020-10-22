import Vue from 'vue';
import Vuex from 'vuex';
import firebase from './firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    status: false,
  },
  mutations: {
    //firebaseが返したユーザー情報
    onAuthStateChanged(state, user) {
      state.user = user;
    },
    //ログインしているかどうか
    onUserStatusChanged(state, status) {
      state.status = status;
    }
  },
  actions: {
    login(mail, password) {
      firebase.login(mail, password);
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    inSigned(state) {
      return state.status;
    }
  }
});
