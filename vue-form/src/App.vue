<template>
  <div>
    <!-- submit.prevent - 이벤트 새로고침 막기 -->
    <!-- event.preventDefault()와 동일 -->
    <form v-on:submit.prevent="submitForm">
      <div>
        <label for="username">id: </label>
        <input id="username" type="text" v-model="username" />
      </div>
      <div>
        <label for="password">pw: </label>
        <input id="password" type="text" v-model="password" />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      username: "hello",
      password: "bye",
    };
  },
  methods: {
    submitForm: function () {
      console.log(this.username, this.password);
      var url = "https://jsonplaceholder.typicode.com/users";
      var data = {
        username: this.username,
        password: this.password,
      };
      axios
        .post(url, data)
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
