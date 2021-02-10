<template>
  <div class="header">
    <p v-for="navItem in navigationItems" v-bind:key="navItem.routePath">
      displayText: {{ navItem.displayText }}, path: {{ navItem.routePath }}
    </p>
  </div>
</template>

<script lang="ts">
import { NavigationItem } from "@/models/navigation-item.model";
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    navigationItems: {
      type: Object,
      required: true
    }
  }
})
export default class HelloWorld extends Vue {
  navigationItems: NavigationItem[] = [];
}
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 80px;
  display: flex;
  background-color: gray;
  justify-content: space-around;
}
</style>
