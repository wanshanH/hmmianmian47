import request from '@/utilis/request.js'

// 企业列表封装
export function businessList(params){
    return request({
        url:'/enterprise/list',
        method:'get',
        params
    })
}


// 企业添加封装
export function businessAdd(data){
    return request({
        url:'/enterprise/add',
        method:'post',
        data
    })
}
// 企业状态封装
export function businessStatus(data){
    return request({
        url:'/enterprise/status',
        method:'post',
        data
    })
}
// 企业删除封装
export function businessRemove(data){
    return request({
        url:'/enterprise/remove',
        method:'post',
        data
    })
}
// 企业编辑封装
export function businessEdit(data){
    return request({
        url:'/enterprise/edit',
        method:'post',
        data
    })
}