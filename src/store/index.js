import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    auth,
    user,
    role,
    table,
    outlet,
    province,
    userData,
    company,
    customer,
    dashboard,
    menu,
    promo,
    categoryMenu,
    modifier,
    permission,
    tableGroup,
    categoryIngredient,
    metric,
    ingredient,
    recipe,
    categoryModifier,
    feedback,
    paymentMethod,
    report
  }
})

export default store