<template>
  <div class="home">
    <div class="container">
      <a href="#" class="photo" v-for="n in 12" :key="n">
        <img src="../assets/images/dog.jpg" alt="">
        <a href="#like" class="like"></a>
      </a>
    </div>
  </div>
</template>

<style lang="scss">
  @import '../assets/style/variables';
  .home {
    padding: 5px 5px 5px 95px;
    background-color: $color2;
    min-height: calc(100vh - 10px);
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    .photo {
      position: relative;
      background: gray;
      flex-basis: calc(16.66% - 20px);
      margin: 10px;
      height: 340px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .like {
        position: absolute;
        top: 0;
        right: 0;
        width: 40px;
        height: 40px;
        background-color: $color5;
        background-image: url('../assets/images/heart-full.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 55%;
      }
    }
    .photo:nth-of-type(even):nth-of-type(-n + 6),
    .photo:nth-of-type(odd):nth-of-type(n + 6) {
      height: 180px;
    }
    .photo:nth-of-type(even):nth-of-type(n + 7) {
      transform: translateY(calc(10px - 50%));
    }
  }
</style>

<script>
import axios from 'axios'
import * as config from '../config'
export default {
  data () {
    return {
      photos: null,
      showNewsletterModal: false
    }
  },
  methods: {
    getPhotos () {
      return axios.get(`${config.globalSettings.baseUrl}/photos`, {
        headers: { Authorization: config.globalSettings.accessKey }
      })
        .then(response => {
          this.photos = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  async mounted () {
    // await this.getPhotos()
  }
}
</script>
