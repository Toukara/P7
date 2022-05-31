<template>
  <div class="likesButtons">
    <button class="button is-primary" @click="like(post.id)" v-bind:class="{ 'is-light': this.isLiked }">Like : {{ this.likes }}</button>
    <button class="button is-danger" @click="dislike(post.id)" v-bind:class="{ 'is-loading': (this.isLiked = null && this.likes == '') }">
      Dislike : {{ this.dislikes }}
    </button>
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
      authorId: localStorage.getItem("userId"),

      likes: "",
      dislikes: "",

      isLiked: false,
      isDisliked: false,
    };
  },
  methods: {
    async fetchLikes() {
      await axios.get(`/posts/${this.$route.params.id}/likes`).then((response) => {
        
        if(response.data.likesUsers.includes(this.authorId)) {
          console.log("yes");
        }

        if (response.data.likesUsers.includes(this.authorId)) {
          this.isLiked = true;
          this.isDisliked = false;
          console.log(this.isLiked);
        } else if (response.data.dislikesUsers.includes(this.authorId)) {
          this.isDisliked = true;
          this.isLiked = false;
        } else {
          this.isLiked = false;
          this.isDisliked = false;
        }

        this.likes = response.data.likes;
        this.dislikes = response.data.dislikes;

        // console.log(response.data.likesUsers);
      });
    },
  },
  async created() {
    await this.fetchLikes();
  },
};
</script>
