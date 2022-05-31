<template>
  <div class="container">
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input v-model="this.post.title" class="input" type="text" placeholder="Title" />
      </div>
    </div>

    <div class="field">
      <label class="label">Message</label>
      <div class="control">
        <textarea v-model="this.post.content" class="textarea" placeholder="Textarea"></textarea>
      </div>
    </div>

    <div class="file has-name">
      <label class="file-label">
        <input
          class="file-input"
          type="file"
          name="resume"
          @change="uploadFile"
          ref="file"
          accept="audio/mpeg,audio/mp3,audio/wav,video/mp4,video/avi,video/quicktime,image/jpg,image/jpeg,image/png,image/gif"
        />
        <span class="file-cta">
          <span class="file-icon">
            <font-awesome-icon icon="upload" />
          </span>
          <span class="file-label"> Choose a file… </span>
        </span>
        <span v-if="this.post.attachment" class="file-name"> {{ this.post.attachment.name }} </span>
      </label>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="updatePost">Update</button>
      </div>
      <div class="control">
        <router-link class="button is-link is-light" to="/">Cancel</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { axios } from "../utilities/axios";

export default {
  name: "EditPostComponent",
  data() {
    return {
      post: {
        title: null,
        content: null,
        attachment: null,
      },
    };
  },
  methods: {
    async uploadFile() {
      this.post.attachment = this.$refs.file.files[0];
    },

    updatePost() {
      const formData = new FormData();
      if (this.post.attachment) {
        formData.append("attachment", this.post.attachment);
      }
      if (this.post.title) {
        formData.append("title", this.post.title);
      }
      if (this.post.content) {
        formData.append("content", this.post.content);
      }
      axios
        .patch(`/posts/${this.$route.params.id}`, formData, {
          Headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            alert(response.data.message);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.field {
  text-align: left;
}

.label {
  margin-left: 6px;
}

.button {
  margin-top: 12px;
}
</style>
