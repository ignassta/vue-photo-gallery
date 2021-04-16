<template>
  <div class="home" :class="{'light-mode' : lightMode}">
    <div class="container" v-for="(photos, index) in photoPages" :key="index">
      <a href="#" class="photo" v-for="photo in photos.results" :key="photo.id" @click.prevent="handlePhotoClick(photo)">
        <img :src="photo.urls.regular" :alt="photo.alt_description">
        <button class="like" @click.prevent.stop="likePhoto(photo.id)" :class="{'liked' : likedPhotos.includes(photo.id)}"></button>
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
      photoPages: [],
      selectedPhoto: {},
      showPictureModal: false,
      photoBlock: 3,
      likedPhotos: []
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
    },
    likePhoto (photoId) {
      if (!this.likedPhotos.includes(photoId)) {
        this.likedPhotos.push(photoId)
      } else {
        this.likedPhotos = this.likedPhotos.filter(item => item !== photoId)
      }
    },
    getLikedPhotosFromStorage () {
      this.likedPhotos = JSON.parse(localStorage.getItem('likedPhotos'))
    }
  },
  watch: {
    likedPhotos: {
      handler () {
        window.localStorage.setItem('likedPhotos', JSON.stringify(this.likedPhotos))
      },
      deep: true
    }
  },
  async mounted () {
    await this.getInitPhotos()
    this.onScroll()
    if (localStorage.getItem('likedPhotos')) {
      await this.getLikedPhotosFromStorage()
    }
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
      max-height: 560px;
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
          background-image: url('../assets/images/heart-white.svg');
          background-repeat: no-repeat;
          background-position: center;
          background-size: 55%;
          &:hover {
            opacity: .7;
          }
        }
        .like.liked {
          background-image: url('../assets/images/heart-full-white.svg');
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
        max-height: unset;
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
