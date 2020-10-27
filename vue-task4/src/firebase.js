import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/app';
import 'firebase/database';
import store from './store';

//firebase Authentcation
const firebaseConfig = {
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
  firebase,
  //初期化と永続認証
  init() {
        firebase.initializeApp(firebaseConfig);//初期化
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);//認証設定
  },
  //ログインしたユーザのwallet参照
  refMyWallet(name) {
    firebase.database().ref(name).once('value').then((snapshot) => {
      const userData = snapshot.val().wallet;
      if (userData != undefined) {
        store.commit('refMyWallet', userData);
      }
    })
  },
  //特定ユーザーのwallet参照
  refUserWallet(name) {
    firebase.database().ref(name).once('value').then((snapshot) => {
      const userData = snapshot.val().wallet;
      if (userData !== undefined) {
        store.commit('refUserWallet', userData);
      }
    })
  },
  //新規ユーザー登録
  signup(mail, password, name) {
    console.log(mail, password, name);
      firebase
        .auth()
        .createUserWithEmailAndPassword(mail,password)
        .then(() => {
          //firebaseユーザ表示名を変更し管理する
          firebase.auth().currentUser.updateProfile({ displayName: name });
          //新規ユーザーにwalletを付与しdb保存する
          firebase.database().ref(name).set({
            wallet: 1000,
          });
          //store signupを完了状態にする。
          store.commit('doneSignup', true);
      })
      .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
      })
  },
  //ログイン
  login(mail, password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(mail,password)
        .then(() => {
          store.commit('onUserStatusChanged', true);
          this.onAuth();
          //登録ユーザーを配列管理（ログインユーザ除く）
          this.refUsers();
        })
        .catch(function(error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        })
  },
  //登録ユーザー全員参照しログインユーザーのみ除く
  refUsers() {
    //登録ユーザーdb参照
    firebase.database().ref().on('value',(data) => {
      if(data) {
        let user = data.val();
        //ログインユーザーの表示名のみ参照
        if (user !== null) {
        firebase.auth().currentUser.providerData.forEach((profile) => {
          //objからログインユーザー名を消す
          console.log(profile.displayName);//test
          delete user[profile.displayName];
          console.log(user);//test
          //objからキーを取り出し配列で管理
          const userList = [];
          for (let key in user) {
            userList.push( key );
          }
          console.log(userList);//test
          store.commit('addUsers',userList);
        })
        }
      }
    })
  },
  //ログアウト
  logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          //ログアウト後にstoreを初期値に戻す
          this.onAuth();
          //store signupを新規登録できてない初期状態にする
          store.commit('doneSignup', false);
          //ログインしてない状態に戻す
          store.commit('onUserStatusChanged', false);
        })
  },
  //ログインユーザー参照 ログインしてればユーザー情報返す 無ければ
  onAuth() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);//test
        store.commit('onAuthStateChanged', user);
      } else {
        store.commit('onAuthStateChanged', {});
        console.log(store.getters.user);//test
      }
    });
  },
  //ユーザー間の送金
  sendWallet(number, name, loginName) {
    //受取りユーザーwalletを参照し変更する
    firebase.database().ref(name).once('value').then((snapshot) => {
      const receiveUserDb = Number(snapshot.val().wallet);
      const receiveUserWallet = (receiveUserDb + Number(number));
      firebase.database().ref(name).update({
        wallet: receiveUserWallet,
      })
      //支払いユーザーのwalletを参照し変更する
      const payUserDb = store.getters.myWallet;
      const payUserWallet = (payUserDb - Number(number));
      store.commit('refMyWallet', payUserWallet);
      firebase.database().ref(loginName).update({
        wallet: payUserWallet,
      })
    })
  }
};
