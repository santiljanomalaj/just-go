<template>
  <el-drawer
    title="My Bag"
    class="mybag-drawer"
    :visible.sync="drawer"
    :direction="direction"
    :before-close="handleClose"
  >
    <div class="main-cart">
      <div class="cart-wrapper">
        <div class="cart-inner">
          <div class="cart-items">
            <template v-if="cartItems.length">
              <div class="cart-items-inner">
                <div
                  v-for="(cartItem, i) in cartItems"
                  :key="i"
                  class="cart-item"
                >
                  <div class="cart-img-container">
                    <div class="cart-img">
                      <img :src="cartItem.img" alt="" class="img-fluid" />
                    </div>
                  </div>
                  <p class="name">{{ cartItem.title }}</p>
                  <div class="item-quantity">
                    <div
                      class="cart-arrow"
                      @click="updateQuantity(cartItem._id, 'decrease', cartItem)"
                    >
                      <img
                        v-if="cartItem.quantity <= 1"
                        src="@/assets/images/checkout/trash.svg"
                        alt=""
                      />
                      <img
                        v-else
                        src="@/assets/images/checkout/minus.svg"
                        alt=""
                      />
                    </div>
                    <div class="item-quan">{{ cartItem.quantity }}</div>
                    <div
                      class="cart-arrow"
                      @click="updateQuantity(cartItem._id, 'increase', cartItem)"
                    >
                      <img
                        src="@/assets/images/checkout/plus.svg"
                        alt=""
                      />
                    </div>
                  </div>
                  <p class="price">
                    {{
                      formatPrice(
                        cartItem.salePrice
                          ? cartItem.salePrice
                          : cartItem.price
                      )
                    }}
                  </p>
                </div>
              </div>
              <div class="cart-price-breakdown">
                <div class="cart-fee">
                  <p>Subtotal:</p>
                  <p>{{ formatPrice(subTotoalPrice) }}</p>
                </div>
                <div class="cart-fee">
                  <p>Discount:</p>
                  <p>{{ formatPrice(discount) }}</p>
                </div>
                <div class="cart-fee">
                  <p>Tax:</p>
                  <p>{{ formatPrice(tax) }}</p>
                </div>
                <div class="cart-fee">
                  <p>Delivery fee:</p>
                  <div>
                    <p class="delivery-fee">$1.99</p>
                    <p class="delivery">FREE</p>
                  </div>
                </div>
                <div class="cart-fee">
                  <p>Tips:</p>
                  <p>{{ formatPrice(tip) }}</p>
                </div>
                <div class="cart-total cart-fee">
                  <p>Total</p>
                  <p>{{ formatPrice(totalPrice) }}</p>
                </div>
              </div>
            </template>
            <div v-else class="nothing-found">
              <img alt="" src="@/assets/images/empty-cart.gif" />
              <h3>Nothing inside Cart!</h3>
            </div>
            <div class="button-container">
              <div
                :class="{ multiple: cartItems.length }"
                class="button-container-inner w-100"
              >
                <div
                  v-if="cartItems.length"
                  class="bottom-button md"
                  @click="reviewOrder"
                >
                  <div>
                    <img src="@/assets/images/nav/white-cart.svg">
                    <span>{{productsLength}}</span>
                  </div>
                  <p>Go to Checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <transition mode="in-out" name="slide-fade-complete">
        <Checkout
          v-show="reviewOrderView"
          :discount="discount"
          @closeCart="toggleCartModal"
          @close-me="reviewOrderView = false"
          @changeTip="changeTip"
        />
      </transition>
    </div>
  </el-drawer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Checkout from "@/components/shared/Checkout";

