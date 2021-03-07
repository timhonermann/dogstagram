<template>
  <div class="container">
    <span class="username" data-test="username" @click="redirectToUserDetailPage(comment.userUid)">{{ comment.username }}:</span>
    <span class="comment" data-test="comment">{{ comment.comment }}</span>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { redirectToUserDetailPage } from "@/functions"
export default {
  name: "CommentComponent",
  props: {
    comment: {
      type: Object as PropType<Comment>,
      required: true
    }
  },
  methods: {
    redirectToUserDetailPage: redirectToUserDetailPage
  }
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  align-items: flex-start;
  margin-bottom: 10px;

  .username {
    font-style: italic;
    font-size: 12px;
  }

  .comment {
    margin-left: 10px;
    width: calc(100% - 10px);
    word-break: break-word;
    text-align: start;
  }
}
</style>
