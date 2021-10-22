<template>
  <base-dialog
    title="My Orders"
    :visible="dialogVisible"
    @dialogToggle="dialogToggle"
  >
    <order-list
      :loading="loading"
      :showOrders="showOrders"
      :orders="orders"
      @reorder="reorder"
    ></order-list>
  </base-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BaseDialog from "@/components/BaseDialog";
import OrderList from "./OrderList";

export default {
  name: "order-dialog",
  components: {
    BaseDialog,
    OrderList
  },
  props: {
    dialogVisible: Boolean
  },
  data() {
    return {
      loading: false,
      interval: undefined,
      showOrders: false,
      visible: false
    };
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
  watch: {
    dialogVisible(val) {
      if (val) {
        this.loading = true;
        this.showOrders = false;
        this.FETCH_USER_ORDERS(this.user.uid).then((res) => {
          this.loading = false;
          setTimeout(() => {
            this.showOrders = true;
          }, 200);
        });
        // this.interval = setInterval(() => {
        //   this.FETCH_USER_ORDERS(this.user.uid);
        // }, 10000);

        this.$gtag.pageview(this.$route);
      }
    }
  },
  methods: {
    ...mapActions(["FETCH_USER_ORDERS"]),
    reorder(order) {
      order.products.forEach(product=>{
        this.$store.commit("updateCartItems", product);
      })
        this.$router.push("/orders?cart=true");

    },
    hideCartModal() {
      this.$router.push("/orders");
    },
    dialogToggle(val) {
      this.$emit('dialogToggle', val);
    }
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.interval);
    next();
  }
}
</script>

<style lang="scss" scoped>

</style>