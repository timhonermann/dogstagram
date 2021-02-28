<template>
  <div class="profile">
    <h1>Profile</h1>
    <p>Display Name: {{ displayName }}</p>
    <img :src="photoUrl" alt="Profile picture" />
  </div>
</template>

<script lang="ts">

import { auth, usersCollection } from "@/settings/firebase";
import { ref } from "vue";
import firebase from "firebase";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import { Account } from "@/models";

export default {
  name: "Profile",
  setup() {
    const displayName = ref("");
    const photoUrl = ref("");

    usersCollection.doc(auth.currentUser?.uid).get().then((documentSnapshot: DocumentSnapshot) => {
      const account = documentSnapshot.data()?.account as Account;
      displayName.value = account?.username;
    });
    photoUrl.value =
      auth.currentUser?.photoURL ?? "https://placekitten.com/200/300";

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
