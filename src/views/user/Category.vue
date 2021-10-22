<template>
  <div class="category">
    <template v-if="categories.length">
      <router-link class="icon-back" to="/search">
        <svg
            aria-hidden="true"
            class="svg-inline--fa fa-chevron-left fa-w-10"
            data-icon="chevron-left"
            data-prefix="fas"
            focusable="false"
            role="img"
            viewBox="0 0 320 512"
        >
          <path
              d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
          ></path>
        </svg>
      </router-link>
      <div :style="{ background: categoryGradient }" class="header">
        <div class="container">
          <h2>{{ currentCategory.name }}</h2>

          <img :src="currentCategory.icon" alt=""/>
        </div>
      </div>
      <div class="container-fluid">
        <div class="category-products">
          <b-row
              v-if="currentCategoryProducts.length <= 0"
              class="justify-content-center"
          >
            <div class="my-4 mx-auto">
              <h3 class="text-center">No Products Yet</h3>
            </div>
          </b-row>

          <div
              v-for="(product, index) in currentCategoryProducts"
              v-else
              :key="product._id"
              class="product"
              @click="toggleCartItem(product, index)"
          >
            <div class="image">
              <figure v-lazyload>
                <div class="placeholder">
                  <Placeholder/>
                </div>
                <img :alt="product.name" :data-url="product.img"/>
              </figure>
              <div
                  class="product-btn"
                  @click.stop.prevent="updateCartItems(product, $event, index)"
              >
                <i class="fas fa-plus"></i>
              </div>
            </div>
            <div class="details">
              <p class="default-price">
                {{
                  formatPrice(
                      product.salePrice ? product.salePrice : product.price,
                  )
                }}
              </p>
              <p
                  v-if="product.salePrice"
                  :class="{ active: product.salePrice }"
                  class="sale-price"
              >
                {{ formatPrice(product.price) }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <BottomNav
          :cartShow="showCart"
          :nav-links="navLinks"
          @toggleCartModal="toggleCartModal"
      />
      <transition name="slide-fade-complete">
        <CartModal
            v-if="showModal"
            @addCartItem="updateCartItems"
            @closeModal="closeModal"
        ></CartModal>
      </transition>

      <transition name="slide-fade-complete">
        <Cart v-if="showCart" @toggleCartModal="toggleCartModal"/>
      </transition>
    </template>
  </div>
</template>

<script>
import BottomNav from '../../components/Products/BottomNav.vue';
import {navLinks} from '@/data/Navlinks.js';
import CartModal from '../../components/Products/CartModal.vue';
import Cart from '../../components/shared/Cart.vue';

import {mapGetters} from 'vuex';

import ProductsData from '../../mixins/ProductsData';
import Placeholder from '@/components/shared/Placeholder';

export default {
  name: 'Category',
  mixins: [ProductsData],
  data() {
    return {
      navLinks,
      showModal: false,
      showCart: false,
    };
  },
  methods: {
    closeModal() {
      this.showModal = !this.showModal;
    },

    updateCartItems(product, ev, index) {
      this.showModal = false;

      this.$gtag.event('add_to_cart', {
        items: [
          {
            name: product.title,
            category: this.currentCategory.name,
            list_name: this.currentCategory.name + ' Category List Page',
            list_position: index + 1,
            quantity: 1,
            price: product.salePrice ? product.salePrice : product.price,
          },
        ],
      });
      const img = document.createElement('img');
      img.src = product.img;
      img.classList.add('animate-image');
      img.style.top = ev.target.getBoundingClientRect().top + 'px';
      img.style.left = ev.target.getBoundingClientRect().left + 'px';

      document.body.appendChild(img);

      setTimeout(() => {
        document.body.removeChild(img);
        this.$store.commit('updateCartItems', product);
      }, 800);
    },
    toggleCartItem(product, index) {
      this.showModal = !this.showModal;
      this.$gtag.event('view_item', {
        items: [
          {
            name: product.title,
            category: this.currentCategory.name,
            list_name: this.currentCategory.name + ' Category List Page',
            list_position: index + 1,
            quantity: 1,
            price: product.salePrice ? product.salePrice : product.price,
          },
        ],
      });
      this.$store.commit('toggleCartItem', product);
    },
    toggleCartModal() {
      this.showCart = !this.showCart;
    },
  },
  computed: {
    categoryBg() {
      if (this.currentCategory.bg) return this.currentCategory.bg;
      if (this.currentCategoryIndex % 4 == 0) return '#FA6200';
      else if (this.currentCategoryIndex % 4 == 1) return '#F4C618';
      else if (this.currentCategoryIndex % 4 == 2) return '#7B4EDD';
      else if (this.currentCategoryIndex % 4 == 3) return '#00C650';
    },
    categoryGradient() {
      return `linear-gradient(105.21deg, ${this.categoryBg} 39.31%, rgba(0, 198, 80, 0) 99.89%)`;
    },
    ...mapGetters({
      categories: 'getCategories',
    }),
    currentCategory() {
      return this.categories.find((cat) => cat._id === this.$route.params.id);
    },
    currentCategoryProducts() {
      let category = this.products[this.currentCategory._id];
      return category ? category.products : [];
    },
    currentCategoryIndex() {
      return this.categories.findIndex(
          (cat) => cat._id === this.$route.params.id,
      );
    },
  },
  components: {
    BottomNav,
    CartModal,
    Cart,
    Placeholder,
  },
  watch: {
    currentCategory() {
      this.$gtag.screenview({
        app_name: 'Just Go',
        screen_name: this.currentCategory.name + ' Category',
      });
    },
  },

};
</script>

<style lang="scss" scoped>
.category {
  position: relative;

  .icon-back {
    cursor: pointer;
    position: absolute;
    top: 12px;
    left: 12px;
    display: inline-block;
    height: 20px;
    width: 20px;
    z-index: 1;

    svg {
      font-size: 2rem;
      fill: #fff;
    }
  }

  .header {
    padding: 30px 0;
    max-height: 11rem;
    overflow: hidden;
    @media (max-width: 991px) {
      padding: 0 0;
    }

    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h2 {
        margin-left: 15vw;
        font-size: 2.5rem;
        font-weight: 700;
        color: #fff;
      }
    }

    img {
      height: 8rem;
      position: relative;
      bottom: -40px;
      right: 20%;
      @media (max-width: 991px) {
        height: 8rem;
        right: 5%;
      }
    }
  }

  .category-products {
    padding-bottom: 100px;
    margin-top: 2rem;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr 1fr;
    @media (min-width: 900px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 1rem;
    }

    .product {
      display: flex;
      align-items: center;
      flex-direction: column;
      column-gap: 1rem;
      cursor: pointer;

      .image {
        position: relative;
        display: flex;
        justify-content: center;
        width: 100%;
        max-width: 10rem;
        @media (min-width: 900px) {
          // height: 10rem;
        }

        img {
          height: 100%;
          width: 100%;
          object-fit: contain;
          margin: 0 auto;
          display: none;
          max-height: 150px;
          max-width: 150px;
        }

        .loaded {
          .placeholder {
            display: none;
          }

          img {
            display: block;
          }
        }
      }

      .product-btn {
        cursor: pointer;
        pointer-events: auto;
        position: absolute;
        bottom: 0;
        right: 0;
        height: 2rem;
        width: 2rem;

        background: #23a534;
        color: #fff;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          height: 1.25rem;
          width: 1.25rem;
        }
      }

      .details {
        display: flex;
        column-gap: 12px;
        align-items: center;
        width: 100%;
        padding-left: 1rem;

        h3 {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 0;
        }

        .default-price {
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 0;
          color: #000;
        }

        .sale-price {
          margin: 0;
          font-size: 1.2rem;
          opacity: 0;
          font-weight: 500;

          &.active {
            color: grey;
            text-decoration: line-through;
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
