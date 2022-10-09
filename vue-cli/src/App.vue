<template>
  <div>
    <!-- app-header 컴포넌트에 props 바인딩 -->
    <app-header v-bind:propsdata="str" v-on:renew="renewStr"></app-header>
  </div>
</template>

<script>
// 컴포넌트 불러오기
import AppHeader from "./components/AppHeader.vue";

export default {
  data: function () {
    return {
      str: "Header",
    };
  },
  components: {
    "app-header": AppHeader,
  },
  methods: {
    renewStr: function () {
      this.str = "Hi👋🏻";
    },
  },
};
</script>

<style></style>
