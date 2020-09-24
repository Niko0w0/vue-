<template>
  <div>
    <h2>我是用户界面</h2>
    <p>我是用户的相关信息</p>
    <h2>{{userId}}</h2>
    <h2>{{$route.params.userId}}</h2>
    <button @click="btnClick">按钮</button>
  </div>
</template>

<script>
export default {
  name:'User',
  computed:{
    userId() {
      return this.$route.params.userId
    }
  },
  created() {
    console.log('User created');
  },
  destoryed(){
    console.log('User destroyed');
  },
  methods:{
    btnClick() {
      console.log(this.$router);
      console.log(this.$route);

      console.log(this.name)
    }
  }
}
</script>

<style>

</style>