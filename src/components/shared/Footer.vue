<template>
  <section class="footer">
    <div class="footer-container">
      <div class="footer-wrapper d-flex justify-content-between">
        <div class="mr-3">
          <div class="logo-wrapper">
            <router-link to="/" class="logo">
              <img src="@/assets/images/logo/logo-green.svg" alt="" />
            </router-link>
            <p>Daily essentials at your finger tips</p>
          </div>
        </div>
        <div class="d-flex">
          <div class="operation-question">
            <h6 class="content-header">Hours of operation:</h6>
            <p>11:00 AM - 12:00 AM</p>
            <h6 class="content-header">Have questions?</h6>
            <a href="mailto:help@justgodelivery.com">help@justgodelivery.com</a>
          </div>
          <div class="d-flex align-items-start links">
            <router-link class="content-header" to="/privacy">
              Privacy Policy
            </router-link>
            <router-link class="content-header" to="/terms-of-policy">
              Terms of Service
            </router-link>
            <div style="z-index: 1;">
              <a class="social-link" href="https://www.instagram.com/justgodelivery/" target="_blank">
                <img src="@/assets/images/landing/instagram_2_.svg" />
              </a>
              <a class="social-link" href="https://www.facebook.com/justgodelivery" target="_blank">
                <img src="@/assets/images/landing/fb_2_.svg" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <img class="footer-bg-img" src="@/assets/images/landing/footerdelivery.svg" />
  </section>
</template>

<script>
import { linksData } from "./Data";
export default {
  components: {},
  data() {
    return {
      fbIcon: require("@/assets/images/fb.svg"),
      instagramIcon: require("@/assets/images/instagram.svg"),
      linksContainer: linksData,
    };
  },
};
</script>

<style lang="scss" scoped>
.footer {
  background: white;
  padding: 0 100px;
  height: 302px;
  position: relative;

  .footer-container {
    padding: 32px 0;
    border-top: 1px solid #23A534;
    height: 100%;
  }

  .logo-wrapper {
    max-width: 175px;
    z-index: 2;

    p {
      font-weight: normal;
      font-size: 14px;
      line-height: 160%;
      color: #ACACAC;
    }
  }

  .footer-bg-img {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .content-header {
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    color: #ACACAC;
  }

  .operation-question {
    margin-right: 24px;
    z-index: 2;

    p,
    a {
      font-size: 14px;
      line-height: 16px;
      color: #ACACAC;
      margin-bottom: 20px;
      text-decoration: none;
    }
  }

  .links {
    .content-header {
      z-index: 1;
      margin-right: 55px;
    }

    .social-link {
      z-index: 1;
    }

    .social-link:first-child {
      margin-right: 25px;
    }
  }

  @media screen and (max-width: 1200px) {
    padding: 0 50px;
  }

  @media screen and (max-width: 991px) {
    padding: 0 15px;

    .footer-container {
      .footer-wrapper {
        .links {
          flex-direction: column;

          .content-header {
            margin-bottom: 8px;
            margin-right: 0;
          }
        }
      }
    }
  }

  @media screen and (max-width: 576px) {
    .footer-container {
      .footer-wrapper {
        flex-direction: column;
      }
    }
  }
}
</style>
