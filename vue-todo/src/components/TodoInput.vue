<template>
  <div>
    <input type="text" v-model="newTodoItem">
    <button v-on:click="addTodo">add</button>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      newTodoItem: ""
    }
  },
  methods: {
    addTodo: function() {
      console.log(this.newTodoItem)
      // 로컬스토리지에 저장 key, value 형태
      localStorage.setItem(this.newTodoItem, this.newTodoItem);
      this.newTodoItem = ''; // 초기화
    }
  }
}
</script>

<style>

</style>