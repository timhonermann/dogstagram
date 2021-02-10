<template>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import { useRouter } from "vue-router";
import firebase from 'firebase';
import { isRoutePathLoginOrRegister } from "@/functions/is-route-path-login-or-register.function";

export default defineComponent({
  name: 'App',
  setup() {
    const router = useRouter();

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
        if (!user) {
          router.replace('/login');
        } else if (isRoutePathLoginOrRegister()) {
          router.replace('/');
        }
      })
    });
  }
});
</script>

<style lang="scss">
body {
  background: #2c3e50;
  color: #FFF;

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
