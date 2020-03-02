import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        username: '',
        avatar: '',
        role: ''
    },
    mutations: {
        // 修改用户名
        changeUsername(state, val) {
            state.username = val
        },
        // 修改头像
        changeAvatar(state, val) {
            state.avatar = val
        },
        // 专门用来修改角色的方法
        changeRole(state, val) {
            state.role = val
        }
    }
})

export default store