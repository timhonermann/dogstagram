<template>
  <div class="view-container">
    <PostComponent
      v-for="post in posts"
      :post="post"
      :key="post.uuid"
    ></PostComponent>
  </div>
</template>

<script lang="ts">
import PostComponent from "@/components/PostComponent.vue";
import { auth } from "@/settings/firebase";
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Home",
  components: { PostComponent },
  setup() {
    const store = useStore();
    const posts = computed(() => store.getters["allPosts"]);
    store.dispatch("fetchPosts");

    const name = ref("");
    const userUid = ref("");
    const user = auth.currentUser;
    if (user) {
      name.value = user.email?.split("@")[0] ?? "";
      userUid.value = user.uid;
    }

    const hasLoaded = (): boolean => {
      return !!name.value && !!userUid.value;
    };

    return {
      name,
      userUid,
      hasLoaded,
      posts
    };
  }
});
</script>
<style lang="scss">
</style>
