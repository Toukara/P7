<template>
  <div class="container">
    <div class="field">
      <label class="label">Username</label>
      <div class="control">
        <input v-model="newData.username" class="input" type="text" maxlength="30" minlength="3" />
      </div>
    </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input v-model="newData.email" class="input" type="email" maxlength="255" minlength="8" />
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input v-model="newData.password" class="input" type="password" maxlength="255" minlength="8" />
      </div>
    </div>

    <div class="field">
      <label class="label">Confirm Password</label>
      <div class="control">
        <input v-model="newData.passwordConfirmation" class="input" type="password" maxlength="255" minlength="8" />
      </div>
    </div>

    <div class="field">
      <label class="label">Bio</label>
      <div class="control">
        <textarea v-model="newData.bio" class="textarea" maxlength="150"></textarea>
      </div>

      <div class="file has-name avatarEdit">
        <label class="file-label">
          <input class="file-input" type="file" name="resume" @change="uploadAvatar" ref="file" accept="image/jpg,image/jpeg,image/png,image/gif" />
          <span class="file-cta">
            <span class="file-icon">
              <font-awesome-icon icon="upload" />
            </span>
            <span class="file-label"> Choose a file… </span>
          </span>
          <span v-if="this.newData.avatar" class="file-name"> {{ this.newData.avatar.name }} </span>
        </label>
      </div>

      <div class="buttonToEdit">
        <button class="button is-primary" @click.prevent="updateUser">Update</button>
      </div>

      <p style="color: red; font-weight: 600">{{ error.message }}</p>
    </div>
    {{ this.newData }}
  </div>
</template>

<script>
import { axios } from "../utilities/axios";
import validator from "validator";

export default {
  name: "EditUserView",
  data() {
    return {
      newData: {},

      error: {
        message: "",
        code: "",
      },
    };
  },

  methods: {
    uploadAvatar() {
      this.newData.avatar = this.$refs.file.files[0];
    },

    updateUser() {
      const formData = new FormData();
      formData.append("avatar", this.newData.avatar);

      if (this.newData.username) {
        if (!validator.isAlphanumeric(this.newData.username)) {
          this.error.message = "Username must be alphanumeric";
          this.error.code = "username";
          return;
        } else {
          formData.append("username", this.newData.username);
        }
      }

      if (this.newData.email) {
        if (!validator.isEmail(this.newData.email)) {
          this.error.message = "Email must be valid";
          this.error.code = "email";
          return;
        } else {
          formData.append("email", this.newData.email);
        }
      }

      if (this.newData.password) {
        if (this.newData.passwordConfirmation) {
          if (validator.equals(this.newData.password, this.newData.passwordConfirmation)) {
            if (validator.isStrongPassword(this.newData.password)) {
              formData.append("password", this.newData.password);
            } else {
              this.error.message = "Password must be at least 8 characters long and contain at least one number, one uppercase and one lowercase letter";
              this.error.code = "password";
              return;
            }
          } else {
            this.error.message = "Passwords must match";
            this.error.code = "password";
            return;
          }
        } else {
          this.error.message = "Confirm password must be filled";
          this.error.code = "passwordConfirmation";
          return;
        }
      }

      if (this.newData.passwordConfirmation) {
        if (this.newData.password !== this.newData.passwordConfirmation) {
          this.error.message = "Passwords must match";
          this.error.code = "passwordConfirmation";
          return;
        } else {
          formData.append("passwordConfirmation", this.newData.passwordConfirmation);
        }
      }

      if (this.newData.bio) {
        formData.append("bio", this.newData.bio);
      }

      axios
        .put(`/users/${this.$route.params.id}`, formData)
        .then((response) => {
          if (response.data.error) {
            this.error.message = response.data.error.message;
            this.error.code = response.data.error.code;
          } else {
            alert(response.data.message);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          this.error.message = error.response.data.message;
          this.error.code = error.response.data.code;
        });
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

.avatarEdit,
.buttonToEdit {
  margin-top: 12px;
}
</style>
