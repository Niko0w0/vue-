const app = new Vue({
    el: '#app',
    data: {
        books:[
            {
                name: "《算法导论》",
                beginDate: "2006-9",
                price: 85.00,
                count: 1
              },
              {
                name: "《UNIX编程艺术》",
                beginDate: "2006-2",
                price: 59.00,
                count: 1
              },
              {
                name: "《编程大全》",
                beginDate: "2008-10",
                price: 39.00,
                count: 1
              },
              {
                name: "《代码大全》",
                beginDate: "2006-3",
                price: 128.00,
                count: 1
              }
        ]
    },
    methods:{
        // getFinalPrice(price){
        //     return "￥"+price.toFixed(2);
        // }
        increment(index){
            this.books[index].count++;
        },
        decrement(index){
            let count = this.books[index].count;
            this.books[index].count--;
        },
        removeHandler(index){
            this.books.splice(index, 1);
        }
    },
    computed:{
        totalPrice(){
            let totalPrice = 0;
            // 普通for循环
            // for(let i = 0; i < this.books.length; i++){
            //     totalPrice += this.books[i].price * this.books[i].count;
            // }
            // return totalPrice;

            // for(let i in this.books)
            // for(let i in this.books){
            //     totalPrice += this.books[i].price * this.books[i].count;
            // }
            // return totalPrice;

            // for(let i of this.books){}
            // for(let item of this.books){
            //     totalPrice += item.price * item.count;
            // }
            // return totalPrice;

            // reduce
            ()=>{}
            
        }
    },
    filters : {
        showPrice(price){
            return "￥"+price.toFixed(2);
        }
    }
})


// 编程范式：命令式编程/声明式编程
// 编程范式：面向对象编程(第一公民：对象)/函数式编程(第一公民：函数)
const nums = [10,20,30,50,111,222,31];
let newNums = [];
// 需求：取出所有小于100的数字
// filter中的回调函数有一个要求：必须返回一个boolean值
// true 函数内部会自动将这次回调的n加入到新的数组中
// false 函数内部会过滤到这次n
newNums = nums.filter(n => n < 100 ? true : false);
console.log(newNums);

// 将所有小于100的数字进行转化，全部*2
// map函数
let newNums2 = newNums.map(n=>n*2)
console.log(newNums2);

// 将所有数字相加得到最终的结果
// reduce
let newNums3 = newNums2.reduce((preValue,n)=>{
    return n+preValue;
},0);
console.log(newNums3);