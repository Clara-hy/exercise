<template>
    <div>
        <h2>{{msg}}</h2><hr>
        <p v-pre>{{$store.state.count}}-{{count}}</p>
        <h3>{{$store.state.count}}-{{count}}</h3>
        <div>
            <p v-pre>&lt;button @click="$store.commit('add',10)"&gt; --&gt; &lt;button @click="add(10)"&gt;</p>
            <p v-pre>&lt;button @click="$store.commit('reduce')"&gt; --&gt; &lt;button @click="reduce"&gt;</p>
            <button @click="add(10)">add+10</button>
            <button @click="reduce">reduce</button>
        </div>
        <div>
            <button @click="addAction">add+10</button>
            <button @click="reduceAction">reduce</button>
        </div>
    </div>
</template>

<script>
import store from '@/vuex/store';
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex';
export default{
    data(){
        return{
            msg:'Hello Vuex'
        }
    },
    store,
    computed:{
        ...mapState(['count']),
        // 引用getters方法一
        // count(){
        //     return this.$store.getters.count;
        // }

        // 引用getters方法二
        // ...mapGetters(['count'])
    },
    // methods:mapMutations(['add','reduce'])
    methods:{
        ...mapMutations(['add','reduce']),
        ...mapActions(['addAction','reduceAction'])
    }
    
    // count简写方法三
    // computed:mapState(['count'])

    // count简写方法二
    // computed:mapState({
    //     count: state=>state.count
    // })

    // count简写方法一
    // computed:{
    //     count(){
    //         return this.$store.state.count;
    //     }
    // }
}
</script>