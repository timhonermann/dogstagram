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
      displayText: "Upload",
      routePath: "/upload",
      iconName: "add.png"
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
    padding: 0;
    background: $ds_black;
    color: $ds_white;
    width: 100%;
    height: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;

    #app {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

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
        background-color: $ds_white;
        color: $ds_darkgrey;
        cursor: pointer;
      }

      &:disabled {
        background-color: $ds_grey;
        color: white;
        cursor: default;
      }
    }

    .modal-container {
      border: $ds_white solid 1px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, calc(-50% + 40px));
      height: 80%;
      width: 80%;
      background: $ds_black_transparent;
      display: flex;
      flex-direction: column;
    }

    .view-container {
      width: calc(100% - 30px);
      height: calc(100% - 80px);
      padding: 0 15px;
      display: flex;
      justify-content: center;
      overflow: auto;
    }

    LoadingComponent {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
