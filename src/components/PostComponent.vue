<template>
  <div class="post-container">
    <div class="name-container">
      <p>{{ username }}</p>
    </div>
    <img :src="post?.image" alt="post" />
  </div>
</template>

<script lang="ts">
import { Account } from "@/models";
import { Post } from "@/models/post.model";
import { usersCollection } from "@/settings/firebase";
import firebase from "firebase";
import { defineComponent, toRefs, PropType, ref } from "vue";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

export default{
  name: "PostComponent",
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true
    }
  },
  setup(props: any) {
    const username = ref("");

    usersCollection
      .doc(props.post.userUid)
      .get()
      .then((documentSnapshot: DocumentSnapshot) => {
        const account = documentSnapshot.data()?.account as Account;
        username.value = account?.username;
      });

    return {
      username
    };
  }
};
</script>

<style scoped lang="scss">
@import "../style/variables.scss";
</style>
