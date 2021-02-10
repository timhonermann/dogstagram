<template>
  <div class="home">
    <h1>Welcome, {{ name }}</h1>
    <router-link to="/about">About</router-link>
    <br />
    <button class="logout" @click="logout">Logout</button>
  </div>
</template>

<script lang="ts">
import firebase from "firebase";
import { onBeforeMount, ref } from "vue";
import { Options, Vue } from "vue-class-component";

@Options({
  data() {
    const name = ref("");

    const logout = () => {
      firebase.auth().signOut();
    };

    onBeforeMount(() => {
      const user = firebase.auth().currentUser;
      if (user) {
        name.value = user.email?.split("@")[0] ?? "User Error";
      }
    });

    return {
      name,
      logout
    };
  }
})
export default class Home extends Vue {}
</script>
