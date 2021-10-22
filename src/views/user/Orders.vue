<template>
  <div class="order-page">
    <div class="navbar">
      <h1>Orders</h1>
    </div>
    <div v-if="loading" class="loader">
      <b-icon
        animation="spin"
        class="spin-icon"
        font-scale="2.2"
        icon="arrow-clockwise"
      ></b-icon>
    </div>

    <b-container v-else fluid>
      <div class="orders-container px-lg-8">
        <template v-if="orders.length">
          <transition-group name="list-slide-in" tag="div">
            <div
              class="single-order"
              v-if="showOrders"
              v-for="order in orders"
              :key="order._id"
              @click="$router.push('/orders/' + order._id)"
            >
              <!-- Top Header -->
              <div class="reorder-info">
                <div class="info">
                  <h2>{{ formatTime(order.createdAt) }}</h2>

                  <div class="info-container">
                    <div class="order-detail">
                      <p class="font-italic">#{{ order._id.substr(18) }}</p>
                    </div>
                    <div class="order-detail">
                      <svg
                        fill="none"
                        height="15"
                        viewBox="0 0 13 15"
                        width="13"
                      >
                        <path
                          d="M2.99711 4.19122H2.58563C2.50542 4.19122 2.42536 4.19813 2.34633 4.21187C1.58641 4.34404 1.0775 5.06721 1.20966 5.82714L2.00824 10.419L1.40959 12.0653C1.35396 12.2183 1.3255 12.3798 1.3255 12.5426C1.3255 13.3139 1.95079 13.9392 2.72212 13.9392H10.6169C10.7797 13.9392 10.9412 13.9107 11.0942 13.8551C11.8191 13.5915 12.1931 12.7902 11.9295 12.0653L11.3308 10.419L12.1294 5.82714C12.1431 5.74812 12.15 5.66805 12.15 5.58784C12.15 4.81651 11.5248 4.19122 10.7534 4.19122H10.3419C10.3039 3.61186 10.1635 3.07969 9.91156 2.60862C9.61048 2.04566 9.16374 1.59891 8.60078 1.29784C8.0413 0.998626 7.39561 0.856763 6.68706 0.856763H6.65199C5.94344 0.856763 5.29776 0.998626 4.73828 1.29784C4.17532 1.59891 3.72857 2.04566 3.4275 2.60862C3.17557 3.07969 3.03519 3.61186 2.99711 4.19122ZM5.933 3.56556C6.03114 3.51308 6.17275 3.45947 6.52925 3.45947H6.8098C7.16631 3.45947 7.30792 3.51308 7.40605 3.56556C7.51069 3.62152 7.58788 3.69871 7.64384 3.80334C7.68462 3.87959 7.72607 3.98208 7.74254 4.19122H5.59652C5.61298 3.98208 5.65444 3.87959 5.69522 3.80334C5.75118 3.69871 5.82836 3.62152 5.933 3.56556Z"
                          stroke="#969696"
                          stroke-linejoin="round"
                          stroke-width="1.65"
                        ></path>
                      </svg>
                      <p class="order-detail-text">
                        {{ order.products.length }} items
                      </p>
                    </div>
                    <div class="order-detail">
                      <svg
                        class="price-icon"
                        fill="none"
                        height="19"
                        viewBox="0 0 19 19"
                        width="19"
                      >
                        <path
                          clip-rule="evenodd"
                          d="M5.23579 2.53485H13.602C14.9486 2.53485 15.4369 2.67506 15.9292 2.93834C16.4215 3.20162 16.8079 3.58798 17.0712 4.08028C17.3344 4.57257 17.4747 5.06088 17.4747 6.40748V12.7598C17.4747 14.1064 17.3344 14.5947 17.0712 15.087C16.8079 15.5793 16.4215 15.9656 15.9292 16.2289C15.4369 16.4922 14.9486 16.6324 13.602 16.6324H5.23579C3.88919 16.6324 3.40088 16.4922 2.90858 16.2289C2.41629 15.9656 2.02993 15.5793 1.76665 15.087C1.50337 14.5947 1.36316 14.1064 1.36316 12.7598V6.40748C1.36316 5.06088 1.50337 4.57257 1.76665 4.08028C2.02993 3.58798 2.41629 3.20162 2.90858 2.93834C3.40088 2.67506 3.88919 2.53485 5.23579 2.53485ZM4.42266 4.0453C3.88402 4.0453 3.6887 4.10139 3.49178 4.2067C3.29486 4.31201 3.14032 4.46656 3.03501 4.66347C2.92969 4.86039 2.87361 5.05572 2.87361 5.59435V13.0566C2.87361 13.7747 2.94839 14.0352 3.08881 14.2977C3.22922 14.5603 3.43528 14.7663 3.69784 14.9068C3.9604 15.0472 4.22083 15.122 4.93901 15.122H13.8988C14.617 15.122 14.8774 15.0472 15.14 14.9068C15.4025 14.7663 15.6086 14.5603 15.749 14.2977C15.8894 14.0352 15.9642 13.7747 15.9642 13.0566V5.59435C15.9642 5.05572 15.9081 4.86039 15.8028 4.66347C15.6975 4.46656 15.5429 4.31201 15.346 4.2067C15.1491 4.10139 14.9538 4.0453 14.4151 4.0453H4.42266Z"
                          fill-rule="evenodd"
                          stroke-width="0.2"
                        ></path>
                        <path
                          d="M9.0038 13.5209C8.94852 13.5209 8.89877 13.5002 8.85454 13.4587C8.81585 13.4172 8.7965 13.3639 8.7965 13.2987V12.6853C8.38743 12.632 8.03641 12.5194 7.74343 12.3476C7.45598 12.1757 7.23763 11.9683 7.08837 11.7253C6.94465 11.4765 6.86726 11.2128 6.8562 10.9342C6.8562 10.8868 6.87278 10.8453 6.90595 10.8098C6.94465 10.7683 6.98887 10.7476 7.03862 10.7476H8.0834C8.14973 10.7476 8.20225 10.7624 8.24094 10.792C8.28517 10.8157 8.32939 10.8542 8.37361 10.9076C8.44548 11.0616 8.5588 11.1891 8.71358 11.2898C8.87389 11.3905 9.08948 11.4409 9.36035 11.4409C9.67544 11.4409 9.9159 11.3876 10.0817 11.2809C10.2476 11.1742 10.3305 11.0291 10.3305 10.8453C10.3305 10.715 10.2863 10.6083 10.1978 10.5253C10.1149 10.4424 9.98224 10.3683 9.79982 10.3031C9.61739 10.2379 9.34653 10.1639 8.98721 10.0809C8.31833 9.93868 7.82082 9.72239 7.49468 9.43202C7.16853 9.14165 7.00545 8.72979 7.00545 8.19646C7.00545 7.72239 7.16576 7.31942 7.48638 6.98757C7.807 6.64979 8.24371 6.44239 8.7965 6.36535V5.74313C8.7965 5.67794 8.81585 5.62461 8.85454 5.58313C8.89877 5.54165 8.94852 5.5209 9.0038 5.5209H9.69202C9.75283 5.5209 9.80258 5.54165 9.84128 5.58313C9.87997 5.62461 9.89932 5.67794 9.89932 5.74313V6.38313C10.2642 6.44831 10.5765 6.57276 10.8363 6.75646C11.1016 6.93424 11.3034 7.13868 11.4416 7.36979C11.5798 7.6009 11.6544 7.82905 11.6655 8.05424C11.6655 8.10164 11.6489 8.14609 11.6157 8.18757C11.5826 8.22313 11.5411 8.2409 11.4914 8.2409H10.3968C10.3305 8.2409 10.2752 8.22905 10.231 8.20535C10.1923 8.18165 10.1564 8.14313 10.1232 8.08979C10.09 7.9535 9.99882 7.83794 9.84957 7.74313C9.70584 7.64831 9.52618 7.6009 9.3106 7.6009C9.06184 7.6009 8.87113 7.64831 8.73846 7.74313C8.60579 7.83794 8.53945 7.9772 8.53945 8.16091C8.53945 8.28535 8.57538 8.38905 8.64725 8.47201C8.72464 8.55498 8.84625 8.63201 9.01209 8.70313C9.18345 8.76831 9.42668 8.83646 9.74177 8.90757C10.2559 9.00831 10.6649 9.13572 10.969 9.28979C11.273 9.43794 11.4969 9.63053 11.6406 9.86757C11.7843 10.1046 11.8562 10.4068 11.8562 10.7742C11.8562 11.2957 11.6793 11.7224 11.3255 12.0542C10.9717 12.3861 10.4963 12.5935 9.89932 12.6765V13.2987C9.89932 13.3639 9.87997 13.4172 9.84128 13.4587C9.80258 13.5002 9.75283 13.5209 9.69202 13.5209H9.0038Z"
                          stroke-width="0.3"
                        ></path>
                      </svg>
                      <p class="order-detail-text">
                        {{ formatPrice(order.total) }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="re-order">
                  <p class="re-order-text" v-if="order.status !== 'DELIVERED'">
                    {{ order.status }}
                  </p>
                  <p class="re-order-text" @click.stop="reorder(order)" v-else>
                    Reorder
                  </p>
                </div>
              </div>
              <!-- Orders Products -->
              <div class="order-products">
                <div
                  class="order-single-product"
                  v-for="prod in order.products"
                  :key="prod.id"
                >
                  <div class="product-details">
                    <img alt="" :src="prod.img" />
                    <div class="quantity-container">{{ prod.quantity }}</div>
                  </div>
                  <p class="product-name">{{ prod.title }}</p>
                </div>
              </div>
            </div>
          </transition-group>
        </template>
        <div class="nothing-found" v-else>
          <img src="@/assets/images/empty-cart.gif" alt="" />
          <h3>No order placed yet!</h3>
        </div>
      </div>
    </b-container>
    <transition name="slide-fade-complete">
      <Cart v-if="showCart" @toggleCartModal="hideCartModal" />
    </transition>
    <BottomNav :hideCart="true" :nav-links="navLinks" />
  </div>
</template>

<script>
import { navLinks } from "../../data/Navlinks";
import BottomNav from "../../components/Products/BottomNav.vue";
import { mapGetters, mapActions } from "vuex";
import Cart from "../../components/shared/Cart.vue";

export default {
  name: "RecentOrders",
  components: {
    BottomNav,
    Cart,
  },
  data() {
    return {
      navLinks,
      loading: false,
      interval: undefined,
      showOrders: false,
    };
  },
  methods: {
    ...mapActions(["FETCH_USER_ORDERS"]),
    formatTime(time) {
      return new Date(time).toLocaleString("en-US", {
        weekday: "long",
        month: "short",
        day: "2-digit",
      });
    },
    reorder(order) {
      order.products.forEach(product=>{
        this.$store.commit("updateCartItems", product);
      })
        this.$router.push("/orders?cart=true");

    },
    hideCartModal() {
      this.$router.push("/orders");
    },
  },
  computed: {
    ...mapGetters({
      user: "getUser",
      orders: "getUserOrders",
    }),
    showCart() {
      return this.$route.query.cart;
    },
  },
  created() {
    this.loading = true;
    this.showOrders = false;
    this.FETCH_USER_ORDERS(this.user.uid).then((res) => {
      this.loading = false;
      setTimeout(() => {
        this.showOrders = true;
      }, 200);
    });
    this.interval = setInterval(() => {
      this.FETCH_USER_ORDERS(this.user.uid);
    }, 10000);

    this.$gtag.pageview(this.$route);
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.interval);
    next();
  },
};
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
  padding-bottom: 120px;
  .navbar {
    position: fixed;
    top: 0;
    width: 100%;
    height: 90px;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
    margin-bottom: 2rem;
    background: linear-gradient(to right, #45dd1f, #38bb10, #23a534);
    //   background: linear-gradient(
    //     285deg,
    //     #23a534,
    //     #a0e630 25%,
    //     #23a534 50%,
    //     #a0e630 75%,
    //     #23a534
    //   );
    h1 {
      color: #fff;
      text-align: center;
      color: #fcfcfc;
      margin: 0;
      font-size: 2rem;
    }
  }

  .orders-container {
    display: flex;
    flex-direction: column;
    // max-width: 70rem;
    // padding: 0 10px;
    margin: 0 auto;
    margin-top: calc(90px + 2rem);
    width: 100%;

    .single-order {
      border: 1px solid #ececec;
      box-shadow: 0px 2px 6px #00000017;
      border-radius: 8px;
      padding: 2rem 2rem;
      flex: 1 1;
      margin: 1rem;
      cursor: pointer;
      .reorder-info {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        @media (max-width: 500px) {
          flex-direction: column;
          margin-bottom: 30px;
          align-items: center;
        }

        .info-container {
          margin-top: 0;
          color: #969696;
          display: flex;
          margin-bottom: 2rem;
          @media (max-width: 500px) {
            margin-bottom: 20px;
          }

          .order-detail {
            display: flex;
            align-items: center;
            margin-right: 1rem;

            svg {
              color: #969696;
              height: 1rem;
              width: 1rem;
              margin-right: 0.5rem;

              &.price-icon {
                height: 1.3rem;
                width: 1.3rem;
                fill: #969696;
              }
            }

            p {
              color: #969696;
              font-weight: 600;
              margin: 0;
            }
          }
        }

        .info {
          h2 {
            font-size: 1rem;
            margin: 0 0 0.5rem;
            font-weight: 700;
            color: #0a0a0a;
          }
        }

        .re-order {
          padding: 0.3rem 1rem;
          background-color: #23a534;
          border-radius: 32px;
          cursor: pointer;
          transition: 0.3s;

          p {
            color: #fff;
            margin: 0;
            font-weight: 600;
          }

          // &:hover {
          //   background-color: transparent;
          //   border: 1px solid #23a534;

          //   p {
          //     color: #000;
          //   }
          // }
        }
      }

      .order-products {
        .order-single-product {
          display: flex;
          margin-bottom: 2rem;
          align-items: center;
          p {
            font-weight: 600;
            color: #0a0a0a;
            margin-bottom: 0;
          }
          .product-details {
            position: relative;
            height: 60px;
            width: 60px;
            display: flex;
            justify-content: center;
            margin-right: 0.75rem;

            img {
              height: 100%;
              width: 100%;
              max-height: 60px;
              max-width: 60px;
            }

            .quantity-container {
              height: 1.2rem;
              width: 1.2rem;
              display: flex;
              justify-content: center;
              align-items: center;
              position: absolute;
              bottom: 0;
              left: 0;
              background: #333;
              border-radius: 50%;
              color: #fff;
              transform: translate(-50%, 50%);
            }
          }
        }
      }
    }
  }
}
@media (max-width: 500px) {
  .order-page .orders-container .single-order .reorder-info {
    margin-bottom: 1rem;
    .info h2 {
      text-align: center;
    }
  }
  .order-page .orders-container .single-order {
    margin: 1rem 0;
    padding: 1rem;
  }
  .order-page .orders-container .single-order .reorder-info .re-order {
    .re-order-text {
      font-size: 0.8rem;
    }
  }
}
</style>
