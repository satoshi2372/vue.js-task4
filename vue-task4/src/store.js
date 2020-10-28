import Vue from 'vue';
import Vuex from 'vuex';
import firebase from './firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signup: false,//新規登録できたか
    user: {},//ログインユーザー
    users: '',//登録ユーザー(ログイン以外)
    userName:'',//特定ユーザー名
    myWallet: '',//ログインユーザー
    userWallet:'',//特定ユーザーwallet
    status: false,//ログイしてるかどうか
  },
  mutations: {
    //新規登録完了したか管理
    doneSignup(state, signup) {
      state.signup = signup;
    },
    //firebaseが返したユーザー情報
    onAuthStateChanged(state, user) {
      state.user = user;
    },
    //ログインしているかどうか
    onUserStatusChanged(state, status) {
      state.status = status;
    },
    //ログインユーザーwallet
    refMyWallet(state, wallet) {
      state.myWallet = wallet;
    },
    //特定ユーザーwallet
    refUserWallet(state, wallet) {
      state.userWallet = wallet;
    },
    //登録しているユーザリスト
    addUsers(state, users) {
      state.users = users;
    },
    //特定ユーザー名前
    addUserName(state, name) {
      state.userName = name;
    }
  },
  actions: {
    signup(context, user) {
      firebase.signup(user.mail, user.password, user.name)
    },
    login( context, user ) {
      firebase.login(user.mail, user.password)
      // await firebase.onAuth();
      // await firebase.refUsers();
    },
    logout() {
      firebase.logout();
    },
    //ログインユーザーのwallet参照
    refMyWallet(context, name) {
      firebase.refMyWallet(name)
    },
    //特定ユーザのwallet参照
    refUserWallet(context, name) {
      firebase.refUserWallet(name)
    },
    //特定ユーザー名を管理
    addUserName(context, name) {
      context.commit('addUserName',name)
    },
    //マネー受け取り支払いの非同期処理
    sendWallet(context, user) {
      firebase.sendWallet(user.number, user.name, user.loginName)
    },
  },
  getters: {
    doneSignup(state) {
      return state.signup;
    },
    user(state) {
      return state.user;
    },
    inSigned(state) {
      return state.status;
    },
    myWallet(state) {
      return state.myWallet;
    },
    userWallet(state) {
      return state.userWallet;
    },
    users(state) {
      return state.users;
    },
    userName(state) {
      return state.userName;
    }
  }
});
