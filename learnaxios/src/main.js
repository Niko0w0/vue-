import Vue from 'vue'
import App from './App'
import axios from 'axios'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})

// 使用全局的axios和对应的配置在进行网络请求
// axios.defaults.baseURL = '到老师那里获取接口地址叭'
// axios.defaults.timeout = 5000

// // axios基本使用
// axios({
//   url: '/home/multidata',
//   methods: 'get'
// }).then(res => {
//   console.log(res);
// })

// axios({
//   // 大家添加老师的微信获取URL叭w
//   url: '/home/data',
//   params: {
//     type: 'pop',
//     page: 1
//   }
// }).then(res => {
//   console.log(res);
// })

// // axios发送并发请求
// axios.all([
//   axios({
//     url: '/home/multidata'
//   }), axios({
//     url: '/home/data',
//     params: {
//       type: 'pop',
//       page: 5
//     }
//   })]).then(axios.spread((res1,res2) => {
//     console.log(res1);
//     console.log(res2);
// }))

// 创建对应的axios实例
// const instance1 = axios.create({
//   baseURL: '',
//   timeout: 5000
// })

// instance1({
//   url: '/home/multidata'
// }).then(res => {
//   console.log(res)
// })

// instance1({
//   url: '/home/data',
//   params: {
//     type: 'pop',
//     page: 1
//   }
// }).then(res => {
//   console.log(res)
// })

// 封装一个request模块
import { request } from './network/request'

request({
  url:'/home/multidata'
}).then(res =>{
  console.log(res)
}).catch(err=>{
  // console.log(err)
})

// request({
//   baseConfig: {},
//   success: function (res) { },
//   failure: function (err) { }
// });


// request({
//   url:'/home/multidata'
// }, res => {
//   console.log(res)
// },err =>{
//   console.log(err)
// })
