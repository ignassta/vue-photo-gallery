<template>
  <navigation-bar/>
  <router-view/>
</template>

<script>
import NavigationBar from './components/NavigationBar'
export default {
  components: {
    NavigationBar
  }
}
</script>

<style lang="scss">
  @import './assets/style/variables';
  @import './assets/style/global';

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
