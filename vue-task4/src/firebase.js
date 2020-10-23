import firebase from 'firebase';
import store from './store';

//firebase Authentcation
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

export default {
  init() {
        firebase.initializeApp(firebaseConfig);//初期化
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);//認証設定
  },
  signup(mail, password,name) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(mail,password)
        .then(() => {
        //firebaseユーザ表示名を変更し管理する
        firebase.auth().currentUser.updateProfile({displayName: name});
      })
      .cacth((error) => {
        // Handle Errors here.
        console.log(error.code);
        console.log(error.message);
      })
  },
  login(mail, password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(mail,password)
        .then(() => {
          alert('ログインに成功しました');//test
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        })
  },
  logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('ログアウトしました！');//test
        })
  },
  onAuth() {
    //現在ログインしているユーザー取得しuserで返す ログインしているユーザーのstateを変更
    firebase.auth().onAuthStateChanged(user => {
      user = user ? user : {};
      store.commit('onAuthStateChanged', user);
      store.commit('onUserStatusChanged', user.uid ? true : false);
    });
  },
};
