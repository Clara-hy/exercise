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

    // post
    let data ={
        id:12
    }
    axios.post('/post',data).then((res)=>{
        console.log(res);
    })
    axios({
        method:'post',
        url:'/post',
        data:data
    }).then((res)=>{
        console.log(res);
    })
    // form-data请求
    let formData = new FormData();
    for(let key in data){
        formData.append(key, data[key])
    }
    axios.post('/post',formData).then((res)=>{
        console.log(res);
    })
    // put
    axios.post('/put',data).then((res)=>{
        console.log(res);
    })
    // patch
    axios.post('/patch',data).then((res)=>{
        console.log(res);
    })
  }
}
</script>
 