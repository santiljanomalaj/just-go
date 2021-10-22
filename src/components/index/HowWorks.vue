<template>
  <div class="how-works-section">
    <h3 class="title">How this works</h3>
    <div v-hscroll class="how-works-container">
      <div class="how-works-wrapper">
        <h3 class="title">How this works</h3>
        <div class="how-works-step1 how-works-step">
          <div class="step-number">01</div>
          <div class="how-works-step-inner">
            <div class="how-works-step-inner-child">
              <img src="@/assets/images/landing/step1.svg" alt="step1" />
            </div>
            <div class="how-works-step-content how-works-step-inner-child">
              <h5 class="how-works-step__title">Tell us about your needs</h5>
              <p class="how-works-step__desc">Whether it's a late night snack, or a refreshing drink, you are a few clicks away from having hundreds of products available to you.</p>
            </div>
          </div>
          <img class="step1_2" src="@/assets/images/landing/step1_2.svg" alt='step' />
        </div>
      </div>
      <div class="how-works-wrapper">
        <div class="how-works-step2 how-works-step">
          <div class="step-number">02</div>
          <div class="how-works-step-inner">
            <div class="how-works-step-inner-child mobile">
              <img src="@/assets/images/landing/step2.svg" alt="step1" />
            </div>
            <div class="how-works-step-content how-works-step-inner-child">
              <h5 class="how-works-step__title">Relax, we’ll see you soon</h5>
              <p class="how-works-step__desc">All the important is done, the order is places. Relax, listen to your favorite music track. Now it is all on us!</p>
            </div>
            <div class="how-works-step-inner-child desktop">
              <img src="@/assets/images/landing/step2.svg" alt="step1" />
            </div>
          </div>
          <img class="step2_3" src="@/assets/images/landing/step2_3.svg" alt='step' />
        </div>
      </div>
      <div class="how-works-wrapper">
        <div class="how-works-step3 how-works-step">
          <div class="step-number">03</div>
          <div class="how-works-step-inner">
            <div class="how-works-step-inner-child">
              <img src="@/assets/images/landing/step3.svg" alt="step1" />
            </div>
            <div class="how-works-step-content how-works-step-inner-child">
              <h5 class="how-works-step__title">Your order is compete in 15 min or less</h5>
              <p class="how-works-step__desc">All done for you. We take care of all the stuff you don't like. Get your favorite products in 15 minutes or less…delivered  by our delivery hero’s.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="go-to-shop">
      <div
        class="go-to-shop__btn"
        @click="goShop"
      >
        Go to the shop
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goShop() {
      this.$router.push('/browse');
    }
  }
}
</script>

<style lang="scss" scoped>
.how-works-section {
  padding: 60px 20px 80px;
  background: #23A534;

  h3.title {
    display: none;
  }

  .how-works-container {
    display: flex;
    overflow-x: auto;
    margin-left: 85px;
    margin-right: 85px;

    h3.title {
      font-style: normal;
      font-weight: bold;
      color: #FFFFFF;
      font-size: 30px;
      line-height: 35px;
      margin-left: 56px;
      margin-bottom: 36px;
      display: block;
    }

    .how-works-wrapper {
      margin-right: 180px;
      min-width: 450px;

      &:last-child {
        margin-right: 0;
      }
      
      .how-works-step {
        display: flex;
        position: relative;
  
        .step-number {
          font-style: normal;
          font-weight: bold;
          font-size: 130px;
          line-height: 152px;
          color: #FFFFFF;
          margin-right: 30px;
        }
  
        .how-works-step-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
  
          .how-works-step-inner-child + .how-works-step-inner-child {
            margin-top: 48px;
          }
  
          .how-works-step-content {
            max-width: 270px;
    
            .how-works-step__title {
              font-style: normal;
              font-weight: bold;
              font-size: 24px;
              line-height: 28px;
              color: #FFFFFF;
              margin-bottom: 20px;
            }
    
            .how-works-step__desc {
              font-style: normal;
              font-weight: normal;
              font-size: 18px;
              line-height: 170%;
              color: #FFFFFF;
              margin-bottom: 0;
            }
          }
        }
      }

      .how-works-step1 {
        .step-number {
          margin-top: 90px;
        }
      }

      .how-works-step2 {
        .how-works-step-inner {
          margin-top: 70px;
        }

        .desktop {
          display: none;
        }

        .mobile {
          display: block;
        }
      }

      .how-works-step3 {
        margin-top: 93px;

        .step-number {
          margin-top: 55px;
        }
      }

      .step1_2 {
        position: absolute;
        right: -225px;
        top: 80px;
      }

      .step2_3 {
        position: absolute;
        right: -150px;
        bottom: -40px;
      }
    }
  }
  
  .go-to-shop {
    display: flex;
    align-items: center;
    margin-top: 18px;

    &__btn {
      background: #FFFFFF;
      box-shadow: 0px 0px 15px -1px rgba(0, 0, 0, 0.25);
      border-radius: 7px;
      font-weight: bold;
      font-size: 20px;
      line-height: 23px;
      color: #000000;
      padding: 15px 65px;
      margin: 0 auto;
      cursor: pointer;

      &:hover,
      &:focus {
        opacity: .9;
      }
    }
  }

  @media screen and (max-width: 991px) {
    padding: 50px 40px;

    h3.title {
      margin-left: 0;
      font-style: normal;
      font-weight: bold;
      color: #FFFFFF;
      font-size: 45px;
      line-height: 53px;
      text-align: center;
      display: block;
      margin-bottom: 50px;
    }

    .how-works-container {
      margin: 0;
      flex-direction: column;
      align-content: center;

      h3.title {
        display: none;
      }

      .how-works-wrapper {
        margin-right: 0px;
        display: flex;
        justify-content: center;
        min-width: initial;

        .how-works-step {
          margin-bottom: 40px;

          .step-number {
            font-size: 30px;
            line-height: 35px;
            position: absolute;
          }

          .how-works-step-inner {
            padding-top: 50px;
            text-align: center;

            .how-works-step-content {
              max-width: 270px;
      
              .how-works-step__title {
                font-style: normal;
                font-weight: bold;
                font-size: 26px;
                line-height: 30px;
                color: #FFFFFF;
                margin-bottom: 20px;
              }
      
              .how-works-step__desc {
                font-style: normal;
                font-weight: normal;
                font-size: 18px;
                line-height: 170%;
                color: #FFFFFF;
                margin-bottom: 0;
              }
            }
          }
        }

        .how-works-step1 {
          .step-number {
            margin-top: 0;
          }
        }

        .how-works-step2 {
          .how-works-step-inner {
            margin-top: 0;
          }

          .desktop {
            display: none;
          }

          .mobile {
            display: block;
          }
        }

        .how-works-step3 {
          margin-top: 0;

          .step-number {
            margin-top: 0;
          }
        }

        .step1_2,
        .step2_3 {
          display: none;
        }
      }
    }
  }
}
</style>