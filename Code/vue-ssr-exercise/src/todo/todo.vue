<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下去要做什么？"
      @keyup.enter="addTodo"
    />
    <Item 
      :todo="todo"
      v-for="todo in filteredTodos"
      :key="todo.id"
      @del = "deleteTodo"
    />>
    <Tabs 
      :filter="filter" 
      :todos="todos"
      @toggle = 'toggleFilter'
      @clearAllCompleted = 'clearAllCompleted'
    />
  </section>
</template>

<script>
import Item from "./item.vue";
import Tabs from "./tabs.vue";
let id = 0;

export default {
  data() {
    return {
      todos:[],
      filter:'all'
    };
  },
  components: {
    Item,
    Tabs
  },
  computed:{
    filteredTodos(){
      if(this.filter === 'all'){
        return this.todos;
      }
      const completed = this.filter === 'completed'; //filter是当前用户选择想看的是哪个。active、completed
      return this.todos.filter(todo => todo.completed === completed);//这个的思路可以细品
    }
  },
  methods: {
    addTodo(e) {
      this.todos.unshift({
        id:id++,
        content:e.target.value.trim(),
        completed:false
      });
      e.target.value = '';
    },
    deleteTodo(id){
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1);
    },
    toggleFilter(state){
      this.filter = state;
    },
    clearAllCompleted(){
      this.todos = this.todos.filter(todo => !todo.completed);
    }
  }
};
</script>

<style scoped lang="stylus">
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}

.add-input {
  position: relative;
  font-size: 24px;
  width: 100%;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  outline: none;
  box-sizing: border-box;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: 0 -2px 1px rgba(0, 0, 0, 0.7) inset;
}
</style>