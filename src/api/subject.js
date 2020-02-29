import request from '@/utilis/request.js'

//   获取 学科列表
export function subject(params) {

    return request({
        url: '/subject/list',
        method: 'get',
        params
    })
}

//  获取学科状态
export function getStatus(data) {
    return request({
        url: '/subject/status',
        method: "post",
        data,
    })
}

//  添加学科
export function addSubject(data) {
    return request({
        url: '/subject/add',
        method: 'post',
        data,
    })
}

//  编辑修改学科
export function editSubject(data) {
    return request({
        url: '/subject/edit',
        method: 'post',
        data,
    })
}

//  删除 学科列表
export function delSubject(data) {
    return request({
        url: '/subject/remove',
        method: 'post',
        data
    })
}
