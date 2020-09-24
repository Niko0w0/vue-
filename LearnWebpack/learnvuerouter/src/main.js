import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// Vue.prototype.test = function (){
//   console.log('test');
// }
Vue.prototype.name = "niko"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

console.log(router);

// 给对象定义属性的方式
// 一
// const obj = {
//   name : 'niko'
// }

// 二
// Object.defineProperty(obj, 'age', 20);
