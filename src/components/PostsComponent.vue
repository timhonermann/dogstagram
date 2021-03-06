<template>
  <div class="posts">
    <div class="post" v-for="post in posts" :key="post.uuid">
      <PostItemComponent :post="post"></PostItemComponent>
    </div>
    <div class="no-posts">
      <h1 v-if="posts.length === 0">Nothing has been posted yet...</h1>
    </div>
  </div>
</template>

<script lang="ts">
import PostItemComponent from "@/components/PostItemComponent.vue";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "PostsComponent",
  components: { PostItemComponent },
  props: {
    userId: {
      type: String,
      required: false
    }
  },
  setup(props: any) {
    const store = useStore();
    const posts = computed(() => {
      if (props.userId) {
        return store.getters["userPosts"](props.userId);
      } else {
        return store.getters["allPosts"];
      }
    });
    store.dispatch("fetchPosts");

    return {
      posts
    };
  }
};
</script>

<style scoped lang="scss">
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

  .no-posts {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
}
</style>
