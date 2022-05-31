import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import(/* webpackChunkName: "about" */ "../views/RegisterView.vue"),
  },
  {
    path: "/submit",
    name: "submit",
    component: () => import(/* webpackChunkName: "about" */ "../views/SubmitView.vue"),
  },
  {
    path: "/posts/:id",
    name: "posts",
    component: () => import(/* webpackChunkName: "about" */ "../views/PostView.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
