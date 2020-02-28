import Vue from 'vue'
import moment from 'moment'

//  准备一个过滤器
Vue.filter('formatTime',(value)=>{
    return moment(value).format('YYYY-MM-DD')
})