<template>
  <div>
    <div class="search-input px-lg-8">
      <span class="icon">
        <svg
            aria-hidden="true"
            class="svg-inline--fa fa-search fa-w-16"
            data-icon="search"
            data-prefix="fas"
            focusable="false"
            role="img"
            viewBox="0 0 512 512"
        >
          <path
              d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
              fill="currentColor"
          ></path>
        </svg>
      </span>
      <input v-model="searchStr" placeholder="Search" type="search"/>
      <span class="close d-sm-none" @click="searchStr = ''"> Close </span>
    </div>
    <SearchProducts
      v-if="productsView"
      :products="filteredProducts"
      :categories="categories"
      @addCartItem="updateCartItems"
      @showProduct="toggleCartItem"
    />
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import SearchProducts from '@/components/Search/SearchProducts';
import ProductsData from '@/mixins/ProductsData';
import {mapGetters} from 'vuex';

export default {
  name: 'SearchBox',
  data() {
    return {
      searchStr: '',
      searching: false,
      filteredProducts: [],
      productsView: false,
    }
  },
  mixins: [ProductsData],
  components: {
    SearchProducts,
  },
  methods: {
    filterProducts(str) {
      this.filteredProducts = this.rawProducts.filter((product) => {
        return product.title.toLowerCase().includes(str.toLowerCase());
      });
      this.searching = false;
    },
    updateCartItems(product) {
      this.showModal = false;
      this.$store.commit('updateCartItems', product);
    },
    toggleCartItem(product) {
      this.showModal = !this.showModal;
      this.$store.commit('toggleCartItem', product);
    },
  },
  watch: {
    searchStr(newVal) {
      this.searching = true;
      if (this.rawProducts.length) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.filterProducts(newVal);
        }, 300);
      }
      if (newVal.length) this.productsView = true;
      else this.productsView = false;
    },
    rawProducts() {
      this.filterProducts(this.searchStr);
    },
  },
  computed: {
    ...mapGetters({
      categories: 'getCategories',
    }),
  },
  created() {
    if (this.$route.query.value) {
      let value = this.$route.query.value.replace('-', ' ');
      this.searchStr = value;
      this.searching = true;
    }

    this.$gtag.pageview(this.$route);
  },
}
</script>
<style lang="scss" scoped>
.searching {
  min-height: calc(100vh - 350px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  flex-direction: column;
}

.search-input {
  display: flex;
  margin-top: 16px;
  column-gap: 12px;
  position: relative;
  align-items: center;

  .icon {
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      height: 30px;
      width: 30px;
      color: #a5a5a5;
      @media (max-width: 500px) {
        height: 20px;
        width: 20px;
      }
    }
  }

  input {
    border: none;
    background-color: transparent;
    color: #000000;
    font-size: 28px;
    font-weight: 700;
    width: 100%;
    height: 70px;
    @media (max-width: 500px) {
      height: 70px;
      font-size: 16px;
    }

    &::-webkit-search-cancel-button {
      display: none;
    }

    &::-webkit-input-placeholder {
      /* Edge */
      color: #a5a5a5;
      font-size: 28px;
      font-weight: 700;
      @media (max-width: 500px) {
        font-size: 16px;
      }
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #a5a5a5;
      font-size: 28px;
      font-weight: 700;
      @media (max-width: 500px) {
        font-size: 16px;
      }
    }

    &::placeholder {
      color: #a5a5a5;
      font-size: 28px;
      font-weight: 700;
      @media (max-width: 500px) {
        font-size: 16px;
      }
    }

    &:focus {
      outline: none;
    }
  }
}
</style>
