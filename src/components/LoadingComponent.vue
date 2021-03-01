<template>
  <div class="spinner-container">
    <div class="spinner"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: "LoadingComponent"
};
</script>

<style scoped lang="scss">
@import "../style/variables.scss";
.spinner-container {
  width: 100%;
  height: calc(100% - 80px);
  background: $ds_darkgrey;
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner {
    border: 10px solid $ds_darkgrey;
    border-radius: 50%;
    border-top: 10px solid $ds_white;
    width: 50px;
    height: 50px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
  }
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
