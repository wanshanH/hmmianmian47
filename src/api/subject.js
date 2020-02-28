import axios from 'axios'
import { getToken } from '@/utilis/token.js'

let subjectRequest = axios.create({
    baseURL: process.env.VUE_APP_CODERUL,
    withCredentials: true,
})

// 添加请求拦截器
subjectRequest.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token = getToken()
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


//   获取 学科列表
export function subject(params) {

    return subjectRequest({
        url: '/subject/list',
        method: 'get',
        params
    })
}

//  获取学科状态
export function getStatus(data) {
    return subjectRequest({
        url: '/subject/status',
        method: "post",
        data,
    })
}

//  添加学科
export function addSubject(data) {
    return subjectRequest({
        url: '/subject/add',
        method: 'post',
        data,
    })
}

//  编辑修改学科
export function editSubject(data) {
    return subjectRequest({
        url: '/subject/edit',
        method: 'post',
        data,
    })
}

//  删除 学科列表
export function delSubject(data) {
    return subjectRequest({
        url: '/subject/remove',
        method: 'post',
        data
    })
}
