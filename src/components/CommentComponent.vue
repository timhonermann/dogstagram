<template>
  <div class="container">
    <span class="username">{{ comment.username }}:</span>
    <span class="comment">{{ comment.comment }}</span>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
export default {
  name: "CommentComponent",
  props: {
    comment: {
      type: Object as PropType<Comment>,
      required: true
    }
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
