<template>
  <HeaderComponent v-if="isLoggedIn" v-bind:navigation-items="navItems"></HeaderComponent>
  <router-view />
</template>

<script lang="ts">
import { NavigationItem } from "@/models/navigation-item.model";
import { auth } from "@/settings/firebase";
import firebase from "firebase";
import { defineComponent, onBeforeMount, ref } from "vue";
import HeaderComponent from "./components/HeaderComponent.vue";

export default defineComponent({
  name: "App",
  components: {
    HeaderComponent
  },
  setup() {
    const navItems: NavigationItem[] = [];
    const isLoggedIn = ref(!!auth.currentUser);
    navItems.push({
      displayText: "Home",
      routePath: "/home",
      iconName: "home.png"
    });
    navItems.push({
      displayText: "Profile",
      routePath: "/profile",
      iconName: "profile.png"
    });

    onBeforeMount(() => {
      auth.onAuthStateChanged((user: firebase.User | null) => {
        isLoggedIn.value = !!user;
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
@import "./style/variables.scss";
html {
  width: 100%;
  height: 100%;

  body {
    margin: 0;
    background: $ds_blue;
    color: white;
    width: 100%;
    height: 100%;

    a {
      color: inherit;
    }

    button {
      border: 2px solid white;
      border-radius: 20%;
      background-color: $ds_darkgrey;
      padding: 5px;
      color: inherit;

      &:hover {
        background-color: white;
        color: $ds_darkgrey;
        cursor: pointer;
      }
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
