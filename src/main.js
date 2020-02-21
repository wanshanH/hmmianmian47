import Vue from 'vue'
import App from './App.vue'
// import {router} from './router/index'
import router from './router/index'
// 导入基础样式
import './style/base.css'
// 导入 axios
import axios from "axios"

// 配置基地址
axios.defaults.baseURL = "http://127.0.0.1/heimamm/public"
// 原型添加$axios
Vue.prototype.$axios = axios



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
