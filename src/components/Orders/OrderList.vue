<template>
  <div class="order-page">
    <div v-if="loading" class="loader">
      <b-icon
        animation="spin"
        class="spin-icon"
        font-scale="2.2"
        icon="arrow-clockwise"
      ></b-icon>
    </div>

    <div v-else>
      <div class="orders-container">
        <template v-if="orders.length">
          <transition-group name="list-slide-in" tag="div">
            <order-item
              v-for="order in orders"
              v-if="showOrders"
              :key="order._id"
              :order="order"
              @reorder="reorder"
            >
            </order-item>
          </transition-group>
        </template>
        <div class="nothing-found" v-else>
          <img src="@/assets/images/empty-cart.gif" alt="" />
          <h3>No order placed yet!</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderItem from './OrderItem';

export default {
  name: 'order-list',
  components: {
    OrderItem
  },
  props: {
    loading: Boolean,
    showOrders: Boolean,
    orders: Array,
  },
  methods: {
    reorder(order) {
      this.$emit('reorder', order);
    },
  }
}
</script>

<style lang="scss" scoped>
.loader {
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nothing-found {
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    max-width: 60%;
  }
  h3 {
    font-size: 1.2rem;
    font-weight: 600;
  }
}
.order-page {
  .orders-container {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 100%;
    max-height: 430px;
    overflow: auto;

    @media screen and (max-width: 575px) {
      max-height: calc(100vh - 80px);
    }
  }
}
</style>
