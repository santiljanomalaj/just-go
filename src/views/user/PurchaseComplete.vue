<template>
  <div class="order-placed">
    <img alt="" src="@/assets/images/success.gif" />
    <h2 v-if="this.$route.query.price">
      {{ formatPrice(this.$route.query.price) }}
    </h2>
    <h2>
      Your payment has been made successfully, Please check delivery status at
      order page.!
    </h2>
    <div class="bottom-button" @click="closeMsg">
      <p>Back</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PurchaseComplete",
  methods: {
    closeMsg() {
      this.$router.push("/browse");
    },
  },
};
</script>

<style lang="scss" scoped>
.order-placed {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  height: 100%;
  background-color: #fff;

  h2 {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
  }

  img {
    max-width: 60%;
  }

  .bottom-button {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: row;
    // align-items: center;
    cursor: pointer;
    justify-content: center;
    height: 2.5rem;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
    border-radius: 2.5rem;
    width: 200px;
    background: #efefef;
    color: #000;

    p {
      text-align: center;
      width: 100%;
      line-height: 2.5rem;
      font-weight: 600;
    }
  }
}
</style>
