<template>
  <div class="home">

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: '3-1axios实例',
  created(){
    axios.create({
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

    // 1、axios全局配置(优先级最低)
    axios.defaults.timeout = 1000
    axios.defaults.baseURL = 'http://localhost:8080'

    // 2、axios实例配置
    //如果create方法里不传入参数，那instance2使用的参数就是全局的配置，此处的timeout就为1000，baseURL就是8080
    let instance2 = axios.create() 
    // 修改timeout
    instance2.defaults.timeout = 3000

    // 3、axios请求配置(优先级最高)
    instance2.get('/data.json',{
        timeout:5000
    })

    // 实际开发
    // 有两种请求接口：
    // http://localhost:9090
    // http://localhost:9091
    let instance3 = axios.create({
      baseURL:'http://localhost:9090',
      timeout:1000
    })
    let instance4 = axios.create({
      baseURL:'http://localhost:9091',
      timeout:3000
    })

    // 用到了baseURL,timeout,url,methods,params
    instance3.get('/contactList',{
      params:{}
    }).then((res)=>{
      console.log(res)
    })
    // 用到了baseURL,timeout,utl,methods,
    instance4.get('/orderList',{
      timeout:5000//假设数据量比较大，timeout需要再大一点
    }).then((res)=>{
      console.log(res)
    })
  }
}
</script>
