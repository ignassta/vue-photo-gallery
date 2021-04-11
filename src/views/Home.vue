<template>
  <div class="home">
    <h1>Home</h1>
  </div>
</template>

<style lang="scss">
  .home {
    padding-left: 90px;
  }
</style>

<script>
import axios from 'axios'
import * as config from '../config'
export default {
  methods: {
    getPhotos () {
      axios.get(`${config.globalSettings.baseUrl}/photos`, {
        headers: { Authorization: config.globalSettings.accessKey }
      })
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted () {
    this.getPhotos()
  }
}
</script>
