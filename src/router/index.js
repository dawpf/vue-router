import Vue from "vue";
import VueRouter from "vue-router";

import News from "./modules/news"
import User from "./modules/user"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue")
  },
  News, User
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 添加导航守卫
// router.beforeEach((to, from, next) => {
//   // ...
// })

export default router;
