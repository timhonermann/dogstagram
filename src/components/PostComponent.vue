<template>
  <div class="post-container">
    <div class="name-container">
      <p>{{ username }}</p>
    </div>
    <img
      @click="toggleDetailView"
      class="image"
      :src="post?.image"
      alt="post"
    />
    <div class="caption-container">
      <p>{{ post?.caption }}</p>
    </div>
  </div>
  <teleport to="#modals">
    <div v-if="showDetailPost" class="detail-container">
      <div class="post-header">
        <span>{{ username }}</span>
        <button class="close" @click="toggleDetailView">X</button>
      </div>
      <div class="image-comments-container">
        <div class="image-container">
          <img :src="post.image" alt="post" />
        </div>
        <div class="comments"></div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { Account } from "@/models";
import { Post } from "@/models/post.model";
import { commentsCollection, usersCollection } from "@/settings/firebase";
import firebase from "firebase";
import { PropType, ref } from "vue";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

export default {
  name: "PostComponent",
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true
    }
  },
  setup(props: any) {
    const username = ref("");
    const showDetailPost = ref(false);
    const comments = ref([] as Comment[]);

    const toggleDetailView = () => {
      console.log("triggered: ", showDetailPost.value);
      showDetailPost.value = !showDetailPost.value;
      // if (showDetailPost.value) {
      //   commentsCollection
      //     .doc(props.post?.uuid)
      //     .get()
      //     .then((documentSnapshot: DocumentSnapshot) => {
      //       comments.value = documentSnapshot.data() as Comment[];
      //     });
      // }
    };

    usersCollection
      .doc(props.post.userUid)
      .get()
      .then((documentSnapshot: DocumentSnapshot) => {
        const account = documentSnapshot.data()?.account as Account;
        username.value = account?.username;
      });

    return {
      username,
      showDetailPost,
      toggleDetailView
    };
  }
};
</script>

<style scoped lang="scss">
@import "../style/variables.scss";
.post-container {
  .image {
    cursor: pointer;
  }
}

.detail-container {
  border: $ds_white solid 1px;
  border-radius: 5%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, calc(-50% + 40px));
  height: 80%;
  width: 80%;
  background: $ds_darkgrey;
  display: flex;
  flex-direction: column;

  .post-header {
    width: calc(100% - 60px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
    cursor: default;

    .close {
      width: 30px;
    }
  }

  .image-comments-container {
    display: flex;
    width: 100%;
    height: 100%;

    .image-container {
      width: 60%;
      height: 90%;
      padding: 0 10px;
      display: flex;

      img {
        margin: 0 auto;
        place-self: center;
        max-width: calc(100% - 10px);
        max-height: calc(100% - 10px);
      }
    }

    .comments {
      width: 40%;
      height: 90%;
      padding: 0 10px;
      border-left: $ds_white 1px solid;
    }
  }
}
</style>
