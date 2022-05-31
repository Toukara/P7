<template>
  <div class="container">
    <div class="field">
      <label class="label"> Email </label>
      <div class="control">
        <input v-model="email" class="input" type="email" placeholder="e.g JohnDohn@gmail.com" />
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input v-model="password" class="input" type="password" placeholder="Password" />
      </div>
    </div>

    <div class="field">
      <div class="control">
        <div class="buttons">
          <button class="button is-primary" @click.prevent="login">Login</button>
          <router-link class="button is-secondary" to="/signup">Sign up</router-link>
        </div>
      </div>
    </div>
    <p style="color: red; font-weight: 600">{{ error.message }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",

      error: {
        message: "",
        code: "",
      },
    };
  },
  methods: {
    async login() {
      await axios.post("http://localhost:3000/api/auth/login", { email: this.email, password: this.password }).then(
        (response) => {
          if (response.status === 200) {
            alert(response.data.message);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            location.replace("/");
          }
        },
        (error) => {
          this.error.message = error.response.data.message;
          this.error.code = error.response.status;
        }
      );
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
