import Vue from 'vue'
import App from './App.vue'
// import {router} from './router/index'
import router from './router/index'
// 导入基础样式
import './style/base.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
