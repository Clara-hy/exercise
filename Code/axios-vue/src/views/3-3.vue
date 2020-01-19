<template>
  <div class="home"></div>
</template>

<script>
import axios from "axios";

export default {
  // 错误处理：请求错误时进行的处理
  name: "axios3-3 错误处理",
  created() {
    axios.interceptors.request.use(
      config => {
        return config;
      },
      err => {//请求错误
        return Promise.reject(err);
      }
    );
    axios.interceptors.response.use(
      res => {
        return res;
      },
      err => {//响应错误
        return Promise.reject(err);
      }
    );
    // 例子：实际开发过程中，一般要添加统一的错误处理，而不是用catch对每一个接口进行处理
    let instance = axios.create({});
    instance.interceptors.request.use(
      config => {
        return config;
      },
      err => {
        // 请求错误 一般http状态码以4开头 401超时，404 not found
        $("#modal").show();
        setTimeout(() => {
          $("#modal").hide();
        }, 2000);
        return Promise.reject(err);
      }
    );
    instance.interceptors.response.use(
      res => {
        return res;
      },
      err => {
        // 响应错误处理 一般http状态码以5开头 500系统错误，502系统重启
        $("#modal").show();
        setTimeout(() => {
          $("#modal").hide();
        }, 2000);
        return Promise.reject(err);
      }
    );
    instance.get("/data.json").then(res => {
      console.log(res);
    });
  }
};
</script>
