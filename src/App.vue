<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> | <router-link to="/login">Log in</router-link> |
    <router-link to="/signup">Sign up</router-link>
   
    <div class="logoutBouton">
      <button class="button is-danger" v-if="user" @click="logout">Logout</button>
    </div>
  </nav> -->

  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img class="logo" src=".././public/icon.png" />
      </a>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item"> Home </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <div v-if="user" class="logoutBouton">
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
export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.user = localStorage.getItem("token");
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
</style>
