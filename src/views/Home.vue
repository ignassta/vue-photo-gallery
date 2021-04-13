<template>
  <div class="home">
    <div class="container">
      <a href="#" class="photo" v-for="n in 12" :key="n" @click.prevent="togglePictureModal">
        <img src="../assets/images/dog.jpg" alt="">
        <a href="#like" class="like"></a>
      </a>
    </div>
  </div>
  <teleport to="body">
    <transition name="fade">
      <picture-modal v-if="showPictureModal" @close="togglePictureModal()"></picture-modal>
    </transition>
  </teleport>
</template>

<script>
import axios from 'axios'
import * as config from '../config'
import PictureModal from '../components/PictureModal'
export default {
  components: {
    PictureModal
  },
  data () {
    return {
      photos: null,
      showPictureModal: false
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
    },
    togglePictureModal () {
      this.showPictureModal = !this.showPictureModal
    }
  },
  async mounted () {
    // await this.getPhotos()
  }
}
</script>

<style lang="scss">
  @import '../assets/style/variables';
  .home {
    padding: 20px 20px 20px 110px;
    background-color: $color2;
    min-height: calc(100vh - 40px);
  }
  .container {
    columns: 6 200px;
    column-gap: 20px;
    .photo {
      position: relative;
      margin: 0 20px 20px 0;
      display: inline-block;
      width: 100%;
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
        &:hover {
          opacity: .7;
        }
      }
    }
    .photo:nth-of-type(4n+2),
    .photo:nth-of-type(4n+3) {
      height: 180px;
    }
  }
</style>
