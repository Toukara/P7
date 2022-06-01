<template>
  <div class="home">
    <div class="container">
      <router-link  v-if="this.currentUser.token && this.currentUser.id" class="button is-link create" to="/submit">Create Post</router-link>
      <div v-if="posts.length > 0">
        <Posts :posts="posts" />
      </div>
      <div v-else>
        <p>No posts yet..</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Posts from "../components/AllPosts.vue";

export default {
  name: "HomeView",
  components: {
    Posts,
  },
  data() {
    return {
      posts: {},

      currentUser: {
        id: localStorage.getItem("userId"),
        token: localStorage.getItem("token"),
        authLevel: null,
      },
    };
  },
  methods: {
    async fetchPosts() {
      let postResponse = await axios.get("http://localhost:3000/api/posts");

      for (const post of postResponse.data) {
        let user = await axios.get(`http://localhost:3000/api/users/${post.authorId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        post.author = user.data;
      }

      return (this.posts = postResponse.data.reverse());
    },
  },
  async created() {
    this.fetchPosts();
  },
};
</script>

<style>
.create {
  margin: 16px 0;
}

.container {
  padding: 3em;
}
</style>