export default {
  name: 'bag-drawer',
  props: {
    drawerVisible: Boolean,
    showCart: Boolean
  },
  components: {
    Checkout,
  },
  data() {
    return {
      drawer: false,
      direction: 'rtl',
      reviewOrderView: false,
      newUserDiscount: false,
      tip: 2,
    }
  },
  watch: {
    drawerVisible(val) {
      this.drawer = val;
      if (val && this.getUser.uid) {
        this.FETCH_USER_ORDERS(this.getUser.uid).then((orders) => {
          if (orders.length === 0) this.newUserDiscount = true;
        });
  
        this.$gtag.screenview({
          app_name: "Just Go",
          screen_name: "Cart",
        });
      }
    }
  },
  computed: {
    ...mapGetters(["signedIn", "getUser", 'getCategories']),
    cartItems() {
      return this.$store.getters.getCartItems;
    },
    productsLength() {
      return this.$store.getters.getProductsLength;
    },
    totalPrice() {
      let price = 0;

      price = this.subTotoalPrice + this.tax + this.tip + this.discount;
      return price < 0 ? 0 : price;
    },
    subTotoalPrice() {
      let items = this.$store.getters.getCartItems;
      let price = 0;
      items.forEach((item) => {
        if (item.salePrice) {
          price += +item.salePrice * +item.quantity;
        } else {
          price += +item.price * +item.quantity;
        }
      });
      return price;
    },
    tax() {
      let price = this.subTotoalPrice + this.tip + this.discount;
      price = price < 0 ? 0 : price;

      return price * 7.75 / 100;
    },
    discount() {
      if (this.newUserDiscount) return -5;
      return 0;
    },
  },
  methods: {
    ...mapActions(["VERIFY_LOGIN", "FETCH_USER_ORDERS"]),
    handleClose(done) {
      done();
      this.$emit('drawerToggle', false);
    },
    reviewOrder() {
      this.reviewOrderView = true;
    },
    toggleCartModal() {
      this.$emit("toggleCartModal");
    },
    categoryName(id) {
      return this.getCategories.find(category => category._id === id).name;
    },
    updateQuantity(id, data, cartItem) {
      this.$gtag.event('add_to_cart', {
        items: [
          {
            name: cartItem.title,
            category: this.categoryName(cartItem.categories[0]),
            list_position: cartItem.index?cartItem.index: '',
            list_name: 'Cart Page',
            quantity: 1,
            price: cartItem.salePrice ? cartItem.salePrice : cartItem.price,
          }
        ]
      });
      if (data === 'decrease' && cartItem.quantity === 1) {
        this.removeItem(id);
      } else {
        this.$store.commit("updateQuantity", {
          _id: id,
          data,
        });
      }
    },
    removeItem(payload) {
      this.$store.commit("removeItem", payload);
    },
    changeTip(val) {
      this.tip = val;
    }
  }
}
</script>

