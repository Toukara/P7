<template>
  <div class="container">
    <h1 class="title">{{ this.post.title }}</h1>
    <div v-if="!this.post">Loading...</div>
    <PostOne v-else :post="this.post" />
    <div class="comments_container">
      <h2 class="comments_title">Comments :</h2>
      <Comments :comments="this.comments" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PostOne from "../components/Post.vue";
import Comments from "../components/Comments.vue";

export default {
  name: "PostComponent",
  data() {
    return {
      post: {},
      comments: [],
      timestamp: {},
      token: localStorage.getItem("token"),
    };
  },
  methods: {
    async fetchComments() {
      let commentsResponse = await axios.get(`http://localhost:3000/api/posts/${this.$route.params.id}`);

      for (const comment of commentsResponse.data.comments) {
        let user = await axios.get(`http://localhost:3000/api/users/${comment.authorId}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });

        let createdDate = new Date(comment.createdAt);
        let createdDateStringed = createdDate.toLocaleString("fr-FR");

        let updatedDate = new Date(comment.updatedAt);
        let updatedDateStringed = updatedDate.toLocaleString("fr-FR");

        comment.created = createdDateStringed;
        comment.updated = updatedDateStringed;

        comment.author = user.data;
      }

      return (this.comments = commentsResponse.data.comments);
    },

    async fetchPost() {
      let postResponse = await axios.get(`http://localhost:3000/api/posts/${this.$route.params.id}`);

      let user = await axios.get(`http://localhost:3000/api/users/${postResponse.data.post.authorId}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      });

      let createdDate = new Date(postResponse.data.post.createdAt);
      let createdDateStringed = createdDate.toLocaleString("fr-FR");

      let updatedDate = new Date(postResponse.data.post.updatedAt);
      let updatedDateStringed = updatedDate.toLocaleString("fr-FR");

      postResponse.data.post.author = user.data;
      postResponse.data.post.created = createdDateStringed;
      postResponse.data.post.updated = updatedDateStringed;

      return (this.post = postResponse.data.post);
    },
  },
  async created() {
    await this.fetchComments();
    await this.fetchPost();
  },
  components: { PostOne, Comments },
};
</script>

<style>
.title {
  font-size: 1.5em;
  margin-bottom: 0;
}
.comments_container {
  text-align: left;
  gap: 8px;
}

.comments_title {
  font-size: 1.15em;
  font-weight: 600;
  margin-left: 0.5em;
}

.message {
  overflow-wrap: break-word;
}
</style>
