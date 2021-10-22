<template>
  <div class="cart-modal">
    <div class="img-container">
      <img :src="cartItem.img" alt="" />
    </div>
    <div class="item-details">
      <h1 class="item-title">{{ cartItem.title }}</h1>
      <div class="details">
        <p class="item-detail" v-if="cartItem.details">{{ cartItem.details }}</p>
        <div class="product-prices">
          <p class="sale-price" :class="{ active: cartItem.salePrice }">
            {{ formatPrice(cartItem.price) }}
          </p>
          <p class="default-price">
            {{
              formatPrice(
                cartItem.salePrice ? cartItem.salePrice : cartItem.price
              )
            }}
          </p>
        </div>
      </div>
      <a href="#" class="add-btn" @click="addCartItem(cartItem)">
        Add to Cart
      </a>
    </div>
    <div class="exit" @click="closeModal">
      <i class="far fa-window-close"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["showModal"],
  computed: {
    cartItem() {
      return this.$store.getters.getSingleItem;
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    addCartItem(prod) {
      this.closeModal();
      this.$emit("addCartItem", prod);
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-modal {
  position: fixed;
  inset: 0;
  height: 100%;
  width: 100%;
  z-index: 999999999;
  overflow: hidden;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fcfcfc;
  top: 0;
  left: 0;

  .img-container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: 80%;
      max-height: 300px;
    }
  }
  .item-details {
    box-shadow: 4px 4px 1rem rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1rem 1rem 2rem;
    h1 {
      margin: 0 0 .3rem;
      font-size: 2rem;
      color: #000;

    }
    .details{
      display: flex;
      column-gap: 20px;
      margin-bottom: .7rem;
    }
    p {
      color: #969696;
      font-weight: 400;
      font-size: 1.1rem;
    }
    .product-prices {
      text-align: center;
      display: flex;
      column-gap: 12px;
      p {
        margin: 0;

        &.sale-price {
          margin: 0;

          display: none;
          &.active {
            text-decoration: line-through;
            display: block;
          }
        }
      }
    }
    .add-btn {
      cursor: pointer;
      padding: 0.75rem;
      width: 96%;
      max-width: 15rem;
      color: #fcfcfc;
      background: linear-gradient(45deg, #23a534, #a0e630);
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
      border: none;
      border-radius: 0.3rem;
      font-size: 1.3rem;
      font-weight: 500;
      z-index: 51;
      margin: auto;
    }
    @media (max-width: 768px) {
      h1 {
        font-size: 1rem;
      }
      p {
        font-size: 0.8rem;
      }
    }
  }
  .exit {
    font-size: 2rem;
    position: absolute;
    top: 1rem;
    left: 1rem;
    cursor: pointer;
    color: #000;
  }
}
</style>
