<template>
  <div class="home"></div>
</template>

<script>
import axios from "axios";

export default {
  //用于取消正在进行的http请求
  name: "axios3-4 取消请求",
  created() {
    let source = axios.CancelToken.source();
    axios
      .get("/data.json", {
        cancelToken: source.token
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    // 取消请求，cancel方法里的参数是可选的，若为空，err则为空
    source.cancel("cancel http");
  }
};
</script>
