<template>
  <navigation-bar v-on:toggle-light-mode="getColorModeStatus"/>
  <router-view :light-mode="lightMode"/>
</template>

<script>
import NavigationBar from './components/NavigationBar'
export default {
  components: {
    NavigationBar
  },
  data () {
    return {
      lightMode: false
    }
  },
  methods: {
    getColorModeStatus (colorModeStatus) {
      this.lightMode = colorModeStatus
    }
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
