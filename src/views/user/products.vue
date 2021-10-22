<template>
  <home-layout :categories="categoriesList">
    <template v-slot:default="slotProps">
      <ShopClose v-if="shop.status===false" />
      <Tabs
        :categories="categoriesList"
        :navbarDrawer="slotProps.navbarVisible"
        @navbarToggle="slotProps.navbarToggle"
      />
      <search
        v-if="slotProps.props.searchStr"
        :searchStr="slotProps.props.searchStr"
      >
      </search>
      <Products
        v-else
        :sections="sectionProducts"
        :categoryProducts="products"
        :categories="categoriesList"
        @toggleCartItem="toggleCartItem"
      />
      <BottomNav
        :cartShow="showCart"
        @drawerToggle="slotProps.drawerToggle"
        @toggleCartModal="toggleCartModal"
      />
      <!-- <transition name="slide-fade-complete">
        <Cart v-if="showCart" @toggleCartModal="toggleCartModal" />
      </transition> -->
      <transition name="slide-fade-complete">
        <CartModal
          v-if="showModal"
          @addCartItem="addCartItem"
          @closeModal="closeModal"
        ></CartModal>
      </transition>
    </template>
  </home-layout>
</template>

<script>
import HomeLayout from "@/layouts/HomeLayout";
import Tabs from "../../components/Products/Tabs.vue";
import Buttons from "../../components/Products/Buttons.vue";
import BottomNav from "../../components/Products/BottomNav.vue";
import Products from "../../components/Products/Products.vue";
import CartModal from "../../components/Products/CartModal.vue";
import ProductsData from "../../mixins/ProductsData";
import Cart from "../../components/shared/Cart.vue";
import { mapGetters, mapActions } from "vuex";
import ShopClose from '@/components/index/ShopClose';
import Search from '../../components/Search/Search';

export default {
  name: "Browse",
  mixins: [ProductsData],
  components: {
    Tabs,
    Buttons,
    BottomNav,
    Products,
    CartModal,
    Cart,
    ShopClose,
    HomeLayout,
    Search,
  },
  data() {
    return {
      showModal: false,
      showCart: false,
      search: false
    };
  },
  computed: {
    ...mapGetters({
      sectionProducts: "getSectionProducts",
      categoriesList: 'getCategories',
      shop: 'getShop'
    })
  },
  created() {
    if (!Object.keys(this.sectionProducts).length) {
      this.FETCH_SECTIONS()
    }
    if (!Object.keys(this.shop).length) {
      this.FETCH_SHOP()
    }
    this.$gtag.pageview(this.$route);
  },
  methods: {
    ...mapActions(["FETCH_SECTIONS", 'FETCH_SHOP']),
    closeModal() {
      this.showModal = !this.showModal;
    },
    toggleCartItem(product) {
      this.showModal = !this.showModal;
      this.$store.commit("toggleCartItem", product);
    },

    toggleCartModal() {
      this.showCart = !this.showCart;
    },
    addCartItem(product) {
      this.$store.commit("updateCartItems", product);
    }
  },
};
</script>

<style lang="scss" scoped>
.products-page {
  //   background-color: #fff;
  height: 100%;
  background-color: #FCFDFC;

}
.loader {
  min-height: calc(100vh - 150px);
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 300px;
  }
  @media (max-width: 768px) {
    img {
      width: 60%;
    }
  }
}
</style>
