<template>
  <div class="post-container">
  </div>
</template>

<script lang="ts">
import { Post } from "@/models/post.model";
import { Options, Vue } from "vue-class-component";

@Options({
  name: "PostComponent",
  props: {
    post: {
      type: Object,
      required: true
    }
  }
})
export default class PostComponent extends Vue {
  post: Post = {} as Post;
}
</script>

<style scoped lang="scss">
@import "../style/variables.scss";
</style>
