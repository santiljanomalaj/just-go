<template>
  <div class="overflow-auto">
    <SearchProducts
      :products="filteredProducts"
      :categories="categories"
      @addCartItem="updateCartItems"
      @showProduct="toggleCartItem"
    />
  </div>
</template>
<script>
import SearchProducts from '@/components/Search/SearchProducts';
import ProductsData from '@/mixins/ProductsData';
import {mapGetters} from 'vuex';

export default {
  name: 'search',
  data() {
    return {
      searching: false,
      filteredProducts: [],
      productsView: false,
    }
  },
  props: {
    searchStr: String
  },
  mixins: [ProductsData],
  components: {
    SearchProducts,
  },
  methods: {
    filterProducts(str) {
      this.filteredProducts = this.rawProducts.filter((product) => {
        return (
          product.title.toLowerCase().includes(str.toLowerCase()) ||
          (product.keyword || "").toLowerCase().includes(str.toLowerCase())
        );
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
    searchStr: {
      immediate: true,
      handler(newVal, oldVal ) {
        this.searching = true;
        if (this.rawProducts.length) {
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.filterProducts(newVal);
          }, 300);
        }
        if (newVal.length) this.productsView = true;
        else this.productsView = false;
      }
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
