<template>
  <div class="subscribe-modal" :class="{'subscribe-modal_light-mode' : lightMode}">
    <div class="subscribe-modal__wrapper">
      <div class="subscribe-modal__container">
        <button class="subscribe-modal__close-button" @click="$emit('close')">&#x2715;</button>
        <form>
          <h3>Subscribe to our newsletter</h3>
          <div class="subscribe-modal__input-group">
            <label for="name">Your name</label>
            <input type="text" id="name" name="name" v-model="subscriber.name" :class="{'subscribe-modal__input_not-valid' : errors.name.length}">
            <transition name="fade">
              <span class="subscribe-modal__error" v-if="errors.name.length">{{errors.name[0]}}</span>
            </transition>
          </div>
          <div class="subscribe-modal__input-group">
            <label for="email">Your email</label>
            <input type="text" id="email" name="email" v-model="subscriber.email" :class="{'subscribe-modal__input_not-valid' : errors.email.length}">
            <transition name="fade">
              <span class="subscribe-modal__error" v-if="errors.email.length">{{errors.email[0]}}</span>
            </transition>
          </div>
          <button class="subscribe-modal__subscribe-button" type="button" @click="submitSubscriber()">Subscribe</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lightMode: Boolean
  },
  data () {
    return {
      subscriber: {
        name: '',
        email: ''
      },
      errors: {
        name: [],
        email: []
      }
    }
  },
  methods: {
    submitSubscriber () {
      this.errors.name = []
      this.errors.email = []
      if (this.subscriber.name && this.validateEmail(this.subscriber.email)) {
        this.$emit('close')
      }
      if (!this.subscriber.name) {
        this.errors.name.push('Name is required.')
      }
      if (!this.subscriber.email) {
        this.errors.email.push('Email is required.')
      } else if (!this.validateEmail(this.subscriber.email)) {
        this.errors.email.push('Email is not valid.')
      }
    },
    validateEmail (email) {
      const emailValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return emailValid.test(String(email).toLowerCase())
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/style/variables';
  .subscribe-modal {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
    display: flex;
    justify-content: center;
    align-items: center;
    .subscribe-modal__wrapper {
      max-width: 610px;
      width: 100%;
      margin: 0 15px;
      .subscribe-modal__container {
        position: relative;
        background-color: $color2;
        padding: 64px 58px;
        .subscribe-modal__close-button {
          position: absolute;
          font-size: 40px;
          line-height: 1;
          color: $color9;
          top: 12px;
          right: 12px;
          &:hover {
            opacity: .7;
          }
        }
        h3 {
          color: $color4;
          font-weight: 400;
          font-size: 20px;
          margin-bottom: 40px;
        }
        .subscribe-modal__input-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 24px;
          position: relative;
          label {
            color: $color7;
            font-weight: 700;
            font-size: 12px;
            margin-bottom: 8px;
          }
          input {
            background-color: $color8;
            border: 1px solid $color9;
            height: 40px;
            color: $color7;
            padding: 0 15px;
            transition: all .5s;
          }
          input.subscribe-modal__input_not-valid {
            border: 1px solid red;
          }
          .subscribe-modal__error {
            position: absolute;
            left: 0;
            bottom: -15px;
            color: red;
            font-size: 12px;
          }
        }
        .subscribe-modal__subscribe-button {
          background-color: $color5;
          color: $color4;
          font-size: 16px;
          text-transform: uppercase;
          padding: 0 30px;
          height: 50px;
          letter-spacing: 2px;
          &:hover {
            opacity: .7;
          }
        }
      }
    }
  }
  .subscribe-modal.subscribe-modal_light-mode {
    .subscribe-modal__wrapper {
      .subscribe-modal__container {
        background-color: $color3;
        h3 {
          color: $color7;
        }
        .subscribe-modal__input-group {
          label {
            color: $color9;
          }
          input {
            background-color: $color3;
            color: $color9;
            border: 1px solid $color7;
          }
        }
      }
    }
  }
  @media (max-width: 576px) {
    .subscribe-modal {
      .subscribe-modal__wrapper {
        .subscribe-modal__container {
          padding: 64px 15px;
        }
      }
    }
  }
</style>
