import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FavView from "../views/FavView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/fav",
      name: "fav",
      component: FavView,
    },
  ],
});

export default router;
