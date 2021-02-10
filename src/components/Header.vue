<template>
  <div class="header">
    <div class="logo-container">
      <img class="logo" src="../assets/Logo.png" alt="dogstagram Logo" />
    </div>
    <div class="navigation">
      <p v-for="navItem in navigationItems" v-bind:key="navItem.routePath">
        displayText: {{ navItem.displayText }}, path: {{ navItem.routePath }}
      </p>
    </div>
    <div class="profile">
      <button class="logout" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script lang="ts">
import { NavigationItem } from "@/models/navigation-item.model";
import firebase from "firebase";
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    navigationItems: {
      type: Object,
      required: true
    }
  }
})
export default class HelloWorld extends Vue {
  navigationItems: NavigationItem[] = [];

  logout = () => {
    firebase.auth().signOut();
  };
}
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 80px;
  display: flex;
  background-color: gray;
  justify-content: space-between;

  .logo-container {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;

    .logo {
      width: auto;
      height: calc(100% - 20px);
      padding: 5px;
      cursor: pointer;
    }
  }

  .navigation {
    width: auto;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .profile {
    width: 10%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
