<template>
  <div :key="post.id" v-for="post in posts">
    <router-link :to="`/posts/${post.id}`">
      <article class="message">
        <div class="message-header">
          <p class="message-title">{{ post.title }}</p>
          <div class="user_profile">
            <p>by {{ post.author.username }}</p>
            <img :src="`http://localhost:3000/avatar/${post.author.avatar}`" :alt="`avatar_${post.author.username}`" class="avatar" />
          </div>
        </div>
        <div class="message-body">
          <p>{{ post.content }}</p>
        </div>
        <div class="message-attachment">
          <div v-if="post.attachment !== null">
            <img
              v-if="allowedImageExtensions.includes(post.attachment.split('.').pop())"
              :src="`http://localhost:3000/attachments/${post.attachment}`"
              alt="zjfbauhbfuhabyuh"
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
        </div>
        <div class="message-footer">
          <div class="likesButtons">
            <button class="button is-primary" @click="like(post.id)">Like : {{ post.likes }}</button>
            <button class="button is-danger" @click="dislike(post.id)">Dislike {{ post.dislikes }}</button>
          </div>
        </div>
      </article>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "PostComponent",
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      allowedVideoExtensions: ["mp4", "webm", "avi", "mpeg", "mov"],
      allowedAudioExtensions: ["mp3", "wav"],
      allowedImageExtensions: ["png", "jpg", "jpeg", "gif", "bmp"],
    };
  },
  methods: {
    // display author username and avatar
  },
};
</script>

<style>
.message {
  margin-bottom: 1.25em;
}

.message-attachment {
  margin: 1em;
}

.likesButtons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
  padding-bottom: 1em;
}

.avatar {
  border-radius: 50%;
  height: 35px;
  width: 35px;
}

.user_profile {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
}
</style>
