<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <template v-if="user.role === 'admin'">

          <div class="d-flex align-items-center pt-3">

            <label class="switch mx-2 mb-0" :class="{disabled: saving}">
              <input v-model="shop.status" @change="changeStatus" type="checkbox" value="true">
              <span class="slider round"></span>
            </label>
            <span class="text-white font-weight-bold">{{ shop.status ? 'Open' : 'Close' }}</span>
          </div>


          <sidebar-item
              :link="{
              name: 'Shop',
              path: '/admin/shop',
              icon: 'bi bi-shop',
            }"
          ></sidebar-item>
          <a
              aria-current="page"
              class="nav-link "
              href="https://analytics.google.com/analytics/web/#/report-home/a146820920w277293743p245731325"
              target="_blank"
          ><i class="bi bi-graph-up"></i
          ><span class="nav-link-text">Analytics</span></a
          >
          <sidebar-item
              :link="{
              name: 'Add Product',
              path: '/admin/products/add',
              icon: 'bi bi-plus-square-fill ',
            }"
          >
          </sidebar-item>
          <sidebar-item
              :link="{
              name: 'Categories',
              path: '/admin/categories',
              icon: 'bi bi-app',
            }"
          >
          </sidebar-item>

          <sidebar-item
              :link="{
              name: 'Sections',
              path: '/admin/sections',
              icon: 'bi bi-intersect',
            }"
          >
          </sidebar-item>

          <sidebar-item
              :link="{
              name: 'Products',
              path: '/admin/products',
              icon: 'bi bi-box ',
            }"
          >
          </sidebar-item>

          <sidebar-item
              :link="{
              name: 'SMS',
              path: '/admin/sms',
              icon: 'bi bi-chat-left-dots',
            }"
          >
          </sidebar-item>

          <sidebar-item
              :link="{
              name: 'All Orders',
              path: '/admin/orders',
              icon: 'bi bi-box-seam',
            }"
          >
          </sidebar-item>

          <sidebar-item
              :link="{
              name: 'Users',
              path: '/admin/users',
              icon: 'bi bi-person-fill ',
            }"
          >
          </sidebar-item>
          <sidebar-item
              :link="{
              name: 'Riders',
              path: '/admin/riders',
              icon: 'bi bi-bicycle ',
            }"
          >
          </sidebar-item>
          <sidebar-item
              :link="{
              name: 'Transactions',
              path: '/admin/transactions',
              icon: 'bi bi-bank',
            }"
          >
          </sidebar-item>
          <sidebar-item
              :link="{
              name: 'Delivery Time',
              path: '/admin/delivery-time',
              icon: 'bi bi-clock ',
            }"
          >
          </sidebar-item>
          <sidebar-item
              :link="{
              name: 'Pending Orders',
              path: '/admin/orders/pending',
              icon: 'ni ni-bullet-list-67 ',
            }"
          >
          </sidebar-item>

          <sidebar-item
              :link="{
              name: 'Confirmed Orders',
              path: '/admin/orders/confirmed',
              icon: 'ni ni-bullet-list-67 ',
            }"
          >
          </sidebar-item>
          <sidebar-item
              :link="{
              name: 'Packed Orders',
              path: '/admin/orders/packed',
              icon: 'ni ni-bullet-list-67 ',
            }"
          >
          </sidebar-item>
          <sidebar-item
              :link="{
              name: 'On Way to Delivery',
              path: '/admin/orders/onway',
              icon: 'ni ni-bullet-list-67 ',
            }"
          >
          </sidebar-item>

          <sidebar-item
              :link="{
              name: 'Delivered Orders',
              path: '/admin/orders/delivered',
              icon: 'ni ni-bullet-list-67 ',
            }"
          >
          </sidebar-item>
        </template>
        <template v-if="user.role === 'rider'">
          <sidebar-item
              :link="{
              name: 'My Orders',
              path: '/rider/orders',
              icon: 'bi bi-box-seam ',
            }"
          >
          </sidebar-item>
        </template>
      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar :type="$route.meta.navbarType"></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <fade-transition :duration="200" mode="out-in" origin="center top">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import DashboardNavbar from './DashboardNavbar.vue';
import ContentFooter from './ContentFooter.vue';
import DashboardContent from './Content.vue';
import {FadeTransition} from 'vue2-transitions';
import {mapActions, mapGetters} from 'vuex';

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    DashboardContent,
    FadeTransition,
  },
  data() {
    return {
      interval: undefined,
      saving: false,

    };
  },
  methods: {
    ...mapActions(['FETCH_ORDERS', 'FETCH_RIDER_ORDERS', 'UPDATE_SHOP', 'FETCH_SHOP']),
    initScrollbar() {
      let isWindows = navigator.platform.startsWith('Win');
      if (isWindows) {
        initScrollbar('sidenav');
      }
    },
    showToast(headline, msg, variant) {
      this.$bvToast.toast(msg, {
        title: headline,
        autoHideDelay: 5000,
        appendToast: true,
        variant: variant,
        toaster: 'b-toaster-top-right',
        solid: true,
      });
    },
    changeStatus() {
      this.saving = true;

      this.UPDATE_SHOP(this.shop).then(res => {
        this.showToast('Success', res, 'success');
        this.saving = false;
      }).catch(err => {
        this.showToast('Error', err, 'danger');
        this.saving = false;

      });
    },
  },
  mounted() {
    this.initScrollbar();
  },
  created() {
    this.interval = setInterval(() => {
      if (this.user.role === 'admin') this.FETCH_ORDERS();
      if (this.user.role === 'rider') {
        this.loading = true;
        var days = 6; // Days you want to subtract
        var date = new Date();
        var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
        last.setHours(0)
        last.setMinutes(0)
        last.setSeconds(0)
        this.FETCH_RIDER_ORDERS({uid: this.user.uid, from: last});
      }
    }, 10000);

    this.FETCH_SHOP().then(shop => {
    }).catch(err => {
      this.showToast('Error', err, 'danger');
    });
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.interval);
    next();
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      shop: 'getShop',
    }),
  },
};
</script>
<style lang="scss" scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 56px;
  height: 32px;
}

.switch.disabled {
  pointer-events: none;

  .slider:before {
   background-color: #c7c7c7;
  }
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: hsl(0, 0%, 60%);
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #23a534;
}

input:focus + .slider {
  box-shadow: 0 0 1px #23a534;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 40px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
