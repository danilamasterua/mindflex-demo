import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue";
import Dashboard from "@/views/Dashboard.vue";
import Game from "@/views/Game.vue";
import GP_Stage_Memorization from "@/components/Game_Pairs/GP_Stage_Memorization.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/dashboard",
      component: Dashboard
    },
    {
      path: "/game",
      component: Game,
    }
  ]
})

export default router
