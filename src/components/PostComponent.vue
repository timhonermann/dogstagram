<template>
  <div class="navigation-item">
    <img :src="require(`@/assets/icons/${iconName}`)" alt="Nav Item Image" />
    <p>{{ displayName }}</p>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "PostComponent",
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
export default class PostComponent extends Vue {
}
</script>

<style scoped lang="scss">
@import "../style/variables.scss";
</style>
