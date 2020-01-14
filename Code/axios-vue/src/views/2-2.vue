<template>
  <div class="home">

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'axios2-2',
  components: {

  },
  created(){
    axios.get('/data.json',{
        params:{
            id:12
        }
    }).then((res)=>{
      console.log(res);
    })
    axios({
        method:'get',
        url:'/data.json',
        params:{
            id:'12'
        }
    }).then((res)=>{
        console.log(res);
    })
  }
}
</script>
 