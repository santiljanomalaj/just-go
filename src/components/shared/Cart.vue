<template>
  <div class="main-cart">
    <div class="cart-bg" @click="toggleCartModal"></div>
    <div class="cart-wrapper">
      <div class="cart-inner">
        <div class="cart-header">
          <p class="left">My Just Go Bag</p>
          <p class="right">{{ formatPrice(totalPrice) }}</p>
        </div>
        <div class="cart-items">
          <template v-if="cartItems.length">
            <div class="cart-items-inner">
              <div
                v-for="(cartItem, i) in cartItems"
                :key="i"
                class="cart-item"
              >
                <div class="cart-item-delete" @click="removeItem(cartItem._id)">
                  <i class="far fa-window-close"></i>
                </div>
                <div class="cart-img-container">
                  <div class="cart-img">
                    <img :src="cartItem.img" alt="" class="img-fluid" />
                  </div>
                </div>
                <div class="item-details">
                  <div class="details-inner">
                    <p class="name">{{ cartItem.title }}</p>
                    <p class="detail">{{ cartItem.details }}</p>
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
                <div class="item-quantity">
                  <div
                    class="cart-arrow"
                    @click="updateQuantity(cartItem._id, 'increase', cartItem)"
                  >
                    <svg fill="none" height="8" viewBox="0 0 12 8" width="12">
                      <path
                        clip-rule="evenodd"
                        d="M5.99976 2.91409L1.7373 7.17392C1.56919 7.34192 1.43739 7.42113 1.29582 7.46402C1.15424 7.5069 1.00946 7.5069 0.867884 7.46402C0.726309 7.42113 0.594509 7.34192 0.426397 7.17392L0.322219 7.0698C0.154107 6.90179 0.0748491 6.77007 0.0319386 6.62859C-0.010972 6.4871 -0.010972 6.3424 0.0319386 6.20092C0.0748491 6.05943 0.154107 5.92771 0.322219 5.7597L5.29221 0.792771C5.68298 0.402247 6.31653 0.402247 6.7073 0.792771L11.6773 5.7597C11.8454 5.92771 11.9247 6.05943 11.9676 6.20092C12.0105 6.3424 12.0105 6.4871 11.9676 6.62859C11.9247 6.77007 11.8454 6.90179 11.6773 7.0698L11.5731 7.17392C11.405 7.34192 11.2732 7.42113 11.1316 7.46402C10.9901 7.5069 10.8453 7.5069 10.7037 7.46402C10.5621 7.42113 10.4303 7.34192 10.2622 7.17392L5.99976 2.91409Z"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div class="item-quan">{{ cartItem.quantity }}</div>
                  <div
                    :class="{ disabled: cartItem.quantity <= 1 }"
                    class="cart-arrow"
                    @click="updateQuantity(cartItem._id, 'decrease', cartItem)"
                  >
                    <svg fill="none" height="8" viewBox="0 0 12 8" width="12">
                      <path
                        clip-rule="evenodd"
                        d="M5.99976 5.08194L1.7373 0.822117C1.56919 0.654109 1.43739 0.5749 1.29582 0.532015C1.15424 0.489131 1.00946 0.489131 0.867884 0.532015C0.726309 0.5749 0.594509 0.654109 0.426397 0.822117L0.322219 0.926231C0.154107 1.09424 0.0748491 1.22596 0.0319386 1.36745C-0.010972 1.50893 -0.010972 1.65363 0.0319386 1.79512C0.0748491 1.9366 0.154107 2.06832 0.322219 2.23633L5.29221 7.20326C5.68298 7.59379 6.31653 7.59379 6.7073 7.20326L11.6773 2.23633C11.8454 2.06832 11.9247 1.9366 11.9676 1.79512C12.0105 1.65363 12.0105 1.50893 11.9676 1.36745C11.9247 1.22596 11.8454 1.09424 11.6773 0.926231L11.5731 0.822117C11.405 0.654109 11.2732 0.5749 11.1316 0.532015C10.9901 0.489131 10.8453 0.489131 10.7037 0.532015C10.5621 0.5749 10.4303 0.654109 10.2622 0.822117L5.99976 5.08194Z"
                        fill="#333333"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="cart-price-breakdown">
              <div class="cart-fee">
                <p>Subtotal</p>
                <p>{{ formatPrice(subTotoalPrice) }}</p>
              </div>
              <div class="cart-fee">
                <p>Tax</p>
                <p>{{ formatPrice(tax) }}</p>
              </div>
              <div class="cart-fee">
                <p>Delivery</p>
                <p class="delivery">FREE</p>
              </div>

              <div class="cart-fee" v-if="discount">
                <p>Discount</p>
                <p>{{ formatPrice(discount) }}</p>
              </div>
              <div class="cart-total cart-fee">
                <p>Total</p>
                <p>{{ formatPrice(totalPrice) }}</p>
              </div>
            </div>
            <div class="cart-buffer"></div>
            <div class="cart-error minimum">
              <p><span></span></p>
            </div>
          </template>
          <div v-else class="nothing-found">
            <img alt="" src="@/assets/images/empty-cart.gif" />
            <h3>Nothing inside Cart!</h3>
          </div>
          <div class="button-container" style="height: 5rem">
            <div
              :class="{ multiple: cartItems.length }"
              class="button-container-inner"
            >
              <div class="bottom-button sm" @click="toggleCartModal">
                <p>Back</p>
              </div>
              <div
                v-if="cartItems.length"
                class="bottom-button md"
                @click="reviewOrder"
              >
                <p>Review order</p>
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
      />
    </transition>
  </div>
