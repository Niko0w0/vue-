<template>
  <div>
    <h2>我是首页</h2>
    <p>我是首页内容</p>
    <router-link to="/home/news">新闻</router-link>
    <router-link to="/home/message">消息</router-link>
    <router-view></router-view>

    <h2>{{message}}</h2>
  </div>
</template>

<script>
export default {
  name:'Home',
  data (){
    return {
      message : '你好',
      path:'/home/news'
    }
  },
  created() {
    console.log('home created');
  },
  destoryed() {
    console.log('home destoryed');
  },
  // activated和deactivated只有在该组件被保持了状态使用了keep-alive时，才是有效的
  activated() {
    this.$router.push(this.path);
  },
  beforeRouteLeave(to, from, next){
    console.log(this.$route.path);
    this.path = this.$route.path
    next()
  }

}
</script>

<style scoped>

</style>