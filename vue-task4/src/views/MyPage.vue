<template>
  <div id="overlay">
    <div id="header">
      <div id="header-text">
        <p>{{ user.displayName }}さんようこそ！！</p>
      </div>
      <div id="heder-wallet">
        <p id="wallet">残高：{{ wallet }}</p>
        <button id="logout-btn" @click="logOut">ログアウト</button>
      </div>
    </div>
    <h2>ユーザー一覧</h2>
    <p id="user-names">ユーザー名</p>
    <ul id="user-list">
      <li class="user-item" v-for="user in users" :key="user">
        <div class="user-item_name">{{ user }}</div>
        <div class="user-item_btn">
          <button class="wallet-btn" @click="showWallet($event)">walletを見る</button>
          <button class="submit-btn" @click="showWallet2($event)">送る</button>
        </div>
      </li>
    </ul>
    <div id="footer">
      <p>Copyright &copy;2019 ⚪︎⚪︎Inc All rights reserved.</p>
      <!-- クリックしたときに残高表示 -->
      <div class="wallet-item" v-show="show">
        <div class="wallet-item_header">
          <p>{{ userName }}さんの残高</p>
          <p>{{ userWallet }}</p>
        </div>
        <div class="wallet-item_footer">
          <button class="close-btn" @click="noneWallet">close</button>
        </div>
      </div>

      <!-- クリックしたときに表示しwallet送金 -->
      <div class="wallet-item" v-show="show2">
        <div class="wallet-item_header">
          <p>あなたの残高{{ wallet }}</p>
          <p>送る金額</p>
          <input type="number" v-model="payWallet">
        </div>
        <div class="wallet-item_footer">
          <button class="close-btn" @click="payMyWallet">送信</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from './../firebase';

export default {
  mounted(){
    //store値の変更をwatchで監視(ログインユーザ以外の登録ユーザー)
    this.$store.watch(
      (state,getters) => getters.users,
      (newVal) => {
        this.users.splice(0, this.users.length);
        this.users.push(...newVal);
      }
    )
    // ログインしてないならリダイレクト
    // this.$store.watch(
    //   (state,getters) => getters.inSigned,
    //   (newval, oldval) => {
    //     if(newval === oldval){
    //       this.$router.push('/login');
    //     }
    //   }
    // )
  },
  data(){
    return {
      users: [],//登録ユーザー（ログイン以外）
      show: false,
      show2: false,
      payWallet: '',
    }
  },
  computed:{
    user(){
      return this.$store.getters.user;
    },
    wallet(){
      const user = this.$store.getters.user;
      this.$store.dispatch('refMyWallet',user.displayName);
      return this.$store.getters.myWallet;
    },
    userName(){
      return this.$store.getters.userName;
    },
    userWallet(){
      return this.$store.getters.userWallet;
    },
  },
  methods:{
    logOut(){
      firebase.logout();
      this.$router.push('/login');
    },
    showWallet(event){
      const name = event.target.parentElement.previousElementSibling.textContent;
      this.$store.dispatch('refUserWallet',name);
      this.$store.dispatch('addUserName',name);
      this.show = true;
    },
    showWallet2(event){
      const name = event.target.parentElement.previousElementSibling.textContent;
      this.$store.dispatch('addUserName',name);
      this.show2 = true;
    },
    noneWallet(){
      this.show = false;
    },
    payMyWallet(){
      //支払いユーザーの名前
      const loginUserName = this.$store.getters.user.displayName;
      //受け取りのユーザー名が必要
      const userName = this.$store.getters.userName;
      //それぞれのユーザーwalletを変更する。
      this.$store.dispatch('sendWallet',{number: this.payWallet, name: userName, loginName: loginUserName});
      this.show2 = false;
    },
  }
}
</script>

<style scoped>
#header{
  display: flex;
  justify-content: space-between;
}
#header-text{
  width: 40%;
}
#heder-wallet{
  width: 40%;
}

#wallet{
  display: inline-block;
  margin-right: 10px;
}
#logout-btn {
  display: inline-block;
  vertical-align: 2px;
  padding: 4px;
  background-color: white;
  font-size: 8px;
  color: rgb(26, 129, 247);
  border: 1px solid rgb(26, 129, 247);
  border-radius: 5px;
  cursor: pointer;
  appearance: none;
  text-decoration: none;
}
#user-names {
  text-align: center;
  font-weight: bold;
  width: 40%;
}
#user-list{
  padding: 0;
}
.user-item{
  list-style: none;
  text-align: left;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
}
.user-item_name{
  display: inline-block;
  text-align: center;
  width: 40%;
}
.user-item_btn{
  display: inline-block;
  width: 40%;
}
.wallet-btn,
.submit-btn
{
  color: white;
  padding: 4px 8px;
  border: none;
  border-radius: 5px;
  background-color: #1DA3BD;
}
.submit-btn {
  margin-left: 8px;
}
/*---- footer ----*/
#footer{
  position: relative;
}
.wallet-item{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
.wallet-item_header{
  background-color: white;
  padding: 16px;
}
.wallet-item_footer{
  background-color: #C9CAC9;
  padding: 16px ;
}
.close-btn{
  color: white;
  border: none;
  border-radius: 3px;
  background-color: #D83849;
  padding: 10px;
  margin-left: 80px;
}

</style>
