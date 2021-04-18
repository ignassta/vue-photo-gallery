<template>
  <div class="picture-modal" :class="{'picture-modal_light-mode' : lightMode}">
    <div class="picture-modal__wrapper">
      <div class="picture-modal__container">
        <button class="picture-modal__close-button" @click="$emit('close')">&#x2715;</button>
        <div class="picture-modal__picture-column">
          <img :src="selectedPhoto.urls.regular" :alt="selectedPhoto.alt_description">
        </div>
        <div class="picture-modal__info-column">
          <div class="picture-modal__top">
            <div class="picture-modal__header">
              <div class="picture-modal__author">
                <div class="picture-modal__label">author</div>
                <div class="picture-modal__name">{{selectedPhoto.user.name}}</div>
              </div>
              <div class="picture-modal__like" :class="{'picture-modal__like_liked' : likedPhotoIds.includes(selectedPhoto.id)}"></div>
            </div>
            <div class="picture-modal__description">
              <div class="picture-modal__label">description</div>
              <div>{{selectedPhoto.description}}</div>
            </div>
          </div>
          <div class="picture-modal__bottom">
            <div class="picture-modal__stats">
              <div>{{selectedPhoto.likes}}</div>
              <div>--</div>
              <div>--</div>
            </div>
            <div class="picture-modal__picture-info">
              <div class="picture-modal__column">
                <div class="picture-modal__label">Camera Make</div>
                <div>--</div>
              </div>
              <div class="picture-modal__column">
                <div class="picture-modal__label">Camera Model</div>
                <div>--</div>
              </div>
              <div class="picture-modal__column">
                <div class="picture-modal__label">Focal Length</div>
                <div>--</div>
              </div>
              <div class="picture-modal__column">
                <div class="picture-modal__label">Dimensions</div>
                <div>{{selectedPhoto.width}} x {{selectedPhoto.height}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['close'],
  props: {
    lightMode: Boolean,
    selectedPhoto: Object,
    likedPhotoIds: Array
  }
}
</script>

<style lang="scss">
  @import '../assets/style/variables';
  .picture-modal {
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
    .picture-modal__wrapper {
      margin: 0 15px;
      .picture-modal__container {
        position: relative;
        display: flex;
        max-width: 1134px;
        max-height: 714px;
        width: 100%;
        .picture-modal__close-button {
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
        .picture-modal__picture-column, .picture-modal__info-column {
          width: 50%;
        }
        .picture-modal__picture-column {
          background-color: rgba($color6, .9);
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
        .picture-modal__info-column {
          background-color: $color2;
          box-sizing: border-box;
          padding: 66px 58px 45px 58px;
          margin: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-weight: 700;
          color: $color4;
          min-height: 500px;
          .picture-modal__label {
            font-size: 12px;
            color: $color7;
            margin-bottom: 5px;
          }
          .picture-modal__header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 32px;
            .picture-modal__author {
              .picture-modal__name {
                font-size: 24px;
                color: $color5;
              }
            }
            .picture-modal__like {
              width: 50px;
              height: 50px;
              background-color: $color5;
              background-image: url('../assets/images/heart-white.svg');
              background-repeat: no-repeat;
              background-position: center;
              background-size: 55%;
            }
            .picture-modal__like.picture-modal__like_liked {
              background-image: url('../assets/images/heart-full-white.svg');
            }
          }
          .picture-modal__description {
            margin-bottom: 15px;
            div:nth-of-type(2) {
              font-size: 20px;
            }
          }
          .picture-modal__stats {
            display: flex;
            justify-content: flex-start;
            margin-bottom: 32px;
            padding-left: 30px;
            div {
              font-size: 16px;
              position: relative;
              &:before {
                position: absolute;
                content: '';
                width: 20px;
                height: 20px;
                top: 0;
                left: -30px;
                background-position: center;
                background-repeat: no-repeat;
              }
            }
            div:nth-of-type(1) {
              &:before {
                background-image: url("./../assets/images/heart-full-white.svg");
              }
            }
            div:nth-of-type(2) {
              &:before {
                background-image: url("./../assets/images/download.svg");
              }
            }
            div:nth-of-type(3) {
              &:before {
                background-image: url("./../assets/images/eye.svg");
              }
            }
            div:not(:nth-last-of-type(1)) {
              margin-right: 50px;
            }
          }
          .picture-modal__picture-info {
            border-top: 1px solid $color9;
            display: flex;
            flex-wrap: wrap;
            .picture-modal__column {
              margin-top: 32px;
              flex-basis: 30%;
              flex-grow: 1;
              div:nth-of-type(2) {
                font-size: 16px;
              }
            }
            .picture-modal__column:nth-of-type(2) {
              flex-basis: 40%;
            }
          }
        }
      }
    }
  }
  .picture-modal.picture-modal_light-mode {
    .picture-modal__wrapper {
      .picture-modal__container {
        .picture-modal__picture-column {
          background-color: rgba($color3, .9);
        }
        .picture-modal__info-column {
          background-color: $color3;
          color: $color2;
          .picture-modal__label {
            color: $color9;
          }
          .picture-modal__stats {
            div {
              &:before {
                filter: invert(100%);
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 992px) {
    .picture-modal {
      .picture-modal__wrapper {
        .picture-modal__container {
          .picture-modal__picture-column {
            width: 40%;
          }
          .picture-modal__info-column {
            padding: 66px 15px 15px 15px;
            width: 60%;
            .picture-modal__picture-info {
              .picture-modal__column {
                flex-basis: 50% !important;
                margin-top: 15px;
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 768px) {
    .picture-modal {
      .picture-modal__wrapper {
        .picture-modal__container {
          .picture-modal__info-column {
            .picture-modal__header {
              .picture-modal__author {
                .picture-modal__name {
                  font-size: 20px;
                }
              }
            }
            .picture-modal__description {
              div:nth-of-type(2) {
                font-size: 18px;
              }
            }
            .picture-modal__stats {
              flex-direction: column;
              div {
                margin-top: 5px;
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 576px) {
    .picture-modal {
      .picture-modal__wrapper {
        .picture-modal__container {
          .picture-modal__info-column {
            .picture-modal__picture-info {
              .picture-modal__column {
                flex-basis: 100% !important;
              }
            }
          }
        }
      }
    }
  }
</style>
