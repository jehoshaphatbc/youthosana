/*!

 =========================================================
 * Vue Paper Dashboard - v2.0.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/paper-dashboard
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import App from "./App";
import firebase from "firebase";
import router from "./router/index";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en";
import store from "./store";

Vue.use(ElementUI, { locale });

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";
Vue.config.productionTip = false;
Vue.use(PaperDashboard);

let app = "";

firebase.initializeApp({
  apiKey: "AIzaSyC07lLwie1SckBBBdR86vrCm1jlXx3qyo4",
  authDomain: "youthosana-a4b7a.firebaseapp.com",
  databaseURL: "https://youthosana-a4b7a.firebaseio.com",
  projectId: "youthosana-a4b7a",
  storageBucket: "",
  messagingSenderId: "919677473708",
  appId: "1:919677473708:web:4ca338f84a5418e1"
});

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
