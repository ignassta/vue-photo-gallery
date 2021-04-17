<template>
  <div class="favourites" :class="{'light-mode' : lightMode}">
    <div class="container" v-for="i in Math.ceil(likedPhotos.length / 12)" :key="i">
      <a href="#" class="photo" v-for="photo in likedPhotos.slice((i - 1) * 12, i * 12)" :key="photo.id" @click.prevent="handlePhotoClick(photo)">
        <img :src="photo.urls.regular" :alt="photo.alt_description">
        <button class="like" @click.prevent.stop="$emit('like-photo', photo.id)" :class="{'liked' : likedPhotoIds.includes(photo.id)}"></button>
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
      likedPhotos: [],
      selectedPhoto: {},
      showPictureModal: false
    }
  },
  props: {
    lightMode: Boolean,
    likedPhotoIds: Array
  },
  methods: {
    handlePhotoClick (photo) {
      this.togglePictureModal()
      this.getSelectedPhoto(photo)
    },
    getSelectedPhoto (photo) {
      this.selectedPhoto = photo
    },
    togglePictureModal () {
      this.showPictureModal = !this.showPictureModal
    },
    createLikedPhotosObject () {
      this.likedPhotoIds.forEach(this.getPhotoById)
    },
    getPhotoById (photoId) {
      axios.get(`${config.globalSettings.baseUrl}/photos/${photoId}`, {
        headers: { Authorization: config.globalSettings.accessKey }
      })
        .then(response => {
          this.likedPhotos.push(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  async mounted () {
    await this.createLikedPhotosObject()
  }
}
</script>

<style lang="scss">
  @import '../assets/style/variables';
  .favourites {
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
  .favourites.light-mode {
    background-color: $color4;
  }
  @media (max-width: 1200px) {
    .favourites {
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
    .favourites {
      padding: 20px 20px 20px 70px;
    }
  }
  @media (max-width: 768px) {
    .favourites {
      .container {
        columns: 2 90px;
      }
    }
  }
</style>
