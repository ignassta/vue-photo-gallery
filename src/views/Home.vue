<template>
  <div class="home" :class="{'home_light-mode' : lightMode}">
    <div class="home__container" v-for="(photos, index) in photoPages" :key="index">
      <a href="#" class="home__photo" v-for="photo in photos.results" :key="photo.id" @click.prevent="handlePhotoClick(photo)">
        <img :src="photo.urls.regular" :alt="photo.alt_description">
        <button class="home__like-button" @click.prevent.stop="likePhoto(photo.id)" :class="{'home__like-button_liked' : likedPhotoIds.includes(photo.id)}"></button>
      </a>
    </div>
  </div>
  <teleport to="body">
    <transition name="fade">
      <picture-modal v-if="showPictureModal" @close="togglePictureModal()" :light-mode="lightMode" :selected-photo="selectedPhoto" :liked-photo-ids="likedPhotoIds"/>
    </transition>
  </teleport>
</template>

<script>
import axios from 'axios'
import * as config from '../config'
import PictureModal from '../components/PictureModal'
export default {
  emits: ['like-photo'],
  components: {
    PictureModal
  },
  data () {
    return {
      photoPages: [],
      selectedPhoto: {},
      showPictureModal: false,
      photoBlock: 3
    }
  },
  props: {
    lightMode: Boolean,
    likedPhotoIds: Array
  },
  methods: {
    likePhoto (photoId) {
      this.$emit('like-photo', photoId)
    },
    handlePhotoClick (photo) {
      this.togglePictureModal()
      this.getSelectedPhoto(photo)
    },
    getInitPhotos () {
      for (let i = 1; i <= 3; i++) {
        axios.get(`${config.globalSettings.baseUrl}/search/photos?page=${i}&per_page=12&query=alpaca`, {
          headers: { Authorization: config.globalSettings.accessKey }
        })
          .then(response => {
            this.photoPages.push(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    getSelectedPhoto (photo) {
      this.selectedPhoto = photo
    },
    togglePictureModal () {
      this.showPictureModal = !this.showPictureModal
    },
    onScroll () {
      window.onscroll = () => {
        if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) {
          this.photoBlock++
          axios.get(`${config.globalSettings.baseUrl}/search/photos?page=${this.photoBlock}&per_page=12&query=alpaca`, {
            headers: { Authorization: config.globalSettings.accessKey }
          })
            .then(response => {
              this.photoPages.push(response.data)
            })
            .catch(error => {
              console.log(error)
            })
        }
      }
    }
  },
  async mounted () {
    await this.getInitPhotos()
    this.onScroll()
  }
}
</script>

<style lang="scss">
  @import '../assets/style/variables';
  .home {
    padding: 20px 20px 20px 110px;
    background-color: $color2;
    min-height: calc(100vh - 40px);
    .home__container {
      columns: 6 160px;
      column-gap: 20px;
      max-height: 560px;
      .home__photo {
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
        .home__like-button {
          position: absolute;
          top: 0;
          right: 0;
          width: 40px;
          height: 40px;
          background-color: $color5;
          background-image: url('../assets/images/heart-white.svg');
          background-repeat: no-repeat;
          background-position: center;
          background-size: 55%;
          &:hover {
            opacity: .7;
          }
        }
        .home__like-button.home__like-button_liked {
          background-image: url('../assets/images/heart-full-white.svg');
        }
      }
      .home__photo:nth-of-type(4n+2),
      .home__photo:nth-of-type(4n+3) {
        height: 180px;
      }
    }
  }
  .home.home_light-mode {
    background-color: $color4;
  }
  @media (max-width: 1200px) {
    .home {
      .home__container {
        columns: 4 150px;
        max-height: unset;
        .home__photo:nth-of-type(4),
        .home__photo:nth-of-type(8) {
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
      .home__container {
        columns: 2 90px;
      }
    }
  }
</style>
