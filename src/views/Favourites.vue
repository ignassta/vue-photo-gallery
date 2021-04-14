<template>
  <div class="favourites" :class="{'light-mode' : lightMode}">
  </div>
</template>

<script>
export default {
  props: {
    lightMode: Boolean
  }
}
</script>
<style lang="scss">
  @import '../assets/style/variables';
  .favourites {
    padding: 20px 20px 20px 110px;
    background-color: $color2;
    min-height: calc(100vh - 40px);
  }
  .favourites.light-mode {
    background-color: $color4;
  }
</style>
