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
import chart from '../views/index/chart/index.vue'
import user from '../views/index/user/index.vue'
import business from '../views/index/business/index.vue'
import question from '../views/index/question/index.vue'
import subject from '../views/index/subject/index.vue'

//  导入进度条 js 和 css 文件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

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
                path: 'chart',
                component: chart
            },
            {
                path: 'user',
                component: user
            },
            {
                path: 'business',
                component: business
            },
            {
                path: 'question',
                component: question
            },
            {
                path: 'subject',
                component: subject
            }
        ]
    }
]

const router = new VueRouter({
    routes
})


//  我们把 导航守卫要写在创建router对象的后面
//  这个回调函数 是在即将跳转路由之前调用的
//  to 到哪里去
//  from 从哪里来
//  他们两个都是一个对象,对象中的path 使他们的路径
//  next是一个函数  调用这个函数代表放行
router.beforeEach((to, from, next) => {
    // window.console.log("跳转前", to);
    // window.console.log("跳转前", from);
    // window.console.log("跳转前", next);
    NProgress.start();

    next()
})

//  跳转之后的钩子  跳转后 执行
//  to 到哪里去
//  from 从哪里来
router.afterEach(() => {
    // to and from are both route objects.
    // window.console.log("跳转后", to);
    // window.console.log("跳转后", from);
    NProgress.done();
})

// export  {router} 
export default router