</template>

<script>
import Checkout from "./Checkout";
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["showCart"],
  components: {
    Checkout,
  },
  data() {
    return {
      reviewOrderView: false,
      newUserDiscount: false,
    };
  },
  methods: {
    ...mapActions(["VERIFY_LOGIN", "FETCH_USER_ORDERS"]),
    reviewOrder() {
      if (this.signedIn) {
        this.reviewOrderView = true;
      } else {
        this.VERIFY_LOGIN()
          .then((res) => {
            this.reviewOrderView = true;
          })
          .catch((err) => {
            this.$router.push("/login");
          });
      }
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
      this.$store.commit("updateQuantity", {
        _id: id,
        data,
      });
    },
    removeItem(payload) {
      this.$store.commit("removeItem", payload);
    },
  },
  computed: {
    ...mapGetters(["signedIn", "getUser", 'getCategories']),
    cartItems() {
      return this.$store.getters.getCartItems;
    },
    totalPrice() {
      let price = 0;

      price = this.subTotoalPrice + this.tax - this.discount;

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
      return 0;
    },

    discount() {
      if (this.getUser && this.getUser.credit) {
        if (this.getUser.credit >= 5) {
          return 5;
        }
      }
      return 0;
    },
  },
  created() {
    this.FETCH_USER_ORDERS(this.getUser.uid).then((orders) => {
      if (orders.length === 0) this.newUserDiscount = true;
    });

    this.$gtag.screenview({
      app_name: "Just Go",
      screen_name: "Cart",
    });
    document.body.classList.add("modal-open");
     this.$gtag.screenview({
        app_name: 'Just Go',
        screen_name: 'Cart',
      })
  },
  beforeDestroy() {
    document.body.classList.remove("modal-open");
  },
};
</script>

