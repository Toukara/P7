<template>
  <div :key="comment.id" v-for="comment in comments">
    <article class="comments message is-link">
      <div class="message-body">
        <div class="user_profile_thumbnail">
          <img :src="`http://localhost:3000/avatar/${comment.author.avatar}`" :alt="`avatar_${comment.author.username}`" class="avatar" />
          <p>
            <router-link :to="`/users/${comment.authorId}`"> {{ comment.author.username }}</router-link> commented:
          </p>
        </div>
        <div class="message-content">
          <p>{{ comment.content }}</p>
        </div>
        <div class="message-footer">
          <div class="timestamp" v-if="comment.created && comment.updated">
            <p v-if="comment.created === comment.updated">Created on : {{ comment.created }}</p>
            <p v-else>Edited on : {{ comment.updated }}</p>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "CommentComponent",
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
.message.is-primary .message-body,
.message.is-link .message-body {
  background-color: #f5f5f5;
  color: #4a4a4a;
  font-size: 2vh;
}

.user_profile_thumbnail {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 8px;
  align-items: center;
}

.message-content {
  margin-top: 16px;
}

.message-footer .timestamp {
  font-size: 1.7vh;
}
</style>
