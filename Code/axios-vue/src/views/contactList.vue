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
import { ContactList } from "vant";
export default {
  name: "contactList",
  components: {
    //  组件库的按需引用
    [ContactList.name]:ContactList
  },
  data(){
    return{
      // {
      //  id:1,
      //  name:'',
      //  tel:''
      // }
      list:[]
    }
  },
  created() {
    axios.get("/data.json").then(res => {
      console.log(res);
    });
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
