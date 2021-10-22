<template>
  <section class="about-essentials">
    <div class="about-container">
      <b-row class="justify-content-center about-wrapper-desktop">
        <b-col md="6" class="about-content">
          <div class="position-relative">
            <h3>About Us</h3>
            <p>
              We bring you the things you care about when you care about them, every single day.
            </p>
            <b-button
              class="btn"
              v-scroll-to="'#learnMore'"
            >
              Learn More
            </b-button>
            <img class="curve-image" src="@/assets/images/landing/curve.png" alt="curve" />
          </div>
        </b-col>
        <b-col md="6" class="about-img">
          <div class="d-flex">
            <img src="@/assets/images/landing/3people1.svg" alt="" />
          </div>
        </b-col>
      </b-row>
      <div class="about-wrapper-mobile">
        <div>
          <h3>About Us</h3>
          <div class="d-flex justify-content-center">
            <img class="img-fluid" src="@/assets/images/landing/3people1.svg" alt="" />
          </div>
          <p>
            We bring you the things you care about when you care about them, every single day.
          </p>
          <b-button
            class="btn"
            v-scroll-to="'#learnMore'"
          >
            Learn More
          </b-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.about-essentials {
  padding: 72px 0 92px;
  background: #fff;

  .about-container {
    max-width: 890px;
    padding: 0 20px;
    margin: 0 auto;

    .about-wrapper-desktop {
      display: flex;

      .about-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    
        h3 {
          font-style: normal;
          font-weight: bold;
          font-size: 60px;
          line-height: 70px;
          color: #000000;
          max-width: 450px;
          width: 100%;
          margin: 0;
        }
    
        p {
          font-style: normal;
          font-weight: normal;
          font-size: 18px;
          line-height: 170%;
          color: #000000;
          margin: 30px 0;
        }
    
        .btn {
          background: #23A534;
          padding: 13px 34px;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          font-style: normal;
          font-weight: bold;
          font-size: 20px;
          line-height: 23px;
          transition: 0.3s;
          border: none;
          outline: none;
    
          &:hover {
            opacity: .8;
          }
        }
      }
    
      .about-img {
        div {
          justify-content: center;
        }
      }
    }

    .about-wrapper-mobile {
      display: none;
    }
  }

  @media screen and (max-width: 767px) {
    padding: 40px 30px;

    .about-container {
      .about-wrapper-desktop {
        display: none;
      }

      .about-wrapper-mobile {
        display: block;
        text-align: center;

        h3 {
          font-style: normal;
          font-weight: bold;
          font-size: 45px;
          line-height: 53px;
          color: #0B0C0B;
          margin-bottom: 27px;
        }

        p {
          font-style: normal;
          font-weight: normal;
          font-size: 24px;
          line-height: 150%;
          text-align: center;
          color: #000000;
          margin: 27px 0;

          @media screen and (max-width: 576px) {
            font-size: 18px;
            line-height: 170%;
          }
        }

        button {
          background: #23A534;
          box-shadow: 0px 0px 15px -1px rgba(0, 0, 0, 0.25);
          border-radius: 10px;
          font-weight: bold;
          font-style: normal;
          font-size: 20px;
          line-height: 23px;
          color: #FFFFFF;
          width: 262px;
          margin: 0 auto;
          border: none;
          outline: none;
          padding: 13px 34px;
        }
      }
    }
  }

  .curve-image {
    transform: translate(265px, 50px);

    @media screen and (max-width: 991px) {
      transform: translate(230px, 50px);
    }

    @media screen and (max-width: 767px) {
      display: none;
    }
  }
}
</style>