import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"

// default to using localhost:3000
axios.defaults.baseURL =
  process.env.NODE_ENV === "production" ? "https://danimal-crossing-cookbook.herokuapp.com/" : "/";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
