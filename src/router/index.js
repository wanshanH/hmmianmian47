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

// 导入子路由数组
import children from './children.js'

//  导入进度条 js 和 css 文件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { info } from '@/api/index.js'
import { removeToken } from '@/utilis/token.js'
import { Message } from 'element-ui';

// 导入vuex
import store from '../store/index'

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
        redirect: '/login'
    },
    {
        path: '/login',
        component: login,
        meta: {
            title: '登录',
            roles:
                ['超级管理员', '管理员', '老师', '学生']
        }
    },
    {
        path: '/index',
        component: index,
        meta: {
            title: '首页',
            roles:
                ['超级管理员', '管理员', '老师', '学生']
        },
        children
    }
]

const router = new VueRouter({
    routes
})

//  白名单
let whiteUrl = ['/login']
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

    if (whiteUrl.includes(to.path)) {
        next()
    } else {
        info().then(res => {
            if (res.data.code == 200) {
                // window.console.log(res);
                // 登录前需要判断状态  状态为1代表启用可以登录
                if (res.data.data.status == 1) {
                    // 保存 用户名 和头像到vuex
                    store.commit('changeUsername', res.data.data.username)
                    store.commit('changeAvatar', process.env.VUE_APP_CODERUL + "/" + res.data.data.avatar)
                    store.commit('changeRole', res.data.data.role)
                    // 判断是否是从登录页过来  是的话给登录成功提示
                    if (from.path == '/login') {
                        Message.success('登录成功')
                    }
                    // 判断 该账号是有有权限访问某个页面
                    if (to.meta.roles.includes(res.data.data.role)) {
                        next()
                    } else {
                        Message.warning('该页面无权限访问')
                        NProgress.done();
                        next(from.path)
                    }

                } else {
                    // 状态为0代表禁用不可以登录
                    Message.warning('账号被禁用,请与管理员联系')
                    NProgress.done();
                    next('/login')
                }

            } else if (res.data.code == 206) {

                Message.error('登录异常,请重新登录')
                // 删除token
                removeToken()
                NProgress.done();

                next('/login')
            }
        })
    }
})

//  跳转之后的钩子  跳转后 执行
//  to 到哪里去
//  from 从哪里来
router.afterEach((to) => {
    // to and from are both route objects.
    // window.console.log("跳转后", to);
    // window.console.log("跳转后", from);
    NProgress.done();
    document.title = to.meta.title
})

// export  {router} 
export default router
