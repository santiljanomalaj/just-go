<template>
  <div class="category-product">
    <div class="product-img-price">
      <div
          class="product-img-btn"
          @mousedown="toggleCartItem(product, category.category, index)"
      >
        <figure v-lazyload class="product-img">
          <div class="placeholder">
            <Placeholder/>
          </div>
          <img :data-url="product.img" alt="random image"/>
        </figure>
      </div>
      <div class="d-flex flex-column justify-content-between flex-fill">
        <p class="product-title">{{product.title}}</p>
        <div class="product-prices">
          <p class="default-price">
            {{
              formatPrice(
                  product.salePrice ? product.salePrice : product.price,
              )
            }}
          </p>
          <p v-if="product.salePrice" :class="{ active: product.salePrice }" class="sale-price">
            {{ formatPrice(product.price) }}
          </p>
          <div
              class="product-btn"
              @mousedown.stop="addCartItem(product, $event, category.category, index)"
          >
            <img src="@/assets/images/plus.svg" class="product-btn__plus-icon" />
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import Placeholder from '@/components/shared/Placeholder';

export default {
  name: 'Product',
  props: ['product', 'category', 'index'],
  components: {
    Placeholder
  },
  methods: {
    addCartItem(product, ev, section, index) {
      this.$emit('addCartItem', product, ev, section, index);
    },
    toggleCartItem(product, section, index) {
      this.$emit('toggleCartItem', product, section, index);
    },
  }
}
</script>

<style lang="scss" scoped>
.category-product {
  padding: 10px 12px;
  height: 100%;

  .product-img-price {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;

    .product-img-btn {
      position: relative;

      .product-img {
        cursor: pointer;
        width: 100%;
        margin-bottom: 7px;

        .placeholder {
          height: 130px;
          width: 100%;
          text-align: center;
        }

        img {
          width: 100%;
          height: auto;
          display: none;
          object-fit: contain;
          height: 130px;
          max-width: 130px;
          margin: 0 auto;
        }

        &.loaded {
          .placeholder {
            display: none;
          }

          img {
            display: block;
          }
        }
      }
    }

    .product-btn {
      cursor: pointer;
      pointer-events: auto;
      position: absolute;
      bottom: 0;
      right: 0;
      height: 38px;
      width: 38px;
      background: #23a534;
      color: #fff;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      // transform: translate(50%, -50%);
      
      &__plus-icon {
        width: 21px;
        height: 21px;
      }
    }

    .product-title {
      font-weight: 300;
      font-size: 16px;
      line-height: 19px;
      color: black;
      margin-bottom: 0;
    }

    .product-prices {
      min-height: 38px;
      display: flex;
      align-items: flex-end;


      p {
        margin: 0;

        &.default-price {
          font-weight: bold;
          font-size: 18px;
          line-height: 21px;
          color: #646363;
          margin-right: 22px;
        }

        &.sale-price {
          font-weight: normal;
          font-size: 14px;
          line-height: 16px;
          color: #C4C4C4;

          &.active {
            color: grey;
            text-decoration: line-through;
            display: block;
          }
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    .product-img-price {

      .product-img-btn {

        .product-img {

          .placeholder {
          }

          img {
            max-width: 110px;
            max-height: 110px;
            margin-bottom: 5px;
          }
        }
      }

      .product-btn {
        height: 29px;
        width: 29px;
        
        &__plus-icon {
          width: 16px;
          height: 16px;
        }
      }

      .product-title {
        font-size: 13px;
        line-height: 15px;
      }

      .product-prices {
        min-height: 29px;
        display: flex;
        align-items: flex-end;


        p {
          margin: 0;

          &.default-price {
            font-size: 14px;
            line-height: 16px;
            margin-right: 8px;
          }

          &.sale-price {
            font-size: 10px;
            line-height: 12px;
          }
        }
      }
    }
  }
}
</style>