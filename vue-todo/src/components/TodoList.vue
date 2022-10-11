<template>
  <div>
    <ul>
      <li
        v-for="(todoItem, index) in todoItems"
        :key="todoItem.item"
        class="shadow"
      >
        <span
          class="checkBtn btn"
          @click="toggleComplete(todoItem, index)"
          v-bind:class="{ checkBtnCompleted: todoItem.completed }"
          >✔️</span
        >
        <!-- 동적으로 class 부여, todoItem.completed가 true일 때 클래스 바인딩-->
        <span v-bind:class="{ textCompleted: todoItem.completed }">{{
          todoItem.item
        }}</span>
        <span class="removeBtn btn" @click="removeTodo(todoItem, index)"
          >🗑️</span
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      // todo list 목록을 담을 data
      todoItems: [],
    };
  },
  methods: {
    removeTodo(todoItem, index) {
      // localStorage 아이템 삭제
      localStorage.removeItem(todoItem);
      this.todoItems.splice(index, 1);
    },
    toggleComplete(todoItem) {
      todoItem.completed = !todoItem.completed;
      // 로컬스토리지의 completed(완료 여부)를 갱신
      // 로컬스토리지는 update가 없음. 삭제하고 다시 삽입
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
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
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted {
  color: #b3adad;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}
</style>
