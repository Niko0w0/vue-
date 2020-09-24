var name = 'xiaoming'
var age = 18
var flag = true

function sum(num1, num2) {
  return num1 + num2;
}

if (flag) {
  console.log(sum(20, 30));
}

// 导出方式1
export {
  flag,
  sum
}

// 导出方式2
export var num1 = 1000;
export var height = 188;

//导出函数类
export function mul(n1,n2){
  return n1+n2;
}

export class Person{
  run(){
    console.log('run');
  }
}

// export default
// 某些情况下，一个模块中包含某个功能，我们并不希望给这个功能命令，而且让导入者可以自己来命名
// 这个时候就可以使用export default
// 一个js文件中只能有一个default
// const address = '烟台市'
// export default address;
export default function(argument){
  console.log(argument);
}