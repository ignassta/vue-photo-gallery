<template>
  <div class="subscribe-modal" :class="{'light-mode' : lightMode}">
    <div class="modal-holder">
      <div class="modal-container">
        <button class="close-btn" @click="$emit('close')">&#x2715;</button>
        <form>
          <h3>Subscribe to our newsletter</h3>
          <div class="input-group">
            <label for="name">Your name</label>
            <input type="text" id="name" name="name" v-model="subscriber.name" :class="{'not-valid' : errors.name.length}">
            <transition name="fade">
              <span class="error" v-if="errors.name.length">{{errors.name[0]}}</span>
            </transition>
          </div>
          <div class="input-group">
            <label for="email">Your email</label>
            <input type="text" id="email" name="email" v-model="subscriber.email" :class="{'not-valid' : errors.email.length}">
            <transition name="fade">
              <span class="error" v-if="errors.email.length">{{errors.email[0]}}</span>
            </transition>
          </div>
          <button class="subscribe-btn" type="button" @click="submitSubscriber()">Subscribe</button>
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
    .modal-holder {
      max-width: 610px;
      width: 100%;
      margin: 0 15px;
      .modal-container {
        position: relative;
        background-color: $color2;
        padding: 64px 58px;
        .close-btn {
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
        .input-group {
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
          input.not-valid {
            border: 1px solid red;
          }
          .error {
            position: absolute;
            left: 0;
            bottom: -15px;
            color: red;
            font-size: 12px;
          }
        }
        .subscribe-btn {
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
  .subscribe-modal.light-mode {
    .modal-holder {
      .modal-container {
        background-color: $color3;
        h3 {
          color: $color7;
        }
        .input-group {
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
      .modal-holder {
        .modal-container {
          padding: 64px 15px;
        }
      }
    }
  }
</style>
