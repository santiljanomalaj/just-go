<template>
  <div class="order-page">
    <router-link class="ico-back" to="/orders">
      <i class="bi bi-chevron-left"></i>
    </router-link>
    <div v-if="loading" class="loader">
      <b-icon
          animation="spin"
          class="spin-icon"
          font-scale="2.2"
          icon="arrow-clockwise"
      ></b-icon>
    </div>

    <div v-else class="pb-6">

      <div class="order-map ">
        <Map :mapAddress="order.address" :mapPosition="order.location" :userView="true"/>
      </div>

      <b-container>
        <b-row>
          <b-col cols="12">
            <div class="order-status-container mx-auto">
              <ul class="order-status-progress-bar">
                <div :class="{active: completed.includes('CONFIRMED')}" class="order-status-progress-step "
                     title="Order Confirmed">
                  <svg fill="none" height="15" viewBox="0 0 44 24" width="30" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.117 21.298H7.58778C6.85862 21.298 6.2434 21.8884 6.2434 22.6377C6.2434 23.3642 6.83584 23.9773 7.58778 23.9773H10.0943C10.9601 24 11.3931 23.3188 11.3931 22.6377C11.3931 21.9565 10.9601 21.298 10.117 21.298ZM18.0694 18.6187H11.5981C11.6209 18.6187 11.6437 18.6187 11.6665 18.6187H18.1378C18.115 18.6187 18.0922 18.6187 18.0694 18.6187ZM6.33454 15.9622C5.60539 15.9622 4.99016 16.5525 4.99016 17.3018C4.99016 18.0284 5.5826 18.6414 6.33454 18.6414C7.0637 18.6414 7.67892 18.0511 7.67892 17.3018C7.67892 16.5525 7.0637 15.9622 6.33454 15.9622ZM3.85085 10.649H1.34438C0.615225 10.649 0 11.2394 0 11.9886C0 12.7152 0.592439 13.3283 1.34438 13.3283H3.85085C4.71673 13.351 5.14966 12.6698 5.14966 11.9886C5.12688 11.3075 4.71673 10.649 3.85085 10.649ZM7.99793 5.31315C7.26877 5.31315 6.65355 5.9035 6.65355 6.65279C6.65355 7.37938 7.24599 7.99243 7.99793 7.99243C8.72708 7.99243 9.34231 7.40208 9.34231 6.65279C9.31952 5.92621 8.72708 5.31315 7.99793 5.31315ZM12.8058 0C12.0766 0 11.4614 0.59035 11.4614 1.33964C11.4614 2.06623 12.0539 2.65658 12.8058 2.65658C13.535 2.65658 14.1502 2.06623 14.1502 1.33964C14.1502 0.59035 13.5577 0 12.8058 0Z"
                        fill="#fff"></path>
                    <path
                        d="M32.1512 0H31.7638C33.5867 0 35.3184 0.363292 36.8451 0.999054C35.4779 0.363292 33.9057 0 32.1512 0Z"
                        fill="#fff"></path>
                    <path
                        d="M36.8224 0.999054C35.2957 0.363292 33.5868 0 31.7411 0H18.2061C17.4998 0 16.8845 0.499527 16.8162 1.20341C16.7478 1.99811 17.363 2.65658 18.1378 2.65658H18.6619C20.348 2.65658 20.348 5.31315 18.6619 5.31315H13.4438C12.7375 5.31315 12.1222 5.81268 12.0539 6.51656C11.9855 7.31126 12.6007 7.96973 13.3755 7.96973H16.4516C18.1606 7.96973 18.1606 10.6263 16.4516 10.6263H9.2284C8.52203 10.6263 7.9068 11.1258 7.83845 11.8297C7.77009 12.6244 8.38531 13.2829 9.16004 13.2829H12.7147C14.4008 13.2829 14.4236 15.9395 12.7147 15.9395H11.6665C10.9374 15.9395 10.3221 16.5298 10.3221 17.2791C10.3221 17.983 10.8918 18.5733 11.5982 18.596H18.0466C18.0694 18.596 18.0922 18.596 18.115 18.596C19.7328 18.6641 19.71 21.2526 18.0466 21.2526H15.3579C14.5831 21.2526 13.9679 21.9111 14.0363 22.7058C14.1046 23.4097 14.7199 23.9092 15.4262 23.9092H28.7789C29.189 23.9092 31.1714 23.9546 31.7411 23.9546C38.7136 23.9546 44 18.8004 44 11.9432C44 6.94797 41.129 2.83822 36.8224 0.999054ZM26.9788 11.9886C26.9788 9.21854 29.0067 7.22044 31.7639 7.22044C34.521 7.22044 36.549 9.21854 36.549 11.9886C36.549 14.8042 34.521 16.7569 31.7639 16.7569C28.984 16.7569 26.9788 14.8042 26.9788 11.9886Z"
                        fill="#fff"></path>
                  </svg>
                </div>

                <div :class="{active: completed.includes('PACKED')}" class="order-status-progress-step-divider ">
                </div>
                <div :class="{active: completed.includes('PACKED')}" class="order-status-progress-step "
                     title="Order Packed">
                  <i class="bi bi-bag-check"></i>
                </div>
                <div :class="{active: completed.includes('ONWAY')}" class="order-status-progress-step-divider ">
                </div>
                <div :class="{active: completed.includes('ONWAY')}" class="order-status-progress-step "
                     title="Out for delivery">
                  <i class="bi bi-bicycle"></i>
                </div>
                <div :class="{active: completed.includes('DELIVERED')}" class="order-status-progress-step-divider  "
                     title="Order Completed">
                </div>
                <div :class="{active: completed.includes('DELIVERED')}" class="order-status-progress-step ">
                  <i class="bi bi-house-door"></i>
                </div>
              </ul>
            </div>
            <div class="info d-flex justify-content-between">
              <div>
                <h3>{{ orderMsg }}</h3>
                <h6>{{ orderTime }}</h6>
              </div>
              <div>
                <h3 class="text-right">Delivery Address</h3>
                <h6 class="text-right">{{ order.address }}</h6>
              </div>
            </div>
            <div class="details">
              <h2>Details</h2>
              <div class="order">
                <div>
                  <i class="bi bi-basket3"></i>
                  <span>{{ order.products.length }} Items</span>
                </div>
                <div>
                  <i class="bi bi-cash"></i>
                  <span>{{ formatPrice(order.total) }}</span>
                </div>
                <div class="receipt" @click="showReceipt=true">
                  <i class="bi bi-receipt"></i>
                  <span>View Receipt</span>
                </div>
              </div>
              <div class="products">
                <div v-for="prod in order.products" :key="prod.id" class="product">
                  <div class="product-img">
                    <img
                        :src="prod.img"
                        alt="">
                  </div>
                  <div>
                    <h4>{{ prod.title }}</h4>
                    <h5>{{ formatPrice(prod.price) }} | {{ prod.quantity }} Items</h5>
                  </div>

                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <transition name="slide-fade-complete">

    <Receipt v-if="showReceipt" :order="order" @close-me="showReceipt=false" />
    </transition>
    <BottomNav :nav-links="navLinks"/>
  </div>
