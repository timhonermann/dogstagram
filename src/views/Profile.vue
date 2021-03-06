<template>
  <div class="view-container">
    <div class="profile">
      <div class="profile-information-container">
        <ProfileInformationComponent
          :account="account"
        ></ProfileInformationComponent>
      </div>
      <div class="user-posts">
        <PostsComponent :user-id="userId"></PostsComponent>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import PostsComponent from "@/components/PostsComponent.vue";
import ProfileInformationComponent from "@/components/ProfileInformationComponent.vue";
import { auth } from "@/settings/firebase";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Profile",
  components: { ProfileInformationComponent, PostsComponent },
  setup() {
    const store = useStore();
    const userId = auth.currentUser?.uid;
    const account = computed(() => store.getters["getAccount"]);
    store.dispatch("fetchAccount", { userId: userId });

    return {
      account,
      userId
    };
  }
};
</script>

<style scoped lang="scss">
@import "../style/variables.scss";

.profile {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .profile-information-container {
    width: 100%;
    height: 110px;
  }

  .user-posts {
    height: calc(100% - 110px);
    display: flex;
    border-top: solid 1px $ds_grey;
    margin-top: 10px;
    overflow: auto;
  }
}
</style>
