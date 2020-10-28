<template>
  <div class="hello">
    <h1>新規登録画面</h1>
    <div class="input-item">
      <label for="name">ユーザ名</label>
      <input type="text" id="name" v-model="userName" placeholder="userName">
    </div>
    <div class="input-item">
      <label for="mail">メールアドレス</label>
      <input type="email" id="mail" v-model="mail" placeholder="E-mail">
    </div>
    <div class="input-item">
      <label for="password">パスワード</label>
      <input type="password" id="password" v-model="password" placeholder="Password">
    </div>
    <button id="sign-btn" @click="signUp">新規登録</button>
    <router-link to="/login" id="btn-text">ログインはこちらから</router-link>
    <p>Copyright &copy;2019 ⚪︎⚪︎Inc All rights reserved.</p>
  </div>
</template>

<script>
export default {
  mounted(){
    // 新規登録が完了したらログインする
    this.$store.watch(
      (state,getters) => getters.doneSignup,
      (newVal, oldVal) => {
        if(newVal !== oldVal){
          // console.log('検知した ');//test
          this.$store.dispatch('login',{
            mail: this.mail,
            password: this.password
          })
        }
      }
    )
  },
  data(){
    return {
      userName: '',
      mail: '',
      password: '',
    }
  },
  methods:{
    signUp(){
      this.$store.dispatch('signup',{
        mail: this.mail,
        password: this.password,
        name: this.userName
        });
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
