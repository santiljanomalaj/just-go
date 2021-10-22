<template>
  <div class="order-list-item" >
    <b-row v-if="order.status !== 'NEEDPAY'" @click="showDetails($event, order)">
      <b-col cols="8">
        <h3 class="font-italic">#{{order._id.substr(18)}}</h3>
        <h3 class="address">
          <i class="bi bi-geo"></i>
          {{ order.address }}
        </h3>
      </b-col>
      <b-col cols="2" class="d-flex justify-content-center align-items-center">
        <div class="badge" :class="[badgeClass(order.status)]">
          {{ order.status }}
        </div>
      </b-col>
      <b-col
        cols="2"
        class="d-flex justify-content-center align-items-center"
        v-if="order.status !== 'DELIVERED'"
      >
        {{ time }}
      </b-col>
      <b-col
        cols="2"
        class="d-flex justify-content-center align-items-center"
        v-else
      >
        {{ formatTime(order.deliveredAt) }}
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: ["order"],
  data() {
    return {
      time: "",
    };
  },
  created() {
    const orderTime = new Date(this.order.orderedAt);
    setInterval(() => {
      const now = new Date();
      const diffTime = Math.abs(now - orderTime);
      const diffMins = Math.ceil(diffTime / (1000 * 60));
      this.time = diffMins + " mins";
    }, 1000);
  },
  methods: {
    badgeClass(status) {
      if (status === "PENDING") return "badge-danger";
      else if (status === "CONFIRMED") return "badge-warning";
      else if (status === "PACKED") return "badge-primary";
      else if (status === "ONWAY") return "badge-info";
      else if (status === "DELIVERED") return "badge-success";
    },

    showDetails(ev, order) {
      ev.preventDefault();

      this.$emit("showOrderDetails", order);
    },
    formatTime(time) {
      return new Date(time).toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    },
  },
};
</script>

<style  lang="scss">
.order-list {
  .order-list-item {
    padding: 16px;
    border-radius: 2px;
    background-color: #eee;
    border-block: 1px solid #ddd;
    cursor: pointer;
    h3 {
      font-size: 20px;
      margin-bottom: 0;
      &.address {
        font-weight: 400;
      }
    }
  }
}
.badge-warning {
  color: #212529;
  background-color: #ffc107 !important;
}
</style>
