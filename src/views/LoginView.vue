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
        <button class="button is-primary" @click.prevent="login">Login</button>
        <router-link class="button is-secondary" to="/signup">Sign up</router-link>
      </div>
    </div>
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
    };
  },
  methods: {
    async login() {
      let result = await axios.post("http://localhost:3000/api/auth/login", { email: this.email, password: this.password });

      if (result.status === 200) {
       alert(result.data.message);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("userId", result.data.userId);
        location.replace("/")
      }
    },
  },
};
</script>
