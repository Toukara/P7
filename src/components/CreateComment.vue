<template>
  <div class="field">
    <label class="label">Message</label>
    <div class="control">
      <textarea class="textarea" placeholder="Write a comment..." v-model="this.comment.content" maxlength="250" />
      <button class="button is-link" @click="createComment">Submit</button>
    </div>
  </div>
</template>

<script>
import { axios } from "../utilities/axios";
export default {
  name: "CreateComment",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comment: {
        content: null,
      },
    };
  },
  methods: {
    async createComment() {
      let response = await axios.post(
        `/posts/${this.post.id}/comments`,
        { content: this.comment.content },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 201) {
        alert(response.data.message);
        location.reload();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.field {
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 8px;
}

.control {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
</style>
