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
        <button class="button is-link" @click="createPost">Submit</button>
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
  name: "CreatePost",
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
      console.log(this.post.attachment);
    },

    async createPost() {
      const formData = new FormData();
      formData.append("title", this.post.title);
      formData.append("content", this.post.content);
      formData.append("attachment", this.post.attachment);

      const response = await axios.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert(response.data.message);
        location.replace("/");
      }
      console.log(response);
    },
  },
};
</script>

<style lang="scss" scoped>
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
