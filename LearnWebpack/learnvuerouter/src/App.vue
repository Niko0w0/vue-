<template>
  <div id="app">
    <!-- 
      - tag:tag可以指定<router-link>渲染成什么组件，比如下面的代码中，首页会被渲染成<button>元素
      - replace:replace不会留下history记录，所以指定replace的情况下，后退键不能返回到上一个页面中
      - active-class:当<router-link>对应的路由匹配成功时，会自动给当前元素蛇者一个router-link-active的class,设置active-class可以修改默认的名称
          - 在进行高亮显示的时候导航艾丹或者底部的tabbar时，会使用到该类
          - 但是通常不会修改类的属性，会直接使用默认的router-link-active
    -->
    <h2>app组件</h2>
    <router-link to="/home" tag="button" replace>首页</router-link>
    <router-link to="/about">关于</router-link>
    <!-- <router-link :to="'/user/'+userId">用户</router-link> -->
    <!-- <router-link to="/profile">档案</router-link> -->
    <!-- <router-link :to="{path:'/profile', query:{name:'niko',age:18,height:167}}">档案</router-link> -->
    <button @click="userClick">用户</button>
    <button @click="profileClick">档案</button>

    <!-- 这里不能加空格 -->
    <keep-alive exclude="Profile,User">
      <router-view />
    </keep-alive>

    <!-- <button @click='homeClick'>首页</button>
    <button @click='aboutClick'>关于</button>
    <router-view></router-view>-->
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      userId: "niko",
    };
  },
  methods: {
    homeClick() {
      // 通过代码的方式修改路由 vue-router
      // push => pushState
      // this.$router.push('/home');
      this.$router.replace("/home");
      console.log("homeClick");
    },
    aboutClick() {
      // this.$router.push('/about');
      this.$router.replace("/about");
      console.log("aboutClick");
    },
    userClick() {
      this.$router.push("/user/" + this.userId);
    },
    profileClick() {
      this.$router.push({
        path:'/profile', 
        query:{
          name:'niko',
          age:20,
          height:170
        }
      })
    },
  },
};
</script>

<style>
.router-link-active {
  color: pink;
}
</style>
