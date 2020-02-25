import axios from 'axios'
// 导入操作token的文件
import { getToken } from '@/utilis/token.js'

let indexRequest = axios.create({
    baseURL: process.env.VUE_APP_CODERUL,

})

// 添加请求拦截器
indexRequest.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token = getToken()
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

//  封装 获取用户信息的方法
export function info() {
    // axios({
    //     url: '请求路径',
    //     method: 'get',
    //     headers: {
    //         // 冲本地储存中读取出token
    //         token: getToken()
    //     }
    // })
    return indexRequest({
        url: '/info',
        method: 'get'
    })
}


//  封装 退出的方法
export function logout() {
    return indexRequest({
        url: '/logout',
        method: 'get'
    })
}

