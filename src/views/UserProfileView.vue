<template>
  <div class="container">
    <div class="user_avatar" v-if="this.user.avatar">
      <figure class="image">
        <img class="avatar is-rounded" :src="`http://localhost:3000/avatar/${this.user.avatar}`" />
      </figure>
    </div>
    <div class="user_profile">
      <div class="username">
        <p class="title is-5">Username :</p>
        <p class="subtitle is-5">{{ this.user.username }}</p>
      </div>
      <div v-if="this.user.email" class="email">
        <p class="title is-5">Email :</p>
        <p class="subtitle is-5">{{ this.user.email }}</p>
      </div>
      <div class="bio">
        <p class="title is-5">Bio :</p>
        <p class="subtitle is-5">{{ this.user.bio || "Empty bio..." }}</p>
      </div>
      <div v-if="this.user.authLevel" class="moderationLevel">
        <p class="title is-5">Moderation Level :</p>
        <p class="subtitle is-5">{{ this.user.moderationLevel }}</p>
      </div>
      <div class="createdAt">
        <p class="title is-5">Created At :</p>
        <p class="subtitle is-5">{{ this.user.createdAt }}</p>
      </div>
    </div>
    <div class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Posts</p>
          <p class="title">{{ this.posts.total }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Comments</p>
          <p class="title">{{ this.posts.total }}</p>
        </div>
      </div>
    </div>
    <div v-if="this.user.password" class="buttonsContainer">
      <button class="button is-primary is-outlined">
        <router-link :to="`/editUser/${this.user.id}`">Edit</router-link>
      </button>
      <button class="button is-danger" @click="deleteUser">Delete</button>
    </div>
  </div>
</template>

<script>
import { axios } from "../utilities/axios";
export default {
  name: "ProfileView",
  data() {
    return {
      user: {},
      posts: [],
      comments: [],
    };
  },

  methods: {
    async fetchUser() {
      await axios.get(`http://localhost:3000/api/users/${this.$route.params.id}`).then((response) => {
        this.user = response.data;

        if (response.data.authLevel == 3) {
          this.user.moderationLevel = "SUPER Admin";
        } else if (response.data.authLevel == 2) {
          this.user.moderationLevel = "Admin";
        } else if (response.data.authLevel == 1) {
          this.user.moderationLevel = "Moderator";
        } else {
          this.user.moderationLevel = "User";
        }

        let createdDate = new Date(response.data.createdAt);
        let createdDateStringed = createdDate.toLocaleString("fr-FR");

        let updatedDate = new Date(response.data.updatedAt);
        let updatedDateStringed = updatedDate.toLocaleString("fr-FR");

        this.user.createdAt = createdDateStringed;
        this.user.updatedAt = updatedDateStringed;
      });
    },

    async fetchPosts() {
      await axios.get(`/posts`).then((response) => {
        let filteredPosts = response.data.filter((post) => {
          return post.authorId === this.user.id;
        });

        this.posts = filteredPosts;
        this.posts.total = filteredPosts.length;
      });
    },

    async fetchComments() {
      await axios.get(`/posts/comments/all`).then((response) => {
        let filteredPosts = response.data.filter((comment) => {
          return comment.authorId === this.user.id;
        });

        this.comments = filteredPosts;
        this.comments.total = filteredPosts.length;
      });
    },

    async deleteUser() {
      await axios.delete(`/users/${this.$route.params.id}`).then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          localStorage.clear();
          location.replace("/login");
        }
      });
    },
  },

  async created() {
    await this.fetchUser();
    await this.fetchPosts();
    await this.fetchComments();
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.avatar {
  width: 225px;
  height: 225px;
}

.user_avatar {
  padding: 16px;
  margin: 16px 0;
}

.user_profile {
  display: flex;
  gap: 16px;
  justify-content: center;
  text-align: center;
  padding: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.user_profile > div {
  flex-basis: 35%;
}

.level {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  gap: 2em;
}

.buttonsContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2em;
}
</style>
