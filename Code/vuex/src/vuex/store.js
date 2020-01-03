import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);//vuex已经集成到我项目中啦！

// 状态对象
const state={
    count:1
}

// 要改变state里的值需要用到mutations里的方法
// mutations:改变状态对象的方法
const mutations={
    add(state,n){
        state.count += n;
    },
    reduce(state){
        state.count--;
    }
}

// getter计算过滤操作
const getters={
    count:function(state){
        return state.count += 5;
    }
}

// actions异步修改状态
const actions={
    addAction(context){
        context.commit('add',10);
        setTimeout(()=>{context.commit('reduce')},3000);
        console.log('我比reduce先执行');
    },
    reduceAction({commit}){
        commit('reduce');
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})