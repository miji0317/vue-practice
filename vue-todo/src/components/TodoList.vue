<template>
  <div>
    <transition-group name="list" tag="ul">
      <li
        v-for="(todoItem, index) in this.storedTodoItems"
        :key="todoItem.item"
        class="shadow"
      >
        <span
          class="checkBtn btn"
          @click="toggleComplete({ todoItem, index })"
          v-bind:class="{ checkBtnCompleted: todoItem.completed }"
          >✔️</span
        >
        <!-- 동적으로 class 부여, todoItem.completed가 true일 때 클래스 바인딩-->
        <span v-bind:class="{ textCompleted: todoItem.completed }">{{
          todoItem.item
        }}</span>
        <span class="removeBtn btn" @click="removeTodo({ todoItem, index })"
          >🗑️</span
        >
      </li>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations({
      removeTodo: "removeOneItem",
      toggleComplete: "toggleOneItem",
      // 기존에 commit을 사용할 땐 넘겨주는 인자를 명시해줬지만 mapMutations를 사용할 땐 명시해주지 않아도 된다.
      // 다만 template 부분에서 removeTodo 사용시에 인자를 객체로 묶어서 넘겨주기만 하면 된다.
      // @click="removeTodo(todoItem, index)" -> @click="removeTodo({ todoItem, index })"
    }),
    // removeTodo(todoItem, index) {
    //   this.$store.commit("removeOneItem", {
    //     todoItem,
    //     index,
    //   });
    // },
    // toggleComplete(todoItem, index) {
    //   this.$store.commit("toggleOneItem", {
    //     todoItem,
    //     index,
    //   });
    //   // this.$emit("toggleItem", todoItem, index);
    // },
  },
  computed: {
    ...mapGetters(["storedTodoItems"]),
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

/* list transition css */
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
