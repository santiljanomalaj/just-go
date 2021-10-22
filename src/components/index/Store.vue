<template>
  <section class="daily-essentials">
    <b-container>
      <div class="content-container">
        <img class="content-img" src="@/assets/images/landing/delivery.svg" alt="delivery">
        <p class="content-text">We believe the future of delivery is instant and we are making it our mission to give you that experience. Get your favorite products delivered to your door in 15 minutes or less.</p>
      </div>
    </b-container>
  </section>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.daily-essentials {
  padding: 88px 28px;
  background-color: #23A534;

  .content-container {
    max-width: 1030px;
    text-align: center;
    position: relative;
    margin: 0 auto;
    padding: 66px 0;

    .content-img {
      position: absolute;
      top: 0;
      left: 189px;
    }

    .content-text {
      font-style: normal;
      font-weight: bold;
      font-size: 45px;
      line-height: 53px;
      text-align: center;
      color: #FFFFFF;
      margin: 0;
    }
  }

  @media screen and (max-width: 767px) {
    .content-container {
      padding: 0;
      
      .content-img {
        display: none;
      }

      .content-text {
        font-size: 30px;
        line-height: 129.19%;
      }
    }
  }
}
</style>
