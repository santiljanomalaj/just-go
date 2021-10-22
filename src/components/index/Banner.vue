<template>
  <section class="banner">
    <b-container fluid>
      <b-navbar class="navbar align-items-center">
        <b-navbar-brand href="/">
          <img alt="" src="@/assets/images/logo/logo-green.svg"/>
        </b-navbar-brand>

        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="userName == ''" to="/login">Login</b-nav-item>
          <router-link v-if="userName !== ''" class="username" to="/profile">{{ userName }}</router-link>
          <span v-if="userName !== ''" class="logout" @click="logout"
          >Logout</span>
        </b-navbar-nav>
      </b-navbar>
      <div>
        <img alt="" class="base" src="@/assets/images/landing/illustrations/base.png">
        <img alt="" class="base-1" src="@/assets/images/landing/illustrations/1.png">
        <img alt="" class="base-2" src="@/assets/images/landing/illustrations/2.png">
        <img alt="" class="base-3" src="@/assets/images/landing/illustrations/6.png">
        <img alt="" class="base-4" src="@/assets/images/landing/illustrations/7.png">
        <img alt="" class="base-5" src="@/assets/images/landing/illustrations/3.png">
        <img alt="" class="base-6" src="@/assets/images/landing/illustrations/4.png">
        <img alt="" class="base-7" src="@/assets/images/landing/illustrations/5.png">
      </div>
      <div class="hero">
        <h4>Delivering</h4>
        <h1>HAPPINESS</h1>

        <form class="address-wrapper" @submit.prevent="addressEntered">
          <div class="address">
            <div>
              <span class="ico">
                <i class="bi bi-geo-alt-fill"></i>
              </span>
              <gmap-autocomplete
                placeholder="Enter Address"
                type="text"
                @place_changed="addressEntered"
              ></gmap-autocomplete>
            </div>
            <span v-if="err" class="err">{{ err }}</span>
            <button class="btn-go">
              Just Go
            </button>
          </div>
          <div class="arrow">
            <img alt="" src="@/assets/images/landing/arrow.png">
          </div>
          <div class="try-it">
            <img alt="" src="@/assets/images/landing/free.png">
          </div>
        </form>
      </div>
    </b-container>
  </section>
</template>

<script>
import {paths} from '@/util/path';

