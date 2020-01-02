<template>
  <div>
    <h2>{{ msg }}</h2>
    <p>newsId:{{ $route.params.newsId }}</p>
    <p>newsTitle:{{ $route.params.newsTitle }}</p>
  </div>
</template>
<script>
export default {
    data() {
        return {
            msg: "params page"
        };
    },
    beforeRouteEnter: (to, from, next) => {
        console.log("准备进入params路由模板");
        next(); //记得不要忘了！不然会没有跳转页面的。
    },
    beforeRouteLeave: (to, from, next) => {
        console.log("准备离开params路由模板");
        next();
    }
};
</script>