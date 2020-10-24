import Vue from 'vue';
import Vuex from 'vuex';
import firebase from './firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    wallet:'',
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
    },
    refWallet(state, wallet) {
      state.wallet = wallet;
    }
  },
  actions: {
    login( context, user ) {
      firebase.login(user.mail, user.password)
    },
    refWallet(context, name) {
      firebase.myWallet(name)
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    inSigned(state) {
      return state.status;
    },
    wallet(state) {
      return state.wallet;
    }
  }
});
