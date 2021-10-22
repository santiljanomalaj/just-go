<template>
<div class="receipt">
  <span class="close" @click="$emit('close-me')">
    <i class="bi bi-x-square"></i>
  </span>
  <div class="custom-container">
    <b-row>
      <b-col cols="12">
        <h2>Receipt</h2>
      </b-col>
      <b-col cols="12 mt-5">
        <div class="d-flex  justify-content-between align-items-center mb-4 mb-sm-2" v-for="prod in order.products" :key="prod.id">
          <div>
            <h3>{{prod.title}}</h3>
            <p>{{ formatPrice(prod.price) }} | {{prod.quantity}} items</p>
          </div>
          <div>
            <h3>{{formatPrice(prod.price*prod.quantity)}}</h3>
          </div>
        </div>
        <hr>
        <div class="d-flex justify-content-between align-items-center mb-2">
            <h4>Subtotal</h4>
            <h4>{{formatPrice(order.subtotal)}}</h4>
        </div>
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h4>Tax</h4>
          <h4>{{formatPrice(order.tax)}}</h4>
        </div>
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h4>Delivery</h4>
          <h4 class="free">FREE</h4>
        </div>
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h4>Tip</h4>
          <h4>{{formatPrice(order.tip)}}</h4>
        </div>
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h3>Total</h3>
          <h3>{{formatPrice(order.total)}}</h3>
        </div>

      </b-col>
    </b-row>
  </div>
</div>
</template>

<script>
export default {
  props: ['order'],
  name: 'Receipt',
}
</script>

<style lang="scss" scoped>
.receipt {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 100;
  padding-block: 40px;
  .close{
    position: absolute;
    top: 24px;
    left: 24px;
    color: #000;
    cursor: pointer;
  }
  h2{
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    color: #000;
  }
  h3{
    font-family: 'Lato', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: #000;
    margin-bottom: 6px;
  }
  h4{
    font-family: 'Lato', sans-serif;
    font-size: 18px;
    font-weight: 500;
    color: #000;
    margin-bottom: 6px;
    &.free{
      color: #1e852b;
      font-weight: bold;
    }
  }
  p{
    font-family: 'Lato', sans-serif;

    font-size: 17px;
    font-weight: 500;
    color: #737373;
    margin-bottom: 0;
  }
}
</style>
