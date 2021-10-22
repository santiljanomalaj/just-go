<template>
  <div class="order-card my-2">
    <h2 class="text-center font-italic">#{{ order._id.substr(18) }}</h2>

    <div class="header d-flex justify-content-between align-items-center">
      <div>
        <h2>{{ getOrderTime(order.orderedAt) }}</h2>
        <h2
          v-if="order.status !== 'DELIVERED'"
          :class="{ late: delivery.late }"
        >
          {{ remainingTime(order.orderedAt)
          }}{{ delivery.late ? "Late" : "Remaining Time" }} {{ delivery.time }}
        </h2>
        <h2 v-if="order.status === 'DELIVERED'">
          Delivered At: {{ getOrderTime(order.deliveredAt) }}
        </h2>
      </div>
      <div class="badge" :class="[badgeClass(order.status)]">
        {{ order.status }}
      </div>
    </div>
    <div class="order-details">
      <div>
        <svg fill="none" height="15" viewBox="0 0 13 15" width="13">
          <path
            d="M2.99711 4.19122H2.58563C2.50542 4.19122 2.42536 4.19813 2.34633 4.21187C1.58641 4.34404 1.0775 5.06721 1.20966 5.82714L2.00824 10.419L1.40959 12.0653C1.35396 12.2183 1.3255 12.3798 1.3255 12.5426C1.3255 13.3139 1.95079 13.9392 2.72212 13.9392H10.6169C10.7797 13.9392 10.9412 13.9107 11.0942 13.8551C11.8191 13.5915 12.1931 12.7902 11.9295 12.0653L11.3308 10.419L12.1294 5.82714C12.1431 5.74812 12.15 5.66805 12.15 5.58784C12.15 4.81651 11.5248 4.19122 10.7534 4.19122H10.3419C10.3039 3.61186 10.1635 3.07969 9.91156 2.60862C9.61048 2.04566 9.16374 1.59891 8.60078 1.29784C8.0413 0.998626 7.39561 0.856763 6.68706 0.856763H6.65199C5.94344 0.856763 5.29776 0.998626 4.73828 1.29784C4.17532 1.59891 3.72857 2.04566 3.4275 2.60862C3.17557 3.07969 3.03519 3.61186 2.99711 4.19122ZM5.933 3.56556C6.03114 3.51308 6.17275 3.45947 6.52925 3.45947H6.8098C7.16631 3.45947 7.30792 3.51308 7.40605 3.56556C7.51069 3.62152 7.58788 3.69871 7.64384 3.80334C7.68462 3.87959 7.72607 3.98208 7.74254 4.19122H5.59652C5.61298 3.98208 5.65444 3.87959 5.69522 3.80334C5.75118 3.69871 5.82836 3.62152 5.933 3.56556Z"
            stroke="#333333"
            stroke-linejoin="round"
            stroke-width="1.65"
          ></path>
        </svg>
        <span v-if="order.products">{{ order.products.length }} items</span>
      </div>
      <div>
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
        <span>{{ formatPrice(order.total) }}</span>
      </div>
    </div>
    <div class="buyer-details">
      <div class="name">Name: {{ order.name }}</div>
      <div class="phone">Phone: {{ order.phone }}</div>
      <div class="address">Address: {{ order.address }}</div>
      <div class="address">Order: #{{ order.index }}</div>
      <div class="address">Tip: {{ formatPrice(order.tip) }}</div>
      <div class="address" v-if="order.notes">Notes: {{ order.notes }}</div>
    </div>
    <div class="rider-details" v-if="order.riderId">
      <p class="font-weight-bold mb-0">Rider Name: {{ orderRider.name }}</p>
      <p class="font-weight-bold">{{ "Rider Phone: " + orderRider.phone }}</p>
    </div>
    <div class="products">
      <div class="product" v-for="prod in order.products" :key="prod.id">
        <div class="image">
          <img alt="" :src="prod.img" />
        </div>
        <p class="title font-weight-bold">
          {{ prod.title }}
        </p>
        <p class="title">Quantity: {{ prod.quantity }}</p>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <b-button
        v-if="order.status === 'PENDING'"
        class="mx-auto"
        variant="info"
        @click="changeStaus(order._id, 'CONFIRMED')"
        >Mark as Confirmed</b-button
      >
      <b-button
        v-if="order.status === 'CONFIRMED'"
        class="mx-auto"
        variant="success"
        @click="changeStaus(order._id, 'PACKED')"
        >Mark as Packed</b-button
      >
      <b-button
        v-if="order.status === 'PACKED'"
        class="mx-auto"
        variant="success"
        @click="changeStaus(order._id, 'ONWAY')"
        >Mark as On way</b-button
      >

      <b-button
        v-if="order.status === 'ONWAY'"
        class="mx-auto"
        variant="success"
        @click="changeStaus(order._id, 'DELIVERED')"
        >Mark as Delivered</b-button
      >
      <b-button
        v-if="
          !order.riderId &&
          (order.status === 'PACKED' || order.status === 'CONFIRMED')
        "
        class="mx-auto"
        variant="primary"
        @click="assignRider(order._id)"
        >Assign to Rider</b-button
      >
    </div>
    <AssignRider
      :riders="riders"
      :show="riderModal"
      :orderId="orderId"
      @assigned="$emit('assigned')"
      @close="
        riderModal = false;
        orderId = '';
      "
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AssignRider from "./AssignRider.vue";
export default {
  name: "OrderCard",
  props: ["order"],
  data() {
    return {
      delivery: {
        time: "",
        late: false,
      },
      riderModal: false,
      orderId: "",
    };
  },
  methods: {
    ...mapActions(["FETCH_USERS"]),
    assignRider(orderId) {
      this.orderId = orderId;
      this.riderModal = true;
      ///ASSIGN_RIDER
    },

    badgeClass(status) {
      if (status === "PENDING") return "badge-danger";
      else if (status === "CONFIRMED") return "badge-warning";
      else if (status === "PACKED") return "badge-primary";
      else if (status === "ONWAY") return "badge-info";
      else if (status === "DELIVERED") return "badge-success";
    },
    remainingTime(ordertime) {
      var minutesToAdd = 15;

      var endTime;
      let total;
      let seconds;
      let minutes;
      let hours;
      setInterval(() => {
        var currentDate = new Date(ordertime);
        endTime = new Date(currentDate.getTime() + minutesToAdd * 60000);
        total = Date.parse(endTime) - Date.parse(new Date());
        seconds = Math.floor((total / 1000) % 60);
        minutes = Math.floor((total / 1000 / 60) % 60);
        hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        if (hours < 0) hours += 1;
        hours = Math.abs(hours);
        minutes = Math.abs(minutes);
        seconds = Math.abs(seconds);

        if (hours < 10) {
          hours = hours.toString();
          hours = `0${hours}`;
        }
        if (minutes < 10) {
          minutes = minutes.toString();
          minutes = `0${minutes}`;
        }
        if (seconds < 10) {
          seconds = seconds.toString();
          seconds = `0${seconds}`;
        }
        this.delivery.time = `${hours}:${minutes}:${seconds}`;

        this.delivery.late = total < 0;
      }, 1000);
      return undefined;
    },
    getOrderTime(time) {
      return new Date(time).toLocaleString();
    },
    changeStaus(id, status) {
      this.$emit("changeStatus", { id, status });
    },
  },
  components: {
    AssignRider,
  },
  computed: {
    ...mapGetters({
      riders: "getRiders",
      user: "getUser",
    }),
    orderRider() {
      let rider = this.riders.find((r) => r._id === this.order.riderId);
      return rider
        ? { name: rider.fname + " " + rider.sname, phone: rider.phone }
        : {};
    },
  },
  created() {
    if (!this.riders.length) {
      this.loading = true;
      this.FETCH_USERS().then((res) => {
        this.loading = false;
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.order-card {
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);

  .header {
    h2 {
      font-size: 22px;
      &.late {
        color: red;
      }
    }

    .status {
      font-size: 16px;
      padding: 6px 12px;
      border-radius: 20px;

      &.PENDING {
        background: #ffe93c8f;
      }
      &.DELIVERED {
        background: rgba(66, 255, 60, 0.56);
      }
    }
  }

  .order-details {
    display: flex;
    column-gap: 8px;

    & > div {
      display: flex;
      column-gap: 8px;
      align-items: center;
      font-size: 16px;
    }
  }

  .buyer-details {
    margin-top: 22px;

    & > div {
      font-size: 16px;
      margin-bottom: 6px;
    }
  }

  .products {
    margin-top: 24px;

    .product {
      display: flex;
      column-gap: 12px;
      align-items: center;

      .image {
        position: relative;
        height: 4rem;
        width: 4rem;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      p {
        font-size: 18px;
        font-weight: 400;
      }
    }
  }
}
</style>
