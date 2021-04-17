<template>
  <navigation-bar v-on:toggle-light-mode="getColorModeStatus"/>
  <router-view :light-mode="lightMode" :liked-photo-ids="likedPhotoIds" @like-photo="likePhoto"/>
</template>

<script>
import NavigationBar from './components/NavigationBar'
export default {
  components: {
    NavigationBar
  },
  data () {
    return {
      lightMode: false,
      likedPhotoIds: []
    }
  },
  methods: {
    getColorModeStatus (colorModeStatus) {
      this.lightMode = colorModeStatus
    },
    likePhoto (photoId) {
      if (!this.likedPhotoIds.includes(photoId)) {
        this.likedPhotoIds.push(photoId)
      } else {
        this.likedPhotoIds = this.likedPhotoIds.filter(item => item !== photoId)
      }
    },
    getLikedPhotosFromStorage () {
      this.likedPhotoIds = JSON.parse(localStorage.getItem('likedPhotos'))
    }
  },
  mounted () {
    if (localStorage.getItem('likedPhotos')) {
      this.getLikedPhotosFromStorage()
    }
  },
  watch: {
    likedPhotoIds: {
      handler () {
        window.localStorage.setItem('likedPhotos', JSON.stringify(this.likedPhotoIds))
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
  @import './assets/style/variables';
  @import './assets/style/global';

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
