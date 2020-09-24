<template>
  <div id="app">
    <div>
      <h2>----App内容:mudules中的内容----</h2>
      <h2>{{$store.state.a.name}}</h2>
      <button @click="updateName">修改名字</button>
      <h2>{{$store.getters.fullname}}</h2>
      <h2>{{$store.getters.fullname2}}</h2>
      <h2>{{$store.getters.fullname3}}</h2>
      <button @click="asyncUpdateName">异步修改</button>
    </div>

    <div>
      <h2>----App内容:info对象是否是响应式----</h2>
      <h2>{{$store.state.info}}</h2>
      <button @click="updateInfo">修改信息</button>
    </div>

    <div>
      <h2>----App内容----</h2>
      <h2>{{message}}</h2>
      <h2>{{$store.state.counter}}</h2>
      <button @click="addition">+</button>
      <button @click="subtraction">-</button>
      <button @click="addCount(5)">+5</button>
      <button @click="addCount(10)">+10</button>
      <button @click="addStudent">添加学生</button>
    </div>

    <div>
      <h2>----App内容:getters相关信息----</h2>
      <h2>{{$store.state.counter * $store.state.counter}}</h2>
      <h2>{{$store.getters.powerCounter}}</h2>
      <h2>{{$store.getters.more20stu}}</h2>
      <h2>{{$store.getters.moreAgestu(8)}}</h2>
    </div>

    <div>
      <h2>----helloVuex内容----</h2>
      <hello-vuex :counter="counter"></hello-vuex>
    </div>
  </div>
</template>

<script>
import HelloVuex from "./components/HelloVuex";
import { INCREMENT } from "./store/mutations-types.js";

export default {
  name: "App",
  data() {
    return {
      message: "app组件",
      counter: 0,
    };
  },
  components: {
    HelloVuex,
  },
  // computed: {
  //   more20stu() {
  //     return this.$store.state.students.filter(s => s.age > 20)
  //   }
  // },
  methods: {
    addition() {
      this.$store.commit(INCREMENT);
    },
    subtraction() {
      this.$store.commit("decrement");
    },
    addCount(count) {
      // payload : 负载
      // 普通的提交风格
      // this.$store.commit('incrementCount',count)

      // 特殊的提交风格
      this.$store.commit({
        type: "incrementCount",
        count,
      });
    },
    addStudent() {
      const stu = { id: 5, name: "Test", age: 50 };
      this.$store.commit("addStudent", stu);
    },
    updateInfo() {
      // this.$store.commit('updateInfo')
      // this.$store.dispatch('aupdateInfo', () => {
      //   console.log('里面已经完成了')
      // })
      // this.$store.dispatch('aupdateInfo', {
      //   message : '我是携带的信息',
      //   success : () => {
      //     console.log('里面已经完成了')
      //   }
      // })
      this.$store.dispatch("aupdateInfo", "我是携带的信息").then((res) => {
        console.log("上面已经完成了");
        console.log(res);
      });
    },
    updateName() {
      this.$store.commit("updateName", "lisi");
    },
    asyncUpdateName() {
      this.$store.dispatch('aupdateName','wangwu')
    }
  },
};
</script>

<style>
</style>