</template>

<script>
import { navLinks } from '../../data/Navlinks'
import BottomNav from '../../components/Products/BottomNav.vue'
import Map from '@/components/shared/Map'
import { mapActions, mapGetters } from 'vuex'
import Receipt from '../../components/Orders/Receipt'

export default {
  name: 'RecentOrderDetails',
  components: {
    BottomNav,
    Map,
    Receipt,
  },
  data () {
    return {
      loading: false,
      navLinks,
      showReceipt: false
    }
  },
  methods: {
    ...mapActions(['FETCH_USER_ORDERS']),
    formatTime (time) {
      return new Date(time).toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        day: '2-digit',
        month: 'short',
        year: '2-digit',
      })
    },

  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      orders: 'getUserOrders',
    }),
    order () {
      return this.orders.find(order => order._id === this.$route.params.orderId)
    },
    orderMsg () {
      if (this.order.status === 'PENDING') return 'Your order has been placed!'
      else if (this.order.status === 'CONFIRMED') return 'Your order has been confirmed!'
      else if (this.order.status === 'PACKED') return 'Your order has been packed!'
      else if (this.order.status === 'ONWAY') return 'Your order is on way to deliver!'
      else if (this.order.status === 'DELIVERED') return 'Your order has been delivered!'
    },
    orderTime () {
      if (this.order.status === 'DELIVERED') return 'We dropped it off at ' + this.formatTime(this.order.deliveredAt)
      else return 'You placed order at ' + this.formatTime(this.order.orderedAt)
    },
    completed () {
      if (this.order.status === 'PENDING') return ['PENDING']
      else if (this.order.status === 'CONFIRMED') return ['PENDING', 'CONFIRMED']
      else if (this.order.status === 'PACKED') return ['PENDING', 'CONFIRMED', 'PACKED']
      else if (this.order.status === 'ONWAY') return ['PENDING', 'CONFIRMED', 'PACKED', 'ONWAY']
      else if (this.order.status === 'DELIVERED') return ['PENDING', 'CONFIRMED', 'PACKED', 'ONWAY', 'DELIVERED']
    },
  },
  created () {
    if (!this.orders.length) {
      this.loading = true
      this.FETCH_USER_ORDERS(this.user.uid).then((res) => {
        this.loading = false
      })
    }
    this.interval = setInterval(() => {
      this.FETCH_USER_ORDERS(this.user.uid);
    }, 10000);
    this.$gtag.pageview(this.$route);

  },

}
</script>

