<template>
  <div class="hello">
    <h1>ログイン</h1>
    <div class="input-item">
      <label for="mail">メールアドレス</label>
      <input type="email" id="mail" v-model="mail" placeholder="E-mail">
    </div>
    <div class="input-item">
      <label for="password">パスワード</label>
      <input type="password" id="password" v-model="password" placeholder="Password">
    </div>
    <button id="sign-btn" @click="logIn">ログイン</button>
    <router-link to="/" id="btn-text">新規登録はこちらから</router-link>
    <p>Copyright &copy;2019 ⚪︎⚪︎Inc All rights reserved.</p>
  </div>
</template>

<script>
import firebase from './../firebase';
export default {
  data(){
    return {
      mail: '',
      password: '',
    }
  },
  mounted(){
    firebase.onAuth();
  },
  computed:{
    user(){
      return this.$store.getters.user;
    },
  },
  methods:{
    logIn(){
      this.$store.dispatch('login',{
        mail:this.mail,
        password:this.password
        });
      this.$router.push('/mypage');
    }
  },
}
</script>

<style scoped>
.input-item{
  display: flex;
  justify-content: center;
  margin-bottom: 4px;
}
label {
  width: 120px;
  margin-right: 4px;
}
#sign-btn{
  margin-top: 20px;
  padding: 10px 20px;
  background-color: white;
  font-size: 16px;
  color: rgb(26, 129, 247);
  border: 1px solid rgb(26, 129, 247);
  border-radius: 5px;
  cursor: pointer;
  appearance: none;
}
#btn-text{
  display: block;
  text-decoration: none;
  margin: 0;
  font-size: 12px;
  color: rgb(26, 129, 247);
  margin-bottom: 50px;
}
</style>
