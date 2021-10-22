<template>
  <div
    class="single-order"
    @click="$router.push('/orders/' + order._id)"
  >
    <!-- Top Header -->
    <div class="reorder-info">
      <div class="info">
        <h2 class="placed-date">Placed {{ formatTime(order.createdAt) }}</h2>

        <div class="info-container">
          <div class="order-detail">
            <p class="order-detail-text">
              {{ order.products.length }} items
            </p>
          </div>
          <div class="order-detail">
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
        <p class="re-order-text" v-else @click.stop="reorder(order)">
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
          <!-- <div class="quantity-container">{{ prod.quantity }}</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'order-item',
  props: {
    order: Object
  },
  methods: {
    formatTime(time) {
      return new Date(time).toLocaleString("en-US", {
        month: "long",
        day: "2-digit",
      });
    },
    reorder(order) {
      this.$emit('reorder', order);
    },
  }
}
</script>

<style lang="scss" scoped>
.single-order {
  flex: 1 1;
  cursor: pointer;
  padding-bottom: 24px;
  border-bottom: 1px solid #C4C4C4;
  margin-bottom: 12px;

  .reorder-info {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .info {
      .placed-date {
        font-weight: 500;
        font-size: 20px;
        line-height: 23px;
        color: #646363;
      }
    }

    .info-container {
      display: flex;
      margin: 20px 0;

      .order-detail {
        display: flex;
        align-items: center;
        margin-right: 40px;

        p {
          font-weight: normal;
          font-size: 16px;
          line-height: 19px;
          color: #646363;
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
      padding: 10px 48px;
      background: #23A334;
      border-radius: 21px;
      cursor: pointer;
      transition: 0.3s;

      &-text {
        font-weight: bold;
        font-size: 16px;
        line-height: 19px;
        color: #FFFFFF;
        margin: 0;
      }
    }
  }

  .order-products {
    display: flex;

    .order-single-product {
      p {
        font-weight: 600;
        color: #0a0a0a;
        margin-bottom: 0;
      }
      .product-details {
        position: relative;
        display: flex;
        justify-content: center;
        margin-right: 10px;

        img {
          height: 100%;
          width: 100%;
          height: 46px;
          width: 46px;
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

  @media screen and (max-width: 767px) {
    .reorder-info {
      .info {
        .placed-date {
          font-size: 16px;
          line-height: 19px;
        }
      }

      .info-container {
        margin: 15px 0;

        .order-detail {
          margin-right: 16px;

          p {
            font-size: 12px;
            line-height: 14px;
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
        padding: 6px 32px;

        &-text {
          font-size: 12px;
          line-height: 14px;
        }
      }
    }

    .order-products {
      display: flex;

      .order-single-product {
        p {
          font-weight: 600;
          color: #0a0a0a;
          margin-bottom: 0;
        }
        .product-details {
          position: relative;
          display: flex;
          justify-content: center;
          margin-right: 10px;

          img {
            height: 100%;
            width: 100%;
            height: 46px;
            width: 46px;
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
</style>
