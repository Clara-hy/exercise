<template>
  <div class="home">
      <van-button type="default">默认按钮</van-button>
  </div>
</template>

<script>
import axios from 'axios'
import { Button } from 'vant';
export default {
  name: 'contactList',
  components:{
    //  组件库的按需引用
      [Button.name]:Button
  },
  created(){
    axios.get('/data.json').then((res)=>{
      console.log(res);
    })
  }
}
</script>
