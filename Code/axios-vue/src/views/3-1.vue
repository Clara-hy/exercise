<template>
  <div class="home">

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: '3-1axios实例',
  created(){
    let instance = axios.create({
        baseURL:'http://localhost:8080',//请求的域名，基本地址
        timeout:1000,//请求的超时时长(ms)，后端定义的。若超时，返回401
        url:'/data.json',//请求的路径，相对路径
        methods:'get',//请求方法
        headers:{//设置请求头
            token:''//比如可以存用户的登录信息。用户登录之后，其他接口也能拿到用户的信息
        },
        params:{},//请求参数拼接在url上
        data:{},//请求参数放在请求体里
    })
    instance.get('/data.json').then((res)=>{
        console.log(res)
    })
  }
}
</script>
