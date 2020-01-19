import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  // 添加2-2路径
  {
    path:'/2-2',
    name:'axios请求方法',
    component: () => import('../views/2-2.vue')
  },
  // 添加2-3路径
  {
    path:'/2-3',
    name:'axios并发请求',
    component: () => import('../views/2-3.vue')
  },
  // 添加联系人路径
  {
    path:'/contactList',
    name:'联系人列表',
    component:() => import('../views/contactList.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
