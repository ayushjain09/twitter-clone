import { createRouter, createWebHistory } from "vue-router";
import AuthScreen from "./pages/AuthScreen";
import HomeScreen from "./pages/HomeScreen";
import LoginScreen from "./components/Auth/LoginScreen.vue";
import SignupScreen from "./components/Auth/SignupScreen.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: HomeScreen, meta: { requiresAuth: true } },
    {
      path: "/auth",
      redirect: "/auth/login",
      component: AuthScreen,
      meta: { requiresUnauth: true },
      children: [
        { path: "login", component: LoginScreen },
        { path: "signup", component: SignupScreen },
      ],
    },
    { path: "/:notFound(.*)", redirect: "/home" },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem("token")) next("/auth");
  else if (to.meta.requiresUnauth && localStorage.getItem("token"))
    next("/home");
  else next();
});

export default router;
