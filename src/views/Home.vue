<template>
  <div class="view-container">
    <PostsComponent></PostsComponent>
  </div>
</template>

<script lang="ts">
import PostsComponent from "@/components/PostsComponent.vue";
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  name: "Home",
  components: { PostsComponent }
});
</script>
<style lang="scss">
</style>
