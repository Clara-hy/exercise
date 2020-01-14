<template>
  <div class="home">

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'axios2-3',
  created(){
    axios.all([
        axios.get('/data.json'),
        axios.get('/city.json')
    ]).then(
        axios.spread((dataRes, cityRes)=>{
            console.log(dataRes, cityRes)
        })
    )
  }
}
</script>
