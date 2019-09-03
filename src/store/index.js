import Vue from "vue";
import Vuex from "vuex";
import fellow from './modules/fellow'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    fellow
  }
})

export default store