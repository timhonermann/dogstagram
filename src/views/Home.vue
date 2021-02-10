<template>
  <div class="home">
    <h1>Welcome, {{ name }}</h1>
    <router-link to="/about">About</router-link>
  </div>
</template>

<script lang="ts">
import firebase from "firebase";
import { ref } from "vue";
import User = firebase.User;

export default {
  name: "Home",
  setup() {
    const name = ref("");
    const user = firebase.auth().currentUser;
    if (user) {
      name.value = user.email?.split("@")[0] ?? "";
    } else {
      firebase.auth().onAuthStateChanged((user: User | null) => {
        if (user) {
          name.value = user.email?.split("@")[0] ?? "";
        }
      });
    }

    return {
      name
    };
  }
};
</script>
