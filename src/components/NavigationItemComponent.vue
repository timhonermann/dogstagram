<template>
  <div class="navigation-item">
    <img :src="require(`@/assets/icons/${iconName}`)" alt="Nav Item Image" />
    <p data-test="displayName" >{{ displayName }}</p>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "NavigationItemComponent",
  props: {
    displayName: {
      type: String,
      required: true
    },
    iconName: {
      type: String,
      required: true
    }
  }
})
export default class NavigationItemComponent extends Vue {
  displayName = "";
  iconName = "";
}
</script>

<style scoped lang="scss">
@import "../style/variables.scss";
.navigation-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  img {
    height: 24px;
    width: 24px;
  }

  p {
    margin: 0;
  }
}
</style>
