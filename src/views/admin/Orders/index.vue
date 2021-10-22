<template>
  <div class="pending-orders">
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <h2 class="text-white text-center font-weight-bolder">Orders</h2>
    </base-header>
    <div class="container mt-4">
      <template v-if="!loading">
        <template v-if="orders.length">
          <b-tabs content-class="mt-3" fill>
            <b-tab title="Undelivered" active>
              <OrderList
                @showOrderDetails="showOrderDetails"
                :orders="undeliveredOrders"
              />
            </b-tab>
            <b-tab title="All Trips">
              <OrderList
                @showOrderDetails="showOrderDetails"
                :orders="deliveredOrders"
              />
            </b-tab>
            <b-tab title="Out for delivery"
              ><OrderList
                @showOrderDetails="showOrderDetails"
                :orders="onWayOrders"
            /></b-tab>
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
    <modal ref="order" :show="show" size="lg" @close="show = false">
      <OrderCard
        class="shadow-none"
        :order="detailedOrder"
        @changeStatus="changeStatus"
        @assigned="show=false"
      />
      <Map :mapPosition="detailedOrder.location" :mapAddress="detailedOrder.address"  />
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
    };
  },
  components: {
    OrderList,
    OrderCard,
    Map
  },
  methods: {
    ...mapActions(["FETCH_ORDERS", "CHANGE_STATUS"]),
    showOrderDetails(order) {

      this.detailedOrder = order;
      this.show = true;
    },
    changeStatus(data) {
      this.show = false;
      this.CHANGE_STATUS(data)
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
      orders: "getOrders",
    }),
    undeliveredOrders() {
      return this.orders.filter((item) => {
        return item.status !== "DELIVERED" && item.status !== "ONWAY";
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
  },

  created() {
    this.loading = true;

    this.FETCH_ORDERS().then((res) => {
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