<style lang="scss" scoped>
.main-cart {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  //   position: relative;
  .cart-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 50;
    height: 100%;
    border-radius: 0;
    overflow: hidden;
    transition: all 0.4s;
    background: #fff;
    box-shadow: 4px 4px 1rem rgba(0, 0, 0, 0.15);
    overflow-y: scroll;
    // top: 0;
    @media (min-width: 600px) {
      height: 95%;
      border-radius: 1rem 1rem 0 0;
    }

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
          flex-direction: column;
          width: 98%;
          border-radius: 0.625rem;
          box-sizing: border-box;
          padding: 0 0 1rem;
          margin-right: auto;
          margin-left: auto;
          display: flex;
          position: relative;
          align-items: center;
          @media (min-width: 600px) {
            width: 90%;
          }

          .cart-item {
            width: 95%;
            max-width: 22rem;
            min-height: 7rem;
            height: 7rem;
            border-radius: 0.625rem;
            box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
            border: thin solid #ececec;
            line-height: 1.5rem;
            letter-spacing: -0.02em;
            margin-top: 1rem;
            background-color: #fff;
            padding: 0.5rem 0;
            display: flex;
            position: relative;
            align-items: center;
            @media (min-width: 600px) {
              max-width: 26rem;
              height: 6.5rem;
              padding: 0;
            }

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
              width: 5.5rem;
              padding: 2% 3% 0;
              margin-left: 1.4rem;
              box-sizing: content-box !important;
              height: 95%;

              .cart-img {
                display: flex;
                justify-content: center;
                align-items: center;
                width: inherit;
                height: inherit;
              }
            }

            .item-details {
              width: 70%;

              .details-inner {
                overflow: scroll;
                width: calc(100% - 4rem);

                p {
                  margin: 0;

                  &.name {
                    font-weight: 700;
                    width: calc(100% + 4rem);
                  }

                  &.detail {
                    color: #8f8f8f;
                    width: calc(100% + 4rem);
                  }

                  &.price {
                  }
                }
              }
            }

            .item-quantity {
              position: absolute;
              right: 0;
              background: #fff;
              width: 4rem;
              min-height: 6rem;
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              align-items: center;
              box-shadow: -0.5rem 0 1rem #fff;
              -webkit-user-select: none;
              -ms-user-select: none;
              user-select: none;
              padding-right: 0.1rem;

              .cart-arrow {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 1.5rem;
                height: 1.5rem;
                cursor: pointer;

                svg {
                  fill: #333;
                }

                &.disabled {
                  pointer-events: none;
                  cursor: not-allowed;

                  svg {
                    filter: invert(1);
                    fill: #ddd;
                  }
                }
              }

              .item-quan {
                padding-right: 0.1rem;
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
          width: 90%;
          color: rgba(51, 51, 51, 0.47843137254901963);
          font-size: 0.75rem;
          margin-right: auto;
          margin-left: auto;
          max-width: 26rem;

          div {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            max-height: 1.5rem;

            &.cart-fee {
              margin-bottom: 0.75rem;

              p {
                font-size: 0.9rem;
                color: #888;
                font-weight: 500;
              }

              .delivery {
                font-weight: bold;
                color: #3ba535;
              }
            }

            &.cart-total {
              p {
                color: #333;
              }
            }
          }
        }

        .cart-buffer {
          height: 11.5rem;
        }

        .cart-error {
          position: absolute;
          background-color: #fff;
          bottom: 4.7rem;
          display: flex;
          width: 100%;
          justify-content: center;
          flex-direction: row;
          align-items: center;
          z-index: 1;
          box-shadow: 4px -5px 6px rgba(0, 0, 0, 0.17);
          line-height: 1.5rem;

          &.minimum {
            color: rgba(51, 51, 51, 0.48);
            text-align: center;
            background-color: #fff;
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }

        .button-container {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 5.5rem;
          z-index: 1;
          width: 100%;
          background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;

          .button-container-inner {
            position: absolute;
            bottom: 0;
            display: flex;
            width: 85%;
            max-width: 22rem;
            min-height: 2.5rem;
            line-height: 1.5rem;
            margin-bottom: 2.125rem;
            align-items: center;
            text-align: center;
            justify-content: center;

            &.multiple {
              justify-content: space-between;
            }

            .bottom-button {
              display: flex;
              flex-direction: row;
              // align-items: center;
              cursor: pointer;
              justify-content: center;
              height: 2.5rem;
              box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
              border-radius: 2.5rem;

              &.sm {
                width: 29%;
                background: #efefef;
                color: #000;
              }

              &.md {
                width: 68%;
                background: #333;
                background-color: #3ba535;
                color: #fff;
                font-weight: 600;
              }

              p {
                text-align: center;
                width: 100%;
                line-height: 2.5rem;
                font-weight: 600;
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
