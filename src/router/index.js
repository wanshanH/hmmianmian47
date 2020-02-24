// 导入vue
import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 导入 element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入 组件
import login from '../views/login/login.vue'
import index from '../views/index/index.vue'

//  导入子路由 
import user from '../views/index/user/index.vue'

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

// 注册 路由
Vue.use(VueRouter)
// 注册 element ui
Vue.use(ElementUI)

const routes = [
    {
        path: '/',
        component: login
    },
    {
        path: '/index',
        component: index,
        children: [
            {
                path: 'user',
                component: user
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

// export  {router} 
export default router
