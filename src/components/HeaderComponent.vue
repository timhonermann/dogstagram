<template>
  <div class="header">
    <div class="logo-container">
      <img
        class="logo"
        src="@/assets/dogstagram_icon_white.png"
        alt="dogstagram Logo"
      />
    </div>
    <div class="navigation">
      <div
        class="nav-item"
        v-for="navItem in navigationItems"
        v-bind:key="navItem.routePath"
      >
        <NavigationItemComponent
          :displayName="navItem.displayText"
          :iconName="navItem.iconName"
          @click="navigate(navItem.routePath)"
        ></NavigationItemComponent>
      </div>
    </div>
    <div class="profile">
      <button class="logout" @click="logout">Logout</button>
    </div>
  </div>
  <teleport to="#modals">
    <div v-if="isUploadView" class="modal-container">
    </div>
  </teleport>
</template>

<script lang="ts">
import NavigationItemComponent from "@/components/NavigationItemComponent.vue";
import { NavigationItem } from "@/models/navigation-item.model";
import router from "@/router";
import { auth } from "@/settings/firebase";
import { ref } from "vue";
import { Options, Vue } from "vue-class-component";

@Options({
  name: "HeaderComponent",
  components: {
    NavigationItemComponent
  },
  props: {
    navigationItems: {
      type: Object,
      required: true
    }
  },
})
export default class HeaderComponent extends Vue {
  navigationItems: NavigationItem[] = [];
  isUploadView = ref(false);

  navigate = (path: string) => {
    router.replace(path);
  };

  logout = () => {
    auth.signOut();
    router.replace("/login");
  };
}
</script>

<style scoped lang="scss">
@import "../style/variables.scss";
.header {
  width: 100%;
  height: 80px;
  display: flex;
  background-color: $ds_darkgrey;
  justify-content: space-between;

  .logo-container {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;

    .logo {
      width: auto;
      height: calc(100% - 20px);
      padding: 5px 15px;
    }
  }

  .navigation {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .nav-item {
      display: flex;
      cursor: pointer;
    }
  }

  .profile {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 15px;
  }
}
</style>
