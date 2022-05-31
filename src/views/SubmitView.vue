<template>
  <div class="container">
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input class="input" type="text" placeholder="Title" />
      </div>
    </div>

    <div class="field">
      <label class="label">Message</label>
      <div class="control">
        <textarea class="textarea" placeholder="Textarea"></textarea>
      </div>
    </div>

    <div class="file has-name">
      <label class="file-label">
        <input class="file-input" type="file" name="resume" />
        <span class="file-cta">
          <span class="file-icon">
            <font-awesome-icon icon="upload" />
          </span>
          <span class="file-label"> Choose a file… </span>
        </span>
        <span class="file-name"> Screen Shot 2017-07-29 at 15.54.25.png </span>
      </label>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link">Submit</button>
      </div>
      <div class="control">
        <button class="button is-link is-light">Cancel</button>
      </div>
      <div class="control">
        <button class="button is-light">Save To Draft</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreatePost",
  data() {
    return {
      post: {
        title: "",
        content: "",
        attachment: "",
        authorId: "",
      },
    };
  },
};
</script>

<style></style>
