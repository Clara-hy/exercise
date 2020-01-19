<template>
  <div class="home"></div>
</template>

<script>
import axios from "axios";

export default {
  // 拦截器：在请求或响应被处理前拦截它们
  // 请求拦截器，响应拦截器
  name: "axios3-2拦截器",
  created() {
    // 请求拦截器，有两个回调函数
    axios.interceptors.request.use(
      config => {
        // 在发送请求前做些什么
        return config;
      },
      err => {
        // 在请求错误的时候做些什么,返回的是一个Promise对象
        return Promise.reject(err);
      }
    );

    // 响应拦截器
    axios.interceptors.response.use(
      res => {
        // 请求成功对响应数据做处理
        return res;
        // 这个res会到哪里？↓
        // axios.get().then(res=>{...})
      },
      err => {
        // 响应错误做些什么
        return Promise.reject(err);
        // 这个err会到哪里？↓
        // axios.get.then().catch(err=>{...})
        // 请求错误和响应错误都会出现在catch里的err
        // 区别：请求错误是发送请求还没到达后端就报错了，响应错误是到了后端找不到对应的数据
      }
    );

    // 取消拦截器
    let interceptors = axios.interceptors.request.use(config => {
      config.headers = {
        auth: true
      };
      return config;
    });
    axios.interceptors.request.eject(interceptors);

    // 例子 
    // 用来访问需要登录的接口
    let instance = axios.create({})
    instance.interceptors.request.use(config=>{
        // 设置token属性的正确方式
        config.headers.token = ''
        return config
    })
    // 用来访问不需要登录的接口
    let newInstance = axios.create({})

    // 移动端开发，给页面添加等待的样式
    let instance_phone = axios.create({})
    instance_phone.interceptors.request.use(config=>{
        $('#model').show()
        return config
    })
    instance_phone.interceptors.response.use(res=>{
        $('#model').hide()
        return res
    })
  }
};
</script>
