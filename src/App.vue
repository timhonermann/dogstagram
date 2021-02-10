<template>
  <Header v-if="isLoggedIn" v-bind:navigation-items="navItems"></Header>
  <router-view />
</template>

<script lang="ts">
import { isRoutePathLoginOrRegister } from "@/functions/is-route-path-login-or-register.function";
import { NavigationItem } from "@/models/navigation-item.model";
import { defineComponent, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import firebase from "firebase";
import Header from "./components/Header.vue";

export default defineComponent({
  name: "App",
  components: {
    Header
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const navItems: NavigationItem[] = [];
    const isLoggedIn = ref(false);
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
        isLoggedIn.value = !!user;
        if (!isLoggedIn.value) {
          router.replace("/login");
        } else if (isRoutePathLoginOrRegister(route)) {
          router.replace("/");
        }
      });
    });

    return {
      navItems,
      isLoggedIn
    };
  }
});
</script>

<style lang="scss">
html {
  width: 100%;
  height: 100%;

  body {
    margin: 0;
    background: #2c3e50;
    color: #fff;
    width: 100%;
    height: 100%;

    a {
      color: inherit;
    }
  }
}
#app {
  width: 100%;
  height: 100%;
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
