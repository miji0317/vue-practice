import Vue from "vue";
import Vuex from "vuex";

// use - 전역으로 사용, 'this.어쩌구'로 사용 가능
Vue.use(Vuex);

const storage = {
  fetch() {
    const arr = [];
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        // 로컬스토리지의 데이터를 todoItems에 배열로 담음
        if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
          // 로컬스토리지에서 꺼낼 때는 JSON.parse
          arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
    }
    return arr;
  },
};

export const store = new Vuex.Store({
  state: {
    todoItems: storage.fetch(),
  },
  getters: {
    storedTodoItems(state) {
      return state.todoItems;
    },
  },
  mutations: {
    addOneItem(state, todoItem) {
      const obj = { completed: false, item: todoItem };
      // 로컬스토리지에 저장 key, value 형태
      // 로컬 스토리지에 저장할 때는 JSON.stringify
      localStorage.setItem(todoItem, JSON.stringify(obj));
      state.todoItems.push(obj);
    },
    removeOneItem(state, payload) {
      // localStorage 아이템 삭제
      localStorage.removeItem(payload.todoItem.item);
      state.todoItems.splice(payload.index, 1);
    },
    toggleOneItem(state, payload) {
      state.todoItems[payload.index].completed =
        !this.todoItems[payload.index].completed;
      // 로컬스토리지의 completed(완료 여부)를 갱신
      // 로컬스토리지는 update가 없음. 삭제하고 다시 삽입
      localStorage.removeItem(payload.todoItem.item);
      localStorage.setItem(
        payload.todoItem.item,
        JSON.stringify(payload.todoItem)
      );
    },
    clearAllItems(state) {
      // 로컬스토리지 비우기
      localStorage.clear();
      state.todoItems = [];
    },
  },
});
