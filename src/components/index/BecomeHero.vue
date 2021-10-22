<template>
  <div>
    <div class="become-delivery">
      <div class="become-delivery-container">
        <h3 class="title">Become a Delivery Hero</h3>
        <div class="become-delivery-wrapper">
          <div class="become-delivery-img">
            <img class="img-fluid" src="@/assets/images/landing/delivery_hero.png" />
          </div>
          <div class="become-input-wrapper">
            <p>Become a Delivery Hero and be a part of the future of delivery. We're committed to having heroes on every block, but we need your help. You can be the one who saves the day.  Sign up today!</p>
            <form class="become-input-inner" @submit="sendEmail">
              <input
                type="email"
                class="become-input"
                placeholder="Enter your email"
                required
              />
              <button class="become-input-btn" type="submit">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="become-owner">
      <div class="become-delivery-container">
        <h3 class="title">Become a Hub Owner</h3>
        <div class="become-delivery-wrapper">
          <div class="become-input-wrapper">
            <p>Join the JustGo family and become a hub owner! Earn money from the comfort of your own home. Save money on monthly expenses and enjoy discount prices on everyday products. Sign up today!</p>
            <form class="become-input-inner">
              <input
                type="email"
                class="become-input"
                placeholder="Enter your email"
                required
              />
              <button class="become-input-btn" type="submit">
                Sign up
              </button>
            </form>
          </div>
          <div class="become-delivery-img">
            <img class="img-fluid" src="@/assets/images/landing/hub_owner.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    sendEmail(e) {
      e.preventDefault();
    }
  }
}
</script>

<style lang="scss" scoped>
h3.title {
  font-style: normal;
  font-weight: bold;
  font-size: 60px;
  line-height: 70px;
  color: #000000;
  margin-bottom: 25px;
  text-align: center;
}

.become-delivery-wrapper {
  display: flex;

  .become-delivery-img {
    margin-right: 69px;
  }

  .become-input-wrapper {
    padding-top: 30px;

    p {
      font-weight: normal;
      font-size: 18px;
      line-height: 170%;
      color: #000000;
      margin-bottom: 30px;
      max-width: 440px;
    }

    .become-input-inner {
      position: relative;

      .become-input {
        background: #FFFFFF;
        border: 1px solid #C4C4C4;
        box-sizing: border-box;
        box-shadow: 0px 0px 15px -1px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        height: 60px;
        font-size: 20px;
        line-height: 23px;
        padding-left: 28px;
        padding-right: 165px;
        width: 100%;

        &::placeholder {
          color: #ACACAC;
        }
      }

      .become-input-btn {
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
        border-radius: 7px;
        position: absolute;
        top: 6px;
        right: 6px;

        &:hover {
          opacity: .8;
        }
      }
    }
  }
}

.become-delivery {
  padding: 50px 0;
  background: #FBFBFB;

  .become-delivery-container {
    max-width: 1380px;
    padding: 0 20px 40px;
    margin: 0 auto;
  }
}

.become-owner {
  padding: 50px 0;

  .become-delivery-container {
    max-width: 900px;
    padding: 0 20px;
    margin: 0 auto;
  }

  .become-delivery-wrapper {
    justify-content: space-between;

    .become-delivery-img {
      margin-right: 0;
    }

    .become-input-wrapper {
      padding-top: 80px;
      margin-right: 20px;
    }
  }
}

@media screen and (max-width: 767px) {
  h3.title {
    font-size: 45px;
    line-height: 110%;
    margin-bottom: 40px;
  }

  .become-delivery-wrapper {
    flex-direction: column;
    align-items: center;
    text-align: center;

    .become-delivery-img {
      margin: 0;
    }

    .become-input-wrapper {
      padding-top: 40px;

      p {
        width: 90%;
        margin: 0 auto;
        margin-bottom: 30px;
      }

      .become-input-inner {
        .become-input {
          padding-right: 28px;
        }

        .become-input-btn {
          position: relative;
          margin: 0 auto;
          margin-top: 20px;
          width: 262px;
        }
      }
    }
  }

  .become-delivery {
    padding: 40px 20px;

    .become-delivery-container {
      padding: 0;

      .become-delivery-img {
        img {
          width: 340px;
          height: 184px;
        }
      }
    }
  }

  .become-owner {
    .become-delivery-container {
      .become-delivery-wrapper {
        flex-direction: column-reverse;

        .become-delivery-img {
          margin-bottom: 40px;
  
          img {
            width: 184px;
            height: 184px;
          }
        }
  
        .become-input-wrapper {
          padding: 0;
          margin: 0;
        }
      }
    }
  }
}
</style>