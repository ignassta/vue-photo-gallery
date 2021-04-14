<template>
  <div class="navigation-bar">
    <div class="logo-holder">
      <router-link to="/">
        <img src="../assets/images/LOGO--SMALL.svg" alt="logo">
      </router-link>
    </div>
    <div class="nav-holder">
      <router-link to="/" class="home-link"/>
      <router-link to="/favourites" class="favourites-link"/>
    </div>
    <div class="preferences-holder">
      <button type="button" class="subscribe-btn" @click="toggleSubscribeModal()"></button>
      <button type="button" class="color-mode-btn"></button>
    </div>
  </div>
  <teleport to="body">
    <transition name="fade">
      <subscribe-modal v-if="showSubscribeModal" @close="toggleSubscribeModal()"></subscribe-modal>
    </transition>
  </teleport>
</template>

<script>
import SubscribeModal from './SubscribeModal'
export default {
  components: {
    SubscribeModal
  },
  data () {
    return {
      showSubscribeModal: false
    }
  },
  methods: {
    toggleSubscribeModal () {
      this.showSubscribeModal = !this.showSubscribeModal
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/style/variables';
  @mixin btn-style {
    position: relative;
    transition: all .3s;
    &:after {
      position: absolute;
      content: '';
      width: 24px;
      height: 24px;
      filter: invert(100%);
      top: calc(50% - 12px);
      left: calc(50% - 12px);
    }
    &:hover {
      cursor: pointer;
    }
  }
  .navigation-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 90px;
    height: 100vh;
    background-color: $color1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .logo-holder {
      padding-top: 30px;
      margin: 0 auto;
    }
    .nav-holder {
      display: flex;
      flex-direction: column;
      a {
        width: 100%;
        padding-bottom: 100%;
        @include btn-style;
      }
      a.router-link-active {
        background-color: $color5;
      }
      a.home-link {
        &:after {
          background-image: url('../assets/images/picture.svg');
        }
      }
      a.favourites-link {
        &:after {
          background-image: url('../assets/images/heart.svg');
        }
      }
    }
    .preferences-holder {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 30px;
      button {
        width: 24px;
        height: 24px;
        @include btn-style;
      }
      button.subscribe-btn {
        margin-bottom: 25px;
        &:after {
          background-image: url('../assets/images/letter.svg');
        }
      }
      button.color-mode-btn {
        &:after {
          background-image: url('../assets/images/sun.svg');
        }
      }
    }
  }
  @media (max-width: 992px) {
    .navigation-bar {
      width: 50px;
    }
  }
</style>
