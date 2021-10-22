<template>
  <div class="categories px-lg-8">
    <h2>Categories</h2>
    <div class="card-wrapper">
      <router-link
          v-for="item in categories"
          :key="item.name"
          :style="{ background: item.bg }"
          :to="`/category/${item._id}`"
          class="cat-card"
      >

        <figure v-lazyload class="product-img">
          <div class="placeholder">
            <Placeholder height="70" width="70" />
          </div>
          <img :alt="item.name" :data-url="item.icon"/>
        </figure>
        <div class="detail">
          <h2>{{ item.name }}</h2>
          <p>
            {{ getCategoryItems(item) }}
            Items
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import ProductsData from '../../mixins/ProductsData'
import Placeholder from "@/components/shared/Placeholder";

export default {
  name: 'Categories',
  mixins: [ProductsData],
  props: ['categories'],
  components: {  Placeholder},
  methods: {
    getCategoryItems (item) {
      if (this.products[item._id]) {
        return this.products[item._id].products.length
      }

      return 0
    },
  },
}
</script>

<style lang="scss" scoped>
.categories {
  margin-top: 24px;

  h2 {
    font-size: 28px;
    color: #0a0a0a;
    font-weight: 700;
  }

  .card-wrapper {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding-bottom: 160px;

    .product-img {
      margin: 0;
      display: flex;
      align-items: center;
      .placeholder {
        height: 60px;
        width: 60px;
      }

      img {
        display: none;
      }

      &.loaded {
        .placeholder {
          display: none;
        }

        img {
          width: 70px;
          display: block;
        }
      }
    }

    @media (max-width: 1334px) {
      grid-template-columns: 1fr 1fr 1fr;
      img {
        width: 60px;
      }
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
      margin: auto;
      margin-bottom: 100px;
    }

    .cat-card {
      cursor: pointer;
      background: #dfdfdf;
      border-radius: 1rem;
      position: relative;
      overflow: hidden;
      padding: 1rem;
      height: 6rem;
      padding: 0.6rem;
      transition: all 0.3s ease-in;
      transform: translateY(25px);
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      display: flex;
      justify-content: space-between;

      &:nth-child(4n-3) {
        background: #fa6200;
      }

      &:nth-child(4n-2) {
        background: #f4c618;
      }

      &:nth-child(4n-1) {
        background: #7b4edd;
      }

      &:nth-child(4n) {
        background: #00c650;
      }

      .detail {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 2;
        padding-left: 1rem;

        h2 {
          font-style: normal;
          font-weight: 900;
          font-size: 16px;
          line-height: 18px;
          color: #fff;
        }

        p {
          font-style: normal;
          font-weight: normal;
          font-size: 15px;
          line-height: 16px;
          color: #fff;
          margin: 0;
          position: relative;
          z-index: 2;
          font-weight: 500;
        }
      }

      img {
        position: relative;
        // padding-left: 10px;
        object-fit: contain;
        //}
      }
    }
  }
}
</style>
