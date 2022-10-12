<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodoItem="addOneItem"></TodoInput>
    <!-- <TodoList v-bind:내려보낼 props 속성명="현재 위치의 컴포넌트 데이터 속성"></TodoList> -->
    <TodoList
      v-bind:propsdata="todoItems"
      v-on:removeItem="removeOneItem"
      v-on:toggleItem="toggleOneItem"
    ></TodoList>
    <TodoFooter v-on:clearAll="clearAllItems"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";

export default {
  data: function () {
    return {
      // todo list 목록을 담을 data
      todoItems: [],
    };
  },
  methods: {
    addOneItem(todoItem) {
      var obj = { completed: false, item: todoItem };
      // 로컬스토리지에 저장 key, value 형태
      // 로컬 스토리지에 저장할 때는 JSON.stringify
      localStorage.setItem(todoItem, JSON.stringify(obj));
      this.todoItems.push(obj);
    },
    removeOneItem(todoItem, index) {
      // localStorage 아이템 삭제
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index, 1);
    },
    toggleOneItem(todoItem, index) {
      this.todoItems[index].completed = !this.todoItems[index].completed;
      // 로컬스토리지의 completed(완료 여부)를 갱신
      // 로컬스토리지는 update가 없음. 삭제하고 다시 삽입
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    clearAllItems() {
      // 로컬스토리지 비우기
      localStorage.clear();
      this.todoItems = [];
    },
  },
  // 인스턴스가 생성되자 마자 호출되는 라이프사이클 훅
  created: function () {
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        // 로컬스토리지의 데이터를 todoItems에 배열로 담음
        if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
          // 로컬스토리지에서 꺼낼 때는 JSON.parse
          this.todoItems.push(
            JSON.parse(localStorage.getItem(localStorage.key(i)))
          );
        }
      }
    }
  },
  components: {
    // '컴포넌트 태그명' : 컴포넌트 내용
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter,
  },
};
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f6;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
.btn:hover {
  cursor: pointer;
  scale: 1.1;
}
</style>