<style lang="scss" scoped>
.main-cart {
  z-index: 9;
  //   position: relative;
  .cart-wrapper {
    z-index: 50;
    overflow: hidden;
    transition: all 0.4s;
    overflow-y: scroll;
    padding: 0 15px;

    .cart-inner {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      width: 100%;
      height: 100%;
      line-height: 1.5rem;

      .cart-header {
        border-bottom: 1px solid #ececec;
        display: flex;
        justify-content: space-between;
        align-items: center;

        letter-spacing: -0.02em;
        width: 100%;
        background-color: #fff;
        z-index: 1;
        border-radius: 0;
        min-height: 4.5rem;

        p {
          color: #000;
          font-weight: 700;
          font-size: 1.5rem;
          line-height: 2.25rem;

          &.left {
            margin: 18px 0 18px 32px;
          }

          &.right {
            margin: 18px 32px 18px 0;
          }
        }
      }

      .cart-items {
        margin: auto;
        align-items: center;
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        justify-content: space-evenly;

        .cart-items-inner {
          padding: 10px;
          margin-bottom: 80px;

          .cart-item {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #FFFFFF;
            box-shadow: 0px 0px 15px -1px rgba(0, 0, 0, 0.15);
            border-radius: 10px;
            width: 100%;
            padding: 10px 15px;
            margin-bottom: 10px;

            .cart-item-delete {
              display: flex;
              justify-content: center;
              position: absolute;
              top: 0.3rem;
              left: 0.6rem;
              height: 1rem;
              width: 1rem;
              cursor: pointer;
              -webkit-user-select: none;
              -ms-user-select: none;
              user-select: none;
            }

            .cart-img-container {
              .cart-img {
                width: 80px;
                height: 80px;
                display: flex;
                align-content: center;
                justify-content: center;
              }
            }

            .name {
              font-weight: 300;
              font-size: 14px;
              line-height: 16px;
              color: #000000;
              margin: 0 16px;
              flex: 1;
            }

            .item-quantity {
              background: #fff;
              display: flex;
              justify-content: space-evenly;
              align-items: center;
              -webkit-user-select: none;
              -ms-user-select: none;
              user-select: none;
              padding: 10px;
              border: 1px solid #E5E5E5;
              box-sizing: border-box;
              border-radius: 11px;

              .cart-arrow {
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                padding: 0 5px;

                &.disabled {
                  pointer-events: none;
                  cursor: not-allowed;
                }
              }

              .item-quan {
                padding: 0 5px;
                font-weight: bold;
                font-size: 14px;
                line-height: 15px;
                color: #646363;
              }
            }

            .price {
              font-size: 14px;
              line-height: 16px;
              color: #646363;
              font-weight: normal;
              margin: 0;
              margin-left: 26px;
            }

            @media screen and (max-width: 575px) {
              .cart-img-container {
                .cart-img {
                  width: 55px;
                  height: 59px;
                }
              }

              .name {
                font-size: 12px;
                line-height: 14px;
              }
            }
          }
        }

        .cart-code {
          align-items: center;
          color: rgba(51, 51, 51, 0.48);
          width: 90%;
          max-width: 26rem;
          min-height: 2.8rem;
          border-bottom: thin dotted rgba(51, 51, 51, 0.12);
          border-width: thin medium;
          border-top: thin dotted rgba(51, 51, 51, 0.12);
          margin: 1rem auto 1.25rem;
          display: flex;
          line-height: 1.5rem;

          svg {
            margin: 0 0.5rem;
            fill: rgba(51, 51, 51, 0.48);
            transition: all 0.3s;
          }

          input {
            border: 0;
            color: rgba(51, 51, 51, 0.48);
            width: 100%;
            background-color: #fff;
            font-size: 1rem;
          }
        }

        .cart-price-breakdown {
          display: flex;
          flex-direction: column;
          color: rgba(51, 51, 51, 0.47843137254901963);
          margin-right: auto;
          margin-left: auto;
          padding: 10px;

          div {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            max-height: 1.5rem;

            &.cart-fee {
              margin-bottom: 0.75rem;

              p {
                font-weight: normal;
                font-size: 14px;
                line-height: 16px;
                color: #646363;
              }

              .delivery-fee {
                text-decoration: line-through;
                margin-right: 10px;
                font-size: 16px;;
              }

              .delivery {
                font-weight: bold;
                color: #3ba535;
              }
            }

            &.cart-total {
              margin-top: 15px;

              p {
                font-weight: bold;
                font-size: 18px;
                line-height: 21px;
              }
            }
          }
        }

        .button-container {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 10px;

          .button-container-inner {
            .bottom-button {
              background: #23A334;
              border-radius: 21px;
              text-align: center;
              padding: 14px;
              position: relative;
              cursor: pointer;

              div {
                position: absolute;
                left: 24px;
                top: 12px;

                span {
                  font-weight: bold;
                  font-size: 14px;
                  line-height: 16px;
                  color: #FFFFFF;
                }
              }

              p {
                font-weight: bold;
                font-size: 16px;
                line-height: 19px;
                color: white;
                margin-bottom: 0;
              }
            }
          }
        }
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
    }
  }

  .cart-bg {
    position: fixed;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: auto;
    z-index: 6;
    top: 0;
  }
}
</style>