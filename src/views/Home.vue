<template>
  <div class="home" :class="{'light-mode' : lightMode}">
    <div class="container">
      <a href="#" class="photo" v-for="photo in photos.results" :key="photo.id" @click.prevent="handlePhotoClick(photo)">
        <img :src="photo.urls.regular" :alt="photo.alt_description">
        <a href="#like" class="like"></a>
      </a>
    </div>
  </div>
  <teleport to="body">
    <transition name="fade">
      <picture-modal v-if="showPictureModal" @close="togglePictureModal()" :light-mode="lightMode" :selected-photo="selectedPhoto"/>
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
      photos: {},
      selectedPhoto: {},
      showPictureModal: false
    }
  },
  props: {
    lightMode: Boolean
  },
  methods: {
    handlePhotoClick (photo) {
      this.togglePictureModal()
      this.getSelectedPhoto(photo)
    },
    getPhotos () {
      return axios.get(`${config.globalSettings.baseUrl}/search/photos?per_page=12&query=nature`, {
        headers: { Authorization: config.globalSettings.accessKey }
      })
        .then(response => {
          this.photos = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getSelectedPhoto (photo) {
      this.selectedPhoto = photo
    },
    togglePictureModal () {
      this.showPictureModal = !this.showPictureModal
    }
  },
  async mounted () {
    await this.getPhotos()
  }
}
</script>

<style lang="scss">
  @import '../assets/style/variables';
  .home {
    padding: 20px 20px 20px 110px;
    background-color: $color2;
    min-height: calc(100vh - 40px);
    .container {
      columns: 6 160px;
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
  }
  .home.light-mode {
    background-color: $color4;
  }
  @media (max-width: 1200px) {
    .home {
      .container {
        columns: 4 150px;
        .photo:nth-of-type(4),
        .photo:nth-of-type(8) {
          height: 180px;
        }
      }
    }
  }
  @media (max-width: 992px) {
    .home {
      padding: 20px 20px 20px 70px;
    }
  }
  @media (max-width: 768px) {
    .home {
      .container {
        columns: 2 90px;
      }
    }
  }
</style>
