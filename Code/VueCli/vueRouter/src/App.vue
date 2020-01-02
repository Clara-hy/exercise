<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <br />
    <div>
      <button @click="goBack">后退</button>
      <button @click="goFront">前进</button>
      <button @click="goHome">返回首页</button>
    </div>
    <router-link to="/">首页</router-link>|
    <router-link to="/params/198/clara fighting嘻嘻">params</router-link>|
    <router-link to="/goHome">goHome</router-link>|
    <router-link to="/goParams/666/I like vue.js">goParams</router-link>|
    <router-link to="/hi1">Hi1</router-link>|
    <router-link to="/another_hi1">another_hi1</router-link>|
    <router-link to="/home1">home1</router-link>|
    <router-link to="/sf9">一个不存在的页面</router-link>|

    <transition name="fade" mode="out-in">
      <router-view />
      <router-view name="left" style="float:left;width:50%;height:300px;background-color:#ccc;" />
      <router-view name="right" style="float:left;width:50%;height:300px;background-color:#c0c;" />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  methods:{
    goBack(){
      this.$router.go(-1);
    },
    goFront(){
      this.$router.go(1);
    },
    goHome(){
      this.$router.push('/');
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fade-enter{
  opacity: 0;
}
.fade-enter-active{
  transition: opacity .5s;
}
.fade-leave{
  opacity: 1;
}
.fade-leave-active{
  opacity: 0;
  transition:opacity .5s; 
}
</style>
