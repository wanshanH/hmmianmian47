import axios from 'axios'
import { getToken } from '@/utilis/token.js'

let businessRequest = axios.create({
    baseURL: process.env.VUE_APP_CODERUL,
    withCredentials: true,
})

// 添加请求拦截器
businessRequest.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token = getToken()
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 企业列表封装
export function businessList(params){
    return businessRequest({
        url:'/enterprise/list',
        method:'get',
        params
    })
}


// 企业添加封装
export function businessAdd(data){
    return businessRequest({
        url:'/enterprise/add',
        method:'post',
        data
    })
}
// 企业状态封装
export function businessStatus(data){
    return businessRequest({
        url:'/enterprise/status',
        method:'post',
        data
    })
}
// 企业删除封装
export function businessRemove(data){
    return businessRequest({
        url:'/enterprise/remove',
        method:'post',
        data
    })
}
// 企业编辑封装
export function businessEdit(data){
    return businessRequest({
        url:'/enterprise/edit',
        method:'post',
        data
    })
}