<template>
  <header v-bind:navigation-items="navItems"></header>
  <router-view />
</template>

<script lang="ts">
import { isRoutePathLoginOrRegister } from "@/functions/is-route-path-login-or-register.function";
import { NavigationItem } from "@/models/navigation-item.model";
import { defineComponent, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import firebase from "firebase";

export default defineComponent({
  name: "App",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const navItems: NavigationItem[] = [];
    navItems.push({
      displayText: "Nav 1",
      routePath: "/home"
    });
    navItems.push({
      displayText: "Nav 2",
      routePath: "/about"
    });
    navItems.push({
      displayText: "Nav 3",
      routePath: "/contact"
    });

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
        if (!user) {
          router.replace("/login");
        } else if (isRoutePathLoginOrRegister(route)) {
          router.replace("/");
        }
      });
    });

    return {
      navItems
    };
  }
});
</script>

<style lang="scss">
body {
  background: #2c3e50;
  color: #fff;

  a {
    color: inherit;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: red;
  }
}
</style>
