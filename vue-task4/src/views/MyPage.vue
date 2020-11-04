<template>
  <div>
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
    <div :class="{'overlay': modalOverlay}" @click="closeModal"></div>
    <div id="footer">
      <p>Copyright &copy;2019 ⚪︎⚪︎Inc All rights reserved.</p>
      <!-- クリックしたときに残高表示 -->
      <div class="wallet-item" :class="{'is-open': walletModalActive}">
        <div class="wallet-item_header">
          <p>{{ userName }}さんの残高</p>
          <p>{{ userWallet }}</p>
        </div>
        <div class="wallet-item_footer">
          <button class="close-btn" @click="openItem">close</button>
        </div>
      </div>

      <!-- クリックしたときに表示しwallet送金 -->
      <div class="wallet-item" :class="{'is-open': walletModalActive2}">
        <div class="wallet-item_header">
          <p>あなたの残高{{ wallet }}</p>
          <p>送る金額</p>
          <input id="pay-input" type="number" v-model="payWallet">
        </div>
        <div class="wallet-item_footer">
          <button class="close-btn" @click="payMyWallet">送信</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    this.users.push(...this.$store.getters.users);
    //store値の変更をwatchで監視(ログインユーザ以外の登録ユーザー)
    this.$store.watch(
      (state,getters) => getters.users,
      (newVal, oldVal) => {
        console.log('動いてる？');//test
        if(newVal !== oldVal){
          this.users.splice(0, this.users.length);
          this.users.push( ...newVal);
        }
      }
    )
    // ログインしてないならリダイレクト
    if(this.$store.getters.inSigned === false){
        this.$router.push('/login').catch(err => {
            console.log(err);
          });
    }
  },
  data(){
    return {
      users: [ ],//登録ユーザー（ログイン以外）
      show: false,
      show2: false,
      payWallet: '',
      walletModalActive: false,
      walletModalActive2: false,
      modalOverlay: false,
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
    openItem(){
      this.toggleModal();
      this.toggleOverlay();
    },
    toggleModal(){
      this.walletModalActive = ! this.walletModalActive;
    },
    toggleModal2(){
      this.walletModalActive2 = ! this.walletModalActive2;
    },
    toggleOverlay(){
      this.modalOverlay = ! this.modalOverlay;
    },
    closeModal(){
      if(this.walletModalActive === true){
        this.toggleModal();
      } else if (this.walletModalActive2 === true){
        this.toggleModal2();
      }
      this.toggleOverlay();
    },
    logOut(){
      this.$store.dispatch('logout');
      this.$router.push('/login').catch(err => {
            console.log(err);
      })
    },
    showWallet(event){
      const name = event.target.parentElement.previousElementSibling.textContent;
      this.$store.dispatch('refUserWallet',name);
      this.$store.dispatch('addUserName',name);
      this.toggleModal();
      this.toggleOverlay();
    },
    showWallet2(event){
      const name = event.target.parentElement.previousElementSibling.textContent;
      this.$store.dispatch('addUserName',name);
      this.toggleModal2();
      this.toggleOverlay();
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
      this.toggleModal2();
      this.toggleOverlay();
    },
  }
}
</script>

<style scoped>
.overlay{
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  background-color: rgba(0,0,0,0.75);
}
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
  position: fixed;
  width: 35%;
  height: 35%;
  left: 50%;
  bottom: 20%;
  transform: translate(-50%, -10%);
  overflow-y: hidden;
  visibility: hidden;
  opacity: 0;
  z-index: -1;
  transition: opacity 1s ease;
}
.is-open{
  visibility: visible;
  opacity: 1;
  z-index: 100;
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
