import { auth } from "@/settings/firebase";
import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw
} from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      isLoginPage: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: {
      isLoginPage: true
    }
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/"
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
    const isLoginPage = to.matched.some(x => x.meta.isLoginPage);

    if (requiresAuth && !auth.currentUser) {
      next("/login");
    } else if (isLoginPage && auth.currentUser) {
      next("/");
    } else {
      next();
    }
  }
);

export default router;
