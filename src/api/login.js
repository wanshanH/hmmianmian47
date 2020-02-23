import axios from 'axios'

export function login(data) {
    return axios({
        url: process.env.VUE_APP_CODERUL + "/login",
        method: 'post',
        data,
        withCredentials: true
    })
}