<template>
  <div class="profile">
    <h1>Profile</h1>
    <p>Display Name: {{ displayName }}</p>
    <img :src="photoUrl" alt="Profile picture" />
  </div>
</template>

<script lang="ts">

import { auth } from "@/settings/firebase";
import { ref } from "vue";

export default {
  name: "Profile",
  setup() {
    const displayName = ref("");
    const photoUrl = ref("");

    displayName.value = auth.currentUser?.displayName ?? "No Display Name";
    photoUrl.value = auth.currentUser?.photoURL ?? "https://placekitten.com/200/300";

    return {
      displayName,
      photoUrl
    };
  }
};
</script>

<style scoped lang="scss">
@import "../style/variables.scss";
</style>
