<template>
  <div class="view-container">
    <div class="posts">
      <div class="post" v-for="post in posts" :key="post.uuid">
        <PostComponent :post="post"></PostComponent>
      </div>
    </div>
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
@import "../style/mixins.scss";
.posts {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  height: 100%;

  &::after {
    content: "";
    display: block;
    flex: 0 0 100%;

    @include medium-screen {
      flex: 0 0 45%;
    }

    @include large-screen {
      flex: 0 0 30%;
    }
  }

  .post {
    width: 100%;
    height: 80%;
    margin-top: 10px;

    @include medium-screen {
      width: 45%;
      height: 40%;
    }

    @include large-screen {
      width: 30%;
      height: 40%;
    }
  }
}
</style>
