<template>
  <div>
    <base-header class="pb-7 pt-7 p bg-gradient-success">
      <!-- Card stats -->
      <h2 class="text-white text-center font-weight-bolder">Transactions</h2>
    </base-header>
    <b-container fluid>
      <b-row class="pt-4">
        <b-col cols="12">
          <light-table
            :orders="orders"
            :loading="loading"
            @showDetails="showDetails"
          />
        </b-col>
      </b-row>
    </b-container>
    <modal ref="transaction-modal" :show="detailModal" size="lg">
      <div class="transaction-modal">
        <h2>Amount: {{ transactionDetails.amount }}</h2>
        <h2>Status: {{ transactionDetails.status }}</h2>
        <h2 v-if="transactionDetails.creditCard">
          Card Type: {{ transactionDetails.creditCard.cardType }}
        </h2>
        <h2 v-if="transactionDetails.creditCard">
          Masked Number: {{ transactionDetails.creditCard.maskedNumber }}
        </h2>
    
      </div>
    </modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LightTable from "./Table/LightTable";

export default {
  name: "Users",
  data() {
    return {
      users: [],
      roles: [],
      loading: false,
      detailModal: false,
      transactionDetails: {},
    };
  },
  components: {
    LightTable,
  },
  methods: {
    ...mapActions(["FETCH_ORDERS", "FETCH_TRANSECTION"]),
    showDetails(id) {
      this.loading = true;
      this.FETCH_TRANSECTION(id)
        .then((res) => {
          this.transactionDetails = res;
          this.loading = false;
          this.detailModal = true;
          this.$refs["transaction-modal"].$refs["app-modal"].$once(
            "hide",
            (bvEvt) => {
              this.detailModal = false;
            }
          );
        })
        .catch((err) => {
          this.loading = false;
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
  },
  created() {
    this.loading = true;

    this.FETCH_ORDERS().then((res) => {
      this.loading = false;
    });
  },
};
</script>

<style lang="scss" scoped>
.transaction-modal{
  h2{
    color: #0a0a0a;
    font-size: 22px;
  }
}
</style>
