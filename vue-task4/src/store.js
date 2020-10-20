import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userLists:[],
  },
  mutations: {
    addUser(state,user) {
      state.userLists.push(user);
    }
  }
});
