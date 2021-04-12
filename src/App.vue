<template>
  <navigation-bar></navigation-bar>
  <router-view/>
</template>

<style lang="scss">
@import './assets/style/reset';
</style>

<script>
import NavigationBar from './components/NavigationBar'
export default {
  components: {
    NavigationBar
  }
}
</script>
