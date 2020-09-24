<template>
  <div>{{categories}}</div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      categories: "",
    };
  },
  created() {
    axios({
      url: baseURL+"category",
    }).then((res) => {
      this.categories = res;
    });
  },
};
</script>

<style>
</style>