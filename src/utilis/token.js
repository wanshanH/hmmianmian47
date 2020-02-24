
const TOKENKEY = 'hmmmToken'

//   取出 token  
export function getToken() {
    return window.localStorage.getItem(TOKENKEY)
}

//   存入 token
export function setToken(token) {
    window.localStorage.setItem(TOKENKEY, token)
}

//   删除 token
export function removeToken() {
    window.localStorage.removeItem(TOKENKEY)
}