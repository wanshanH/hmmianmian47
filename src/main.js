import Vue from 'vue'
import App from './App.vue'
// import {router} from './router/index'
// 导入 路由
import router from './router/index'
// 导入基础样式
import './style/base.css'

//  导入全局组件
import subjectSelect from "./components/subjectSelect.vue";
import businessSelect from './components/businessSelect.vue'
// 注册全局组件
Vue.component("subjectSelect", subjectSelect)
Vue.component("businessSelect", businessSelect)

// 导入 vuex 对象
import store from './store/index'

// 导入全局过滤器
// 这个文件只需要简单导入
import '@/filters/filters.js'

// 导入 axios
// import axios from "axios"

// 配置基地址
// axios.defaults.baseURL = "http://127.0.0.1/heimamm/public"
// 原型添加$axios
// Vue.prototype.$axios = axios



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
