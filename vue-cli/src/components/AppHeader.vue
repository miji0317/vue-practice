<template>
  <header>
    <h1>{{ propsdata }}</h1>
    <button v-on:click="sendEvent">send</button>
  </header>
</template>

<script>
export default {
  props: ["propsdata"],
  methods: {
    sendEvent: function () {
      // 이벤트를 상위(App.vue)로 올려보냄
      this.$emit("renew");
    },
  },
};
</script>

<style></style>
