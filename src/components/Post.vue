<template>
  <article class="message is-primary">
    <div class="message-body">
      <p>{{ post.content }}</p>
      <div class="message-attachment" v-if="post.attachment">
        <img
          v-if="allowedImageExtensions.includes(post.attachment.split('.').pop())"
          :src="`http://localhost:3000/attachments/${post.attachment}`"
          alt="Attachment"
        />
        <video v-else-if="allowedVideoExtensions.includes(post.attachment.split('.').pop())" controls style="width: 850px; height: auto">
          <source :src="`http://localhost:3000/attachments/${post.attachment}`" :type="'video/' + post.attachment.split('.').pop()" />
        </video>
        <audio
          v-else-if="allowedAudioExtensions.includes(post.attachment.split('.').pop())"
          controls
          :src="`http://localhost:3000/attachments/${post.attachment}`"
        ></audio>
      </div>

      <div class="message-footer">
        <LikeButtons :post="this.post" :user="this.post.author" />
        <div class="timestamp" v-if="post.created && post.updated">
          <p v-if="post.created === post.updated">Created on : {{ post.created }}</p>
          <p v-else>Edited on : {{ post.updated }}</p>
        </div>
        <div v-if="post.author" class="user_profile_footer">
          <p>
            by <router-link :to="`/users/${post.authorId}`"> {{ post.author.username }}</router-link>
          </p>
          <img v-if="post.author.avatar" :src="`http://localhost:3000/avatar/${post.author.avatar}`" :alt="`avatar_${post.author.username}`" class="avatar" />
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { axios } from "../utilities/axios";
import LikeButtons from "./LikeButtons";

export default {
  name: "PostComponent",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  components: {
    LikeButtons,
  },
  data() {
    return {
      allowedVideoExtensions: ["mp4", "webm", "avi", "mpeg", "mov"],
      allowedAudioExtensions: ["mp3", "wav"],
      allowedImageExtensions: ["png", "jpg", "jpeg", "gif", "bmp"],

      likes: 0,
      dislikes: 0,

      liked: null,
      disliked: null,
    };
  },
  methods: {
    // async fetchLikes() {
    //   axios.get(`/posts/${this.$route.params.id}/likes`).then((response) => {
    //     this.likes = response.data.likes;
    //     this.dislikes = response.data.dislikes;

    //     if (response.data.likesUsers.includes(this.post.authorId)) {
    //       this.liked = true;
    //       this.disliked = false;
    //     } else if (response.data.dislikesUsers.includes(this.post.authorId)) {
    //       this.disliked = true;
    //       this.liked = false;
    //     } else {
    //       this.liked = false;
    //       this.disliked = false;
    //     }
    //   });

    //   console.log(this.liked, this.disliked);
    // },

    async like(PostId) {
      await axios.post(`/posts/${PostId}/likes`, {
        like: 1,
      });

      this.liked = true;
    },
  },
  async created() {
    
  },
};
</script>

<style>
.message-footer {
  display: flex;
  flex-direction: column;
  margin-top: 1em;
  gap: 8px;
}
.user_profile_footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  align-items: center;
}

.user_profile_footer img {
  vertical-align: middle;
}
</style>
