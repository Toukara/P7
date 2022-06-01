<template>
  <div class="container">
    <div class="field">
      <label class="label">Username</label>
      <div class="control">
        <input v-model="registerData.username" class="input" type="text" maxlength="30" minlength="3" />
      </div>
    </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input v-model="registerData.email" class="input" type="email" maxlength="255" minlength="8" />
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input v-model="registerData.password" class="input" type="password" maxlength="255" minlength="8" />
      </div>
    </div>

    <div class="field">
      <label class="label">Confirm Password</label>
      <div class="control">
        <input v-model="registerData.passwordConfirmation" class="input" type="password" maxlength="255" minlength="8" />
      </div>
    </div>

    <div class="field">
      <div class="control">
        <div class="buttons">
          <button class="button is-primary" @click.prevent="register">Sign up</button>
          <router-link class="button is-secondary" to="/login">Log in</router-link>
        </div>
      </div>
    </div>
    <p style="color: red; font-weight: 600">{{ error.message }}</p>
  </div>
</template>

<script>
import axios from "axios";
import validator from "validator";

export default {
  name: "RegisterView",
  data() {
    return {
      registerData: {
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      },
      error: {
        message: "",
        code: "",
      },
    };
  },

  methods: {
    async register() {
      if (this.registerData.password !== this.registerData.passwordConfirmation) {
        this.error.message = "Passwords do not match";
        return;
      } else if (!validator.isEmail(this.registerData.email)) {
        this.error.message = "Email is not valid";
        return;
      } else if (!validator.isLength(this.registerData.password) && !validator.isStrongPassword(this.registerData.password)) {
        this.error.message =
          "Password must be at least 8 characters long and no more than 255 characters long and must contain at least one number, one uppercase letter, and one lowercase letter";
        return;
      } else {
        if (
          this.registerData.username === "" ||
          this.registerData.email === "" ||
          this.registerData.password === "" ||
          this.registerData.passwordConfirmation === ""
        ) {
          this.error.message = "Please fill in all fields";
          return;
        } else {
          let result = await axios.post("http://localhost:3000/api/auth/signup", {
            username: this.registerData.username,
            email: this.registerData.email,
            password: this.registerData.password,
          });

          if (result.status === 201) {
            alert(result.data.message);
            location.replace("/login");
          } else {
            this.error.message = result.data.message;
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.buttons {
  display: flex;
  justify-content: center;
}
</style>
