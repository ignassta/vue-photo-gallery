<template>
  <div class="subscribe-modal">
    <div class="modal-holder">
      <div class="modal-container">
        <button class="close-btn" @click="$emit('close')">&#x2715;</button>
        <form>
          <h3>Subscribe to our newsletter</h3>
          <div class="input-group">
            <label for="name">Your name</label>
            <input type="text" id="name" name="name">
          </div>
          <div class="input-group">
            <label for="email">Your email</label>
            <input type="text" id="email" name="email">
          </div>
          <button class="subscribe-btn" type="button">Subscribe</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
</style>
