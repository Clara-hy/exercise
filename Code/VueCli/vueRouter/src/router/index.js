import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hi1 from '@/components/Hi1'
import Hi2 from '@/components/Hi2'
import Params from '@/components/params'
import Error from '@/components/Error'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'*',
      component:Error
    },{//alias
      path: '/',
      name: 'HelloWorld',
      component:HelloWorld,
      alias:'/home1'
    },{
      path:'/hi1',
      component:Hi1,
      alias:'/another_hi1'
    },{//重定向
      path:'/goHome',
      redirect:'/'
    },{//重定向并且加参数
      path:'/goParams/:newsId(\\d+)/:newsTitle',
      redirect:'/params/:newsId(\\d+)/:newsTitle'
    },{//url传参
      path:'/params/:newsId(\\d+)/:newsTitle',//newsId要求必须是数字，如果是"198aa"或者纯字母则会显示失败
      component:Params,
      //在路由配置文件里写钩子函数
      // beforeEnter:(to, from, next)=>{
      //   console.log(to);
      //   console.log(from);
      //   next();
      // }
    },{//单页面多路由例子
      path: '/clara',
      name: 'HelloWorld',
      components:{
        default:HelloWorld,
        left:Hi1,
        right:Hi2
      } 
    }
  ]
})