export default {
  data() {
    return {
      login: null,
      err: '',
      userName: '',
      paths: paths,
    };
  },
  methods: {
    addressEntered(place) {
      localStorage.address = JSON.stringify({
        place: place,
        address: place.formatted_address,
        location: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()},
      });
      this.$router.push('/browse');
    },
    logout() {
      this.$store.dispatch('LOGOUT').then(() => {
        this.userName = '';
      });
    },
  },
  created() {
    this.$store.dispatch('VERIFY_LOGIN').then((res) => {
      let user = res;
      if (user) {
        this.login = true;
        this.userName = user.fname +' '+user.sname.charAt(0);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.banner {
  padding-bottom: 250px;
  position: relative;
  overflow: hidden;

  .navbar {
    padding-left: 45px;
    align-items: start;
    z-index: 1;

    img {
      height: 50px;
    }

    .nav-link {
      color: #23a534 !important;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 19px;
      text-align: center;
      text-transform: uppercase;
    }

    .navbar-nav {
      align-items: start;
      padding-left: 60px;
    }

    .username {
      cursor: pointer;
      color: #23a534;
      font-weight: bold;
      font-size: 17px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20px;
    }

    .logout {
      margin-left: 10px;
      cursor: pointer;
      color: #23a534;
      font-weight: bold;
      font-size: 17px;
      display: flex;
      justify-content: center;
      align-items: center;
      // width: 100%;
    }
  }

  .base {
    position: absolute;
    top: 0;
    right: 0;
    width: 55vw;
    transform: translateX(10vw);
  }

  img[class^='base-'] {
    max-width: 6vw;
    max-height: 6vw;
    position: absolute;
    animation: scale-hero 2s linear infinite normal;
  }

  .base-1 {
    top: 70px;
    right: 23vw;
  }

  .base-2 {
    top: 100px;
    right: 16vw;
    animation-delay: .2s !important;
  }

  .base-3 {
    top: 70px;
    right: 7vw;
    animation-delay: .4s !important;

  }

  .base-4 {
    top: 120px;
    right: 2vw;
    animation-delay: .6s !important;

  }

  .base-5 {
    top: 14vw;
    right: 20vw;
    animation-delay: .8s !important;

  }

  .base-6 {
    top: 11.5vw;
    right: 11vw;
    max-width: 90px !important;
    animation-delay: 1s !important;

  }

  .base-7 {
    top: 15vw;
    right: 5vw;
    animation-delay: 1.2s !important;

  }

  .hero {
    padding: 80px 40px 40px 40px;

    h4 {
      font-family: 'Roboto', sans-serif;
      font-weight: bold;
      font-size: 65px;
      line-height: 76px;
      letter-spacing: -0.02em;
      color: #010101;
      margin-bottom: 0;
    }

    h1 {
      font-family: 'Anton', sans-serif;
      font-size: 15vw;
      color: #23a534;
      font-weight: 400;
      line-height: 1;
    }

    .address-wrapper {
      position: relative;
      padding-left: 6px;
      display: flex;
      //align-items: first;
      //max-width: ;
      flex-wrap: wrap;
      column-gap: 22px;
      row-gap: 22px;
      @media (min-width: 991px) {
        max-width: 70vw;
      }
      @media (min-width: 1224px) {
        max-width: 60vw;
      }

      .address {
        width: 100%;
        max-width: calc(100% - 260px);
        position: inherit;

        @media (min-width: 991px) {
          max-width: calc(70vw - 260px);
        }
        @media (min-width: 1224px) {
          max-width: calc(60vw - 260px);
        }

        & > div {
          display: flex;
          align-items: center;
          height: 60px;
          column-gap: 12px;
          border: 1px solid #C4C4C4;
          border-radius: 10px;
          padding: 0 20px;
          box-shadow: 0px 0px 15px -1px rgba(0, 0, 0, 0.1);
        }

        .ico {
          display: flex;
          align-items: center;
          font-size: 26px;
          color: #acacac;
        }

        //.input-field{
        input {
          width: calc(100% - 240px);
          height: 100%;
          font-size: 20px;
          line-height: 23px;
          border: none;
          font-family: 'Roboto', sans-serif;
          font-weight: 400;

          &::placeholder {
            color: #ACACAC;
          }

          &:focus {
            outline: none;
          }
        }
      }

      button.btn-go {
        position: absolute;
        right: 6px;
        top: 6px;
        height: 48px;
        border-radius: 7px;
        max-width: 197px;
        width: 100%;
        padding: 10px 20px;
        color: #fff;
        background: #000;
        border: 1px solid #000;
        font-size: 20px;
        line-height: 23px;
        font-weight: 600;
        font-family: 'Roboto', sans-serif;
        text-transform: uppercase;
        &:focus{
          outline: none;
        }
      }

      .arrow {
        position: absolute;
        top: 120%;
        right: 315px;
      }

      .try-it {
        position: absolute;
        top: 70%;
        right: 420px;
        transform: translateY(45%);
      }
    }
  }

  @media screen and (max-width: 1280px) {
    padding-bottom: 200px;
  }

  @media (max-width: 768px) {
    padding-bottom: 40px;
    .container-fluid {
      overflow: hidden;
    }
    .navbar {
      padding-left: 0;
      padding-right: 0;
      img{
        height: 30px;
      }
      .username {
        display: none;
      }
    }

    .base {
      position: relative;
      top: -50px;
      width: 124vw;
      transform: none;
    }
    .base-5 {
      top: 160px;
      right: 32vw;
    }
    .base-6 {
      top: 140px;
      right: 20vw;
    }
    .base-7 {
      top: 150px;
      right: 10vw;
    }
    img[class^='base-'] {
      height: 40px;
      width: auto;
      max-width: unset;
      max-height: unset;
    }
    .hero {
      padding: 0;
      margin-top: -175px;

      h4 {
        font-size: 8vw;
      }

      h1 {
        font-size: 20vw;

      }

      .address-wrapper {
        max-width: unset;
        padding-left: 0;
        position: relative;
        z-index: 1;


        .address {
          //height: 55px;
          max-width: unset;

          .ico {
            font-size: 32px;
          }

          input {
            width: 100%;
          }
        }

        button.btn-go {
          right: 0;
          top: inherit;
          bottom: -95px;
          padding: 16px 57px;
          height: 60px;
        }

        .try-it {
          position: relative;
          top: -70px;
          right: inherit;
          left: calc(100% - 420px);
          width: 192px;

          img {
            width: 192px;
          }

          @media screen and (max-width: 576px) {
            left: -35px;
          }
        }

        .arrow {
          transform: translateY(-40%) rotate(35deg);
          right: 140px;
          display: none;
        }
      }
    }
  }
}

@keyframes scale-hero {
  0% {
    transform: scale(0.9);
  }
  25% {
    transform: scale(0.95);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(.95);
  }
  100% {
    transform: scale(.9);
  }

}
</style>
