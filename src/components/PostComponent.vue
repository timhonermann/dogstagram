<template>
  <div v-if="hasLoaded()" class="post-container">
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
        <div class="comments">
          <div class="comment-input">
            <input @keydown.enter="postComment" v-model="newComment" placeholder="add comment..." />
            <button @click="postComment">Post</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { Account } from "@/models";
import { Post } from "@/models/post.model";
import { usersCollection } from "@/settings/firebase";
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
    const newComment = ref("");

    const toggleDetailView = () => {
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

    const postComment = () => {
      console.log("posting comment: ", newComment.value);
      newComment.value = "";
    };

    usersCollection
      .doc(props.post.userUid)
      .get()
      .then((documentSnapshot: DocumentSnapshot) => {
        const account = documentSnapshot.data()?.account as Account;
        username.value = account?.username;
      });

    const hasLoaded = (): boolean => {
      return !!username.value;
    };

    return {
      username,
      showDetailPost,
      newComment,
      toggleDetailView,
      postComment,
      hasLoaded
    };
  }
};
</script>

<style scoped lang="scss">
@import "../style/variables.scss";
@import "../style/mixins.scss";
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
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;

    @include medium-screen {
      flex-direction: row;
    }

    .image-container {
      width: 90%;
      height: 60%;
      padding: 0 30px;
      display: flex;

      @include medium-screen {
        width: 60%;
        height: 90%;
        padding: 0 10px 0 30px;
      }

      img {
        margin: 0 auto;
        place-self: center;
        max-width: calc(100% - 10px);
        max-height: calc(100% - 10px);
      }
    }

    .comments {
      width: 90%;
      height: 40%;
      padding: 0 30px;
      margin-top: 10px;

      @include medium-screen {
        width: 40%;
        height: 90%;
        border-left: $ds_white 1px solid;
        margin: 0;
        padding: 0 30px 0 10px;
      }

      .comment-input {
        display: flex;
        width: 100%;
        justify-content: space-between;
        //flex-direction: column;

        button {
          margin-left: 5px;
        }

        input {
          width: 100%;
        }
      }
    }
  }
}
</style>
