<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img class="logo" src=".././public/icon.png" />
      </a>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click="showNav = !showNav" :class="{ 'is-active': showNav }">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" v-bind:class="{ 'is-active': showNav }">
      <div class="navbar-start">
        <a class="navbar-item home" href="/"> Home </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <div v-if="user" class="logoutBouton">
              <router-link class="button is-primary" :to="`/users/${this.currentUser.id}`">
                Profile
                <img
                  class="avatar profile_button"
                  v-if="this.currentUser.avatar"
                  :src="`http://localhost:3000/avatar/${this.currentUser.avatar}`"
                  alt="@me avatar"
                />
              </router-link>
              <button class="button is-danger" @click="logout">Logout</button>
            </div>
            <div v-else class="loginButtons">
              <a class="button is-primary" href="/signup">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light" href="/login"> Log in </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <router-view />
</template>

<script>
import { axios } from "./utilities/axios";
export default {
  data() {
    return {
      user: null,

      currentUser: {
        id: localStorage.getItem("userId"),
        authLevel: null,
      },

      showNav: false,
    };
  },
  async created() {
    this.user = localStorage.getItem("token");

    await axios.get(`/users/${this.currentUser.id}`).then((response) => {
      this.currentUser.authLevel = response.data.authLevel;
      this.currentUser.avatar = response.data.avatar;
    });
  },
  methods: {
    logout() {
      localStorage.clear();
      this.user = null;
      location.replace("/login");
    },
  },
};
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
}

.logo {
  width: 100%;
  height: 100%;
  min-height: 60px;
  max-height: 150px;
}

.profile_button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-left: 10px;
}
</style>

<style scoped>
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2em;
}
</style>
