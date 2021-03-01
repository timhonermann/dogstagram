<template>
  <div class="home">
    <PostComponent
      v-for="post in posts"
      :post="post"
      :key="post.uuid"
    ></PostComponent>
  </div>
</template>

<script lang="ts">
import PostComponent from "@/components/PostComponent.vue";
import { Post } from "@/models/post.model";
import { auth } from "@/settings/firebase";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Home",
  components: { PostComponent },
  setup() {
    const name = ref("");
    const userUid = ref("");
    const user = auth.currentUser;
    if (user) {
      name.value = user.email?.split("@")[0] ?? "";
      userUid.value = user.uid;
    }

    const posts: Post[] = [
      {
        uuid: "1234",
        userUid: auth.currentUser?.uid,
        image: "https://picsum.photos/200/300",
        caption:
          "This is my cat. I am very proud of her, even though she's an asshole most of the time. My dog Jackson is very gentle with here despite his impulsive nature"
      } as Post
    ];

    return {
      name,
      userUid,
      posts
    };
  }
});
</script>
