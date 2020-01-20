<template>
  <div class="home">
    <!-- 联系人列表 -->
    <van-contact-list
      :list="list"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import axios from "axios";
import { ContactList,Toast } from "vant";
export default {
  name: "contactList",
  components: {
    //  组件库的按需引用
    [ContactList.name]:ContactList,
    [Toast .name]:Toast,
  },
  data(){
    return{
      // {
      //  id:1,
      //  name:'',
      //  tel:''
      // }
      list:[],
      instance:null, //axios实例
    }
  },
  created() {
    this.instance = axios.create({
      baseURL:'http://localhost:9000/api',
      timeout:1000
    })
    this.instance.get('/contactList').then(res=>{
      // console.log(res)
      this.list = res.data.data
    }).catch(err=>{
      console.log(err)
      Toast('请求失败，请稍后重试')
    })
  },
  methods:{
    // 添加联系人
    onAdd(){

    },
    // 编辑联系人
    onEdit(){

    }
  }
};
</script>
