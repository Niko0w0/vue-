// 导入{}中定义的变量
import {flag,sum} from './aaa.js';
if(flag){
  console.log("小明是天才");
  console.log(sum(10,20))
}

// 直接导入export定义的变量
import {num1,height} from './aaa.js';
console.log(num1,height);

// 导入export的function
import {mul} from './aaa.js';
console.log(mul(20,40));

import {Person} from './aaa.js';
const p = new Person();
p.run();

// 导入default中的内容
import addr from './aaa.js';
console.log(addr);

// 统一导入
// 相当于将文件中的全部导出变量存在一个对象中，从对象中取出变量
import * as aaa from './aaa.js';
