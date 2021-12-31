import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import Home from "@/views/Home.vue";
import AddTask from "@/views/AddTask.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/add-task",
    name: "AddTask",
    component: AddTask,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // wait for route transition leave
    setTimeout(() => {
      document.querySelector("main").scrollTo(0, 0);
    }, 150);
  },
});

router.beforeEach((to, from, next) => {
  //close side nav when redirect
  store.commit("setSideNavStatus", false);
  next();
});

export default router;
