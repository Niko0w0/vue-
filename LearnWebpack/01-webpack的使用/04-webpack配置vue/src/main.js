// 使用commonjs的模块化规范
const { add, mul } = require('./js/mathUtils.js');

console.log(add(20, 40));
console.log(mul(20, 40));

// 使用es6的模块化的规范
import { name, age, height } from './js/info.js';

console.log(name, age, height);

// 依赖css文件
require('./css/normal.css');

// 依赖less文件
require('./css/special.less');

document.writeln("<h2>好魔性</h2>");

// 使用Vue进行开发
import Vue from 'vue';
// import App from './vue/app.js'
import App from "./vue/App.vue"
const app = new Vue({
  el: '#app',
  template:`<App></App>`,
  components:{
    App
  }
});