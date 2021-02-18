<template>
  <div class="home">
    <h1>Welcome, {{ name }}</h1>
    <p>UID: {{ userUid }}</p>
    <router-link to="/profile">Profile</router-link>
  </div>
</template>

<script lang="ts">
import { auth } from "@/settings/firebase";
import { ref } from "vue";

export default {
  name: "Home",
  setup() {
    const name = ref("");
    const userUid = ref("");
    const user = auth.currentUser;
    if (user) {
      name.value = user.email?.split("@")[0] ?? "";
      userUid.value = user.uid;
    }

    return {
      name,
      userUid
    };
  }
};
</script>