<style lang="scss" scoped>
.ico-back{
  background:#1e852b;
  height: 45px;
  width: 45px;
  border-radius: 12px;
  position: fixed;
  top: 24px;
  left: 24px;
  z-index: 1;
  font-size: 26px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 2px;
  cursor: pointer;
}
.loader {
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.info {
  margin-top: 44px;

  h3 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 0;
  }

  h6 {
    font-size: 16px;
    font-weight: 600;
    color: #737373;
  }
}

.order-status-container {
  padding: 1rem;
  max-width: 768px;
  border-radius: 8px;
  background-color: #fff;
  margin-top: -100px;

  .order-status-progress-bar {
    display: flex;
    padding: 0;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0;

    .order-status-progress-step {
      height: 2.4rem;
      width: 2.4rem;
      background: #d3d3d3;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      position: relative;
      transition: all .3s;
      transition-delay: .3s;
      color: #fff;

      &.active {
        background: #23a534;
      }
    }

    .order-status-progress-step-divider {
      height: 3px;
      flex-grow: 1;
      background: #d3d3d3;

      &.active {

        background: #23a534;
      }

    }
  }
}

.details {
  h2 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 0;
  }

  .order {
    display: flex;
    column-gap: 16px;

    & > div {
      display: flex;
      align-items: center;
      column-gap: 10px;
      font-size: 18px;
      &.receipt{
        cursor: pointer;
      }
      span {
        font-size: 18px;
        font-weight: 500;
      }
    }
  }

  .products {
    margin-top: 20px;

    .product {
      display: flex;
      align-items: center;
      column-gap: 12px;
      width: 100%;
      padding-block: 10px;
      border-bottom: 1px solid #eee;

      &:first-child {
        border-top: 1px solid #eee;

      }

      .product-img {
        max-height: 70px;
        max-width: 70px;
        overflow: hidden;
        img {
          height: 100%;
          width: 100%;
          object-fit: contain
        }
      }

      h4 {
        margin-bottom: 6px;
      }

      h5 {
        color: #737373;
      }
    }
  }
}

@media (max-width: 768px) {
  .order-status-container {
    padding: .5rem;
    margin-top: -75px;
  }
  .info {
    h3 {
      font-size: 18px;
    }

    h6 {
      font-size: 15px;
    }
  }
  .details {
    h2 {
      font-size: 18px;
    }

    .order, .order span {
      font-size: 14px !important;
    }

    .products {
      .product {
        .product-img {
          max-width: 50px;
          max-height: 50px;
        }

        h4 {
          font-size: 18px;
        }

        h5 {
          font-size: 15px;
        }
      }
    }
  }
}
</style>
