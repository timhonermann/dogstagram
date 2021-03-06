<template>
  <div class="profile-container">
    <div class="profile-info-container">
      <label for="username">Username:</label>
      <div class="profile-info">
        <input
          id="username"
          :placeholder="account.username"
          v-model="username"
          maxlength="16"
        />
        <span class="username-size">{{ username?.length ?? 0 }}/16</span>
      </div>
      <button :disabled="!isDirty" @click="changeUsername">Change</button>
    </div>
  </div>
</template>

<script lang="ts">
import { auth } from "@/settings/firebase";
import { computed, inject, PropType, ref } from "vue";
import { Account } from "@/models";
import { Toast } from "vue-dk-toast";
import { useStore } from "vuex";

export default {
  name: "ProfileInformationComponent",
  props: {
    account: {
      type: Object as PropType<Account>,
      required: true
    }
  },
  setup(props: any) {
    const store = useStore();
    const toast = inject<Toast>("$toast");

    const userId = auth.currentUser?.uid;
    const username = ref("");

    const isDirty = computed(
      () =>
        username.value !== props?.account?.username &&
        username.value?.length >= 3
    );

    const changeUsername = () => {
      const payload = {
        userId: userId,
        username: username.value
      };
      store.dispatch("updateUsername", payload).then(() => {
        if (toast) {
          toast("Changed Username", { type: "success" });
        }
        username.value = "";
      });
    };

    return {
      username,
      userId,
      isDirty,
      changeUsername
    };
  }
};
</script>

<style scoped lang="scss">
@import "../style/variables.scss";
.profile-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .profile-info-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0;

    .profile-info {
      display: flex;
      flex-direction: column;

      .username-size {
        text-align: end;
      }
    }
  }
}
</style>
