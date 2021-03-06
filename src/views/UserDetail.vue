<template>
  <div class="view-container">
    <PostsComponent :user-id="userId"></PostsComponent>
  </div>
</template>

<script lang="ts">
import PostsComponent from "@/components/PostsComponent.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "UserDetail",
  components: { PostsComponent },
  setup() {
    const store = useStore();
    const route = useRoute();
    const userId = route.params.userId;

    const username = computed(() => store.getters["getUsername"](userId));
    store.dispatch("fetchUsername", { userId });

    return {
      userId,
      username
    };
  }
};
</script>

<style scoped lang="scss">

</style>
