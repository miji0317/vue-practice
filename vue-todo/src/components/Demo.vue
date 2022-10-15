<template>
  <div id="root"></div>
  <p>{{ originalPrice }}</p>
  <p>{{ doublePrice }}</p>
  <p>{{ triplePrice }}</p>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["originalPrice", "doublePrice", "triplePrice"]),
  },
};
</script>

<style></style>
