<template>
  <div class="home">
    <Posts />
  </div>
</template>

<script>
import Posts from "../components/Post.vue";

export default {
  name: "HomeView",
  components: {
    Posts,
  },
};
</script>
