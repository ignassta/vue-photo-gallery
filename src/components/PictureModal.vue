<template>
  <div class="picture-modal" :class="{'light-mode' : lightMode}">
    <div class="modal-holder">
      <div class="modal-container">
        <button class="close-btn" @click="$emit('close')">&#x2715;</button>
        <div class="picture-col">
          <img :src="selectedPhoto.urls.regular" :alt="selectedPhoto.alt_description">
        </div>
        <div class="info-col">
          <div class="top">
            <div class="header">
              <div class="author">
                <div class="label">author</div>
                <div class="name">{{selectedPhoto.user.name}}</div>
              </div>
              <button class="like"></button>
            </div>
            <div class="description">
              <div class="label">description</div>
              <div>{{selectedPhoto.description}}</div>
            </div>
          </div>
          <div class="bottom">
            <div class="stats">
              <div>{{selectedPhoto.likes}}</div>
              <div>--</div>
              <div>--</div>
            </div>
            <div class="picture-info">
              <div class="column">
                <div class="label">Camera Make</div>
                <div>--</div>
              </div>
              <div class="column">
                <div class="label">Camera Model</div>
                <div>--</div>
              </div>
              <div class="column">
                <div class="label">Focal Length</div>
                <div>--</div>
              </div>
              <div class="column">
                <div class="label">Dimensions</div>
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
  props: {
    lightMode: Boolean,
    selectedPhoto: Object
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
    .modal-holder {
      margin: 0 15px;
      .modal-container {
        position: relative;
        display: flex;
        max-width: 1134px;
        max-height: 714px;
        width: 100%;
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
        .picture-col, .info-col {
          width: 50%;
        }
        .picture-col {
          background-color: rgba($color6, .9);
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
        .info-col {
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
          .label {
            font-size: 12px;
            color: $color7;
            margin-bottom: 5px;
          }
          .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 32px;
            .author {
              .name {
                font-size: 24px;
                color: $color5;
              }
            }
            .like {
              width: 50px;
              height: 50px;
              background-color: $color5;
              background-image: url('../assets/images/heart-full-white.svg');
              background-repeat: no-repeat;
              background-position: center;
              background-size: 55%;
              &:hover {
                opacity: .7;
              }
            }
          }
          .description {
            margin-bottom: 15px;
            div:nth-of-type(2) {
              font-size: 20px;
            }
          }
          .stats {
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
          .picture-info {
            border-top: 1px solid $color9;
            display: flex;
            flex-wrap: wrap;
            .column {
              margin-top: 32px;
              flex-basis: 30%;
              flex-grow: 1;
              div:nth-of-type(2) {
                font-size: 16px;
              }
            }
            .column:nth-of-type(2) {
              flex-basis: 40%;
            }
          }
        }
      }
    }
  }
  .picture-modal.light-mode {
    .modal-holder {
      .modal-container {
        .picture-col {
          background-color: rgba($color3, .9);
        }
        .info-col {
          background-color: $color3;
          color: $color2;
          .label {
            color: $color9;
          }
          .stats {
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
      .modal-holder {
        .modal-container {
          .picture-col {
            width: 40%;
          }
          .info-col {
            padding: 66px 15px 15px 15px;
            width: 60%;
            .picture-info {
              .column {
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
      .modal-holder {
        .modal-container {
          .info-col {
            .header {
              .author {
                .name {
                  font-size: 20px;
                }
              }
            }
            .description div:nth-of-type(2) {
              font-size: 18px;
            }
            .stats {
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
      .modal-holder {
        .modal-container {
          .info-col {
            .picture-info {
              .column {
                flex-basis: 100% !important;
              }
            }
          }
        }
      }
    }
  }
</style>
