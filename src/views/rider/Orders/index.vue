<template>
  <div class="pending-orders">
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <h2 class="text-white text-center font-weight-bolder">Orders</h2>
      <h4 class="text-white text-center font-weight-bolder" v-if="pendingTips">Pending Tips: {{formatPrice(pendingTips)}}</h4>

    </base-header>
    <div class="container mt-4">
      <template v-if="!loading">
        <template v-if="orders.length">
          <b-tabs content-class="mt-3" fill>
            <b-tab active>
              <template #title>
                Current Orders
                <b-badge variant="primary">{{
                  undeliveredOrders.length
                }}</b-badge>
              </template>
              <OrderList
                @showOrderDetails="showOrderDetails"
                :orders="undeliveredOrders"
              />
            </b-tab>
            <b-tab >
               <template #title>
                Orders by Week
                <b-badge variant="primary">{{
                  deliveredOrders.length
                }}</b-badge>
              </template>
              <h3 class="text-center">{{formatTime(dates.from)}}-{{formatTime(dates.to)}}</h3>
              <OrderList
                @showOrderDetails="showOrderDetails"
                :orders="deliveredOrders"
              />
            </b-tab>

          </b-tabs>
        </template>
        <h3 class="text-center h-100vh" v-else>No order!</h3>
      </template>
      <div v-else class="loader">
        <b-icon
          animation="spin"
          class="spin-icon"
          font-scale="2.2"
          icon="arrow-clockwise"
        ></b-icon>
      </div>
    </div>
    <modal bodyClasses="p-2 p-sm-4" ref="order" :show="show"  size="lg" @close="show = false">
      <span class="float-right btn" @click="show=false"><i class="bi bi-x-lg"></i></span>
      <OrderCard
        class="shadow-none"
        :order="detailedOrder"
        @changeStatus="changeStatus"
        @assigned="show = false"
      />
      <Map
        :mapPosition="detailedOrder.location"
        :mapAddress="detailedOrder.address"
      />
      <div slot="footer"></div>
    </modal>
  </div>
</template>

<script>
import Map from "@/components/shared/Map";

import { mapActions, mapGetters } from "vuex";
import OrderList from "./OrderList";
import OrderCard from "./OrderCard.vue";
export default {
  name: "Pending",
  data() {
    return {
      loading: false,
      detailedOrder: {},
      show: false,
      position: {
        lat: 33.6586872,
        lng: 72.8580556,
      },
      dates: {
        to: '',
        from: '',
      }
    };
  },
  components: {
    OrderList,
    OrderCard,
    Map,
  },
  methods: {
    ...mapActions(["FETCH_RIDER_ORDERS", "CHANGE_STATUS_RIDER"]),
    showOrderDetails(order) {
      this.detailedOrder = order;
      this.show = true;
    },
    formatTime(time) {
      return new Date(time).toLocaleString("en-US", {
        weekday: "long",
        month: "short",
        day: "2-digit",
      });
    },
    changeStatus(data) {
      this.show = false;
      this.CHANGE_STATUS_RIDER(data)
        .then((res) => {
          this.showToast("Success", res, "success");
        })
        .catch((err) => {
          this.showToast("Error", err, "danger");
        });
    },

    showToast(headline, msg, variant) {
      this.$bvToast.toast(msg, {
        title: headline,
        autoHideDelay: 5000,
        appendToast: true,
        variant: variant,
        toaster: "b-toaster-top-right",
        solid: true,
      });
    },
  },

  computed: {
    ...mapGetters({
      orders: "getRiderOrders",
      user: "getUser",
    }),
    undeliveredOrders() {
      return this.orders.filter((item) => {
        return item.status !== "DELIVERED";
      });
    },
    deliveredOrders() {
      return this.orders.filter((item) => {
        return item.status === "DELIVERED";
      });
    },
    onWayOrders() {
      return this.orders.filter((item) => {
        return item.status === "ONWAY";
      });
    },
    pendingTips() {
      if (!this.deliveredOrders) return 0
      let sum =0
      this.deliveredOrders.forEach((item) =>{
        sum+=item.tip
      })
      return sum
    }
  },

  created() {
    this.loading = true;
    var days = 6; // Days you want to subtract
    var date = new Date();
    var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
    last.setHours(0)
    last.setMinutes(0)
    last.setSeconds(0)
    this.dates = {
      to: date,
      from: last
    }
    this.FETCH_RIDER_ORDERS({uid: this.user.uid, from: last}).then((res) => {
      this.loading = false;
    });
  },
  watch: {
    orders(newVal, oldVal) {
      if (oldVal.length !== newVal.length) {
      }
    },
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
</style>
