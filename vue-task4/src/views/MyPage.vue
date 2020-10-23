<template>
  <div>
    <div id="header">
      <div>
        <p class="header-text">{{ user.displayName }}さんようこそ！！</p>
      </div>
      <div>
        <p id="wallet">残高：{{ wallet }}</p>
        <button id="logout-btn" @click="logOut">ログアウト</button>
      </div>
    </div>
    <h2>ユーザー一覧</h2>
    <p id="user-names">ユーザー名</p>
    <ul>
      <!-- <li v-for="user in users" :key="user">{{user}}
        <button>walletを見る</button>
        <button>送る</button>
      </li> -->
    </ul>
  </div>
</template>

<script>
import firebase from './../firebase';
export default {
  mounted(){
    firebase.onAuth();
  },
  computed:{
    user(){
      return this.$store.getters.user;
    },
    wallet(){
      const user = this.$store.getters.user;
      return firebase.myWallet(user.displayName);
    }
  },
  methods:{
    logOut(){
      firebase.logout();
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
#header{
  display: flex;
  justify-content: space-between;
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
  text-align: left;
  font-weight: bold;
}

</style>
