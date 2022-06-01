import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

function removeQueryParams(to) {
  if (Object.keys(to.query).length) return { path: to.path, query: {}, hash: to.hash };
}

function removeHash(to) {
  if (to.hash) return { path: to.path, query: to.query, hash: "" };
}

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    beforeEnter: [removeQueryParams],
  },
  {
    path: "/login",
    name: "login",
    beforeEnter: [removeQueryParams],
    component: () => import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    beforeEnter: [removeQueryParams],
    component: () => import(/* webpackChunkName: "about" */ "../views/RegisterView.vue"),
  },
  {
    path: "/submit",
    name: "submit",
    beforeEnter: [removeQueryParams],
    component: () => import(/* webpackChunkName: "about" */ "../views/SubmitView.vue"),
  },
  {
    path: "/posts/:id/edit",
    name: "editPost",
    beforeEnter: [removeQueryParams, removeHash],
    component: () => import(/* webpackChunkName: "about" */ "../views/EditPostView.vue"),
    props: true,
  },
  {
    path: "/posts/:id",
    name: "posts",
    beforeEnter: [removeQueryParams, removeHash],
    component: () => import(/* webpackChunkName: "about" */ "../views/PostView.vue"),
    props: true,
  },
  {
    path: "/users/:id",
    name: "users",
    beforeEnter: [removeQueryParams, removeHash],

    component: () => import(/* webpackChunkName: "about" */ "../views/UserProfileView.vue"),
    props: true,
  },
  {
    path: "/users/:id/edit",
    name: "editUser",
    beforeEnter: [removeQueryParams, removeHash],
    component: () => import(/* webpackChunkName: "about" */ "../views/EditUserView.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.name !== "login" && !localStorage.getItem("token")) next({ name: "login" });
//   else next();
// });

export default router;
