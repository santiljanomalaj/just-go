<template>
  <section class="features">
    <b-container>
      <div class="title">
        <h3>Features</h3>
      </div>
      <div class="features-container">
        <b-row class="justify-content-center">
          <b-col cols="6" xs="6" sm="6" v-for="(feature, i) in features" :key="i">
            <div class="feature">
              <div class="feature-img">
                <img :src="feature.img" alt="" />
              </div>
              <div class="feature-content">
                <p>
                  {{ feature.content }}
                </p>
              </div>
            </div>
          </b-col>
        </b-row>
        <img class="curve-image" src="@/assets/images/landing/curve.png" alt="curve" />
      </div>
    </b-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      features: [
        {
          img: require("@/assets/images/landing/feature1.svg"),
          content: `15 minute delivery`,
        },
        {
          img: require("@/assets/images/landing/feature2.svg"),
          content: `Free delivery`,
        },
        {
          img: require("@/assets/images/landing/feature3.svg"),
          content: `No minimum order`,
        },
        {
          img: require("@/assets/images/landing/feature4.svg"),
          content: `Only convenience`,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.features {
  padding: 50px 0 47px 0;
  background: #FBFBFB;

  @media (max-width: 767px) {
    padding: 40px 12px;
  }

  .title {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    h3 {
      font-style: normal;
      font-weight: bold;
      font-size: 60px;
      line-height: 70px;
      color: #0B0C0B;
      text-align: center;
      max-width: 450px;
      width: 100%;
      margin: 0;

      @media (max-width: 767px) {
        margin-left: 0px;
        font-size: 45px;
        line-height: 53px;
      }
    }
  }

  .features-container {
    width: 750px;
    margin: 0 auto;
    position: relative;
    text-align: center;

    @media (max-width: 991px) {
      width: 100%;
    }

    .feature {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
      margin-bottom: 20px;
      width: 330px;
      padding: 20px 0;
      transition: 0.3s linear;

      &-img {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80px;
        height: 90px;

        img {
          object-fit: cover;
          text-align: center;
          display: block;
        }
      }

      .feature-content {
        padding: 20px 0 0;
        border-radius: 0 0 25px 25px;
        transform: translateY(-7px);

        p {
          font-style: normal;
          font-weight: bold;
          font-size: 35px;
          line-height: 41px;
          text-align: center;
          color: #000000;
          display: flex;
          align-items: center;
          text-transform: capitalize;
          margin: 0;
        }
      }

      @media screen and (max-width: 767px) {
        width: initial;
        max-width: 330px;

        &-img {
          width: 53px;
          height: 53px;
          margin-bottom: 18px;
        }

        .feature-content {
          p {
            font-size: 25px;
            line-height: 126.19%;
          }
        }
      }
    }
  }
}

.curve-image {
  position: absolute;
  bottom: 85px;
  right: -185px;

  @media (max-width: 1199px) {
    right: -100px;
  }

  @media (max-width: 991px) {
    position: relative;
    bottom: initial;
    right: initial;
  }
}
</style>
