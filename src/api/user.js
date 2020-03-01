import request from '@/utilis/request.js'


//  封装用户列表方法
export function userList(params) {
    return request({
        url: '/user/list',
        method: 'get',
        params
    })
}

//  封装添加用户方法
export function userAdd(data) {
    return request({
        url: '/user/add',
        method: 'post',
        data
    })
}

//  封装编辑用户方法
export function userEdit(data) {
    return request({
        url: '/user/edit',
        method: 'post',
        data
    })
}

//  封装删除用户方法
export function userRemove(data) {
    return request({
        url: '/user/remove',
        method: 'post',
        data
    })
}

//  封装修改用户状态方法
export function userStatus(data) {
    return request({
        url: '/user/status',
        method: 'post',
        data
    })
}