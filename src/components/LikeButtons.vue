<template>
  <div class="likesButtons">
    <button class="button is-primary" @click="like(post.id)" v-bind:class="{ 'is-light': this.isLiked == true }">Like : {{ this.likes }}</button>
    <button class="button is-danger" @click="dislike(post.id)" v-bind:class="{ 'is-light': this.isDisliked == true }">Dislike : {{ this.dislikes }}</button>
  </div>
</template>

<script>
import { axios } from "../utilities/axios";

export default {
  name: "LikesButtons",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      userId: localStorage.getItem("userId"),

      likes: "",
      dislikes: "",

      isLiked: false,
      isDisliked: false,
    };
  },
  methods: {
    async fetchLikes() {
      await axios.get(`/posts/${this.$route.params.id}/likes`).then((response) => {
        for (const i of response.data.likesUsers) {
          if (Number(i) == this.userId) {
            this.isLiked = true;
            this.isDisliked = false;
          }
        }

        for (const i of response.data.dislikesUsers) {
          if (Number(i) == this.userId) {
            this.isDisliked = true;
            this.isLiked = false;
          }
        }

        this.likes = response.data.likes;
        this.dislikes = response.data.dislikes;
      });
    },

    async like(PostId) {
      if (this.isDisliked) {
        await axios.post(`/posts/${PostId}/likes`, {
          like: 1,
        });
        this.isDisliked = false;
        this.dislikes--;
        this.isLiked = true;
        this.likes++;
      } else if (this.isLiked) {
        this.unlike(PostId);
      } else {
        await axios.post(`/posts/${PostId}/likes`, {
          like: 1,
        });
        this.isLiked = true;
        this.likes++;
      }
    },

    async unlike(PostId) {
      await axios.post(`/posts/${PostId}/likes`, {
        like: 0,
      });

      this.isLiked = false;
      this.likes--;
    },

    async dislike(PostId) {
      if (this.isLiked) {
        await axios.post(`/posts/${PostId}/likes`, {
          like: -1,
        });

        this.isLiked = false;
        this.likes--;
        this.isDisliked = true;
        this.dislikes++;
      } else if (this.isDisliked) {
        this.undislike(PostId);
      } else {
        await axios.post(`/posts/${PostId}/likes`, {
          like: -1,
        });

        this.isDisliked = true;
        this.dislikes++;
      }
    },

    async undislike(PostId) {
      await axios.post(`/posts/${PostId}/likes`, {
        like: 0,
      });

      this.isDisliked = false;
      this.dislikes--;
    },
  },
  async created() {
    await this.fetchLikes();
  },
};
</script>
