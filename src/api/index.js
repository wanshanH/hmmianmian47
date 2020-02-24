import axios from 'axios'
// 导入操作token的文件
import { getToken } from '@/utilis/token.js'

let indexRequest = axios.create({
    baseURL: process.env.VUE_APP_CODERUL,
    headers: {
        token: getToken()
    }
})

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

