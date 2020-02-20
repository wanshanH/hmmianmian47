// 导入vue
import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 导入 element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入 组件
import login from '../views/login/index.vue'
import user from '../views/user/user.vue'

// 注册 路由
Vue.use(VueRouter)
// 注册 element ui
Vue.use(ElementUI)

const routes = [
    {
        path: '/login',
        component: login
    },
    {
        path:'/user',
        component:user
    }
]

const router = new VueRouter({
    routes
})

// export  {router} 
export default router
