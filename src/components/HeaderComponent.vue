<template>
  <div class="header">
    <div class="logo-container">
      <img
        class="logo"
        src="@/assets/dogstagram_icon_white.png"
        alt="dogstagram Logo"
      />
      <div class="section-name-container">
        <span>{{ sectionName }}</span>
      </div>
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
</template>

<script lang="ts">
import NavigationItemComponent from "@/components/NavigationItemComponent.vue";
import { NavigationItem } from "@/models/navigation-item.model";
import router from "@/router";
import { auth } from "@/settings/firebase";
import { computed, PropType, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "HeaderComponent",
  components: {
    NavigationItemComponent
  },
  props: {
    navigationItems: {
      type: Object as PropType<NavigationItem[]>,
      required: true
    }
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const sectionName = computed(() => {
      const sectionName = router.currentRoute.value.name;
      if (sectionName !== "User Detail") {
        return router.currentRoute.value.name;
      } else {
        return store.getters["getUsername"](route.params.userId);
      }
    });

    const navigate = (path: string) => {
      router.replace(path);
    };

    const logout = () => {
      auth.signOut();
      router.replace("/login");
    };


    return {
      sectionName,
      navigate,
      logout
    };
  }
}
</script>

<style scoped lang="scss">
@import "../style/variables.scss";
@import "../style/mixins.scss";
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

    .section-name-container {
      display: none;

      @include medium-screen {
        display: block;
      }
    }

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
