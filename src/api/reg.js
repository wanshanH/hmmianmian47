import axios from 'axios'

export function sendSMS(data) {
    return axios({
        url: process.env.VUE_APP_CODERUL + "/sendsms",
        method: 'post',
        data,
        withCredentials: true
    })
}

export function register(data) {
    return axios({
        url: process.env.VUE_APP_CODERUL + "/register",
        method: 'post',
        data,
        withCredentials: true
    })
}