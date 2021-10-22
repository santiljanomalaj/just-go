<template>
  <div class="bottom-container" :class="{'has-cart': cart.length && !hideCart}">
    <transition name="slide-fade-complete">
      <div
        class="mobile-cart"
        @click="drawerToggle"
        v-if="cart.length && !hideCart"
      >
        <span> <i class="bi bi-cart3 mr-1"></i>{{ totalItems }}</span>
        <span class="font-weight-bold">View Bag</span>
        <span>{{ formatPrice(totalPrice) }}</span>

      </div>
    </transition>
    <div class="container-fluid">
      <div class="bottom-navbar px-lg-6">
        <router-link
          v-for="(navLink, i) in navLinks"
          :key="i"
          :to="navLink.link"
        >
          <span class="link p-sm-3" @click="toggleActive(navLink.text)">
            <span
              v-if="activeLink(navLink.link)"
              v-html="navLink.activeSvg"
            ></span>
            <span v-else v-html="navLink.svg"></span>
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["navLinks", "active", "hideCart", "cartShow"],
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      cart: "getCartItems",
    }),
    totalPrice() {
      let total = 0;
      this.cart &&
        this.cart.forEach((item) => {
          if (item.salePrice) {
            total += +item.salePrice * +item.quantity;
          } else {
            total += +item.price * +item.quantity;
          }
        });
      return total.toFixed(2);
    },
    totalItems(){
       let total = 0;
      this.cart &&
        this.cart.forEach((item) => {
          total +=  item.quantity;
        });
      return total
    }
  },
  methods: {
    toggleCartModal() {
      this.$emit("toggleCartModal");

    },
    toggleActive(text) {
      this.activeClass = text;
    },
    activeLink(link) {
      return link.toLowerCase() === this.$route.path;
    },
    drawerToggle() {
      this.$emit('drawerToggle', true);
    }
  },
  created() {
    if (this.$route.path == "/browse") {
      this.activeClass = "browse";
      return;
    } else if (this.$route.path == "/search") {
      this.activeClass = "search";
      return;
    } else if (this.$route.path == "/orders") {
      this.activeClass = "orders";
      return;
    } else if (this.$route.path == "/profile") {
      this.activeClass = "profile";
      return;
    }
    if (this.active) {
      this.activeClass = this.active;
    }
  },
  watch: {

  },
};
</script>

<style lang="scss" scoped>
.bottom-container {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  display: flex;
  box-shadow: 4px 4px 1rem rgba(0, 0, 0, 0.3);
  height: 0px;
  background: #eff9f0;

  &.has-cart {
    height: 88px;
  }

  .mobile-cart {
    position: fixed;
    height: 70px;
    max-width: 768px;
    width: 100%;
    border-radius: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background: #1e852b;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-size: 28px;
    box-shadow: 0px 2px 7px 0 #bbb1b1;
    cursor: pointer;
    transition: box-shadow .2s ease-in-out;
    &:hover{
      box-shadow: 0px 5px 7px 0 #8a8484;
    }

    @media (max-width: 991px) {
      max-width: 600px;
    }

    @media (max-width: 767px) {
      max-width: 400px;
      height: 50px;
      bottom: 20px;
    }

    @media (max-width: 576px) {
      max-width: 300px;
      height: 50px;
    }

    span,
    i {
      transition: all 0.2s ease-in-out;
    }

    span {
      font-size: 22px;
      color: #fff;

      @media (max-width: 767px) {
        font-size: 18px;
      }
    }

  }
  .bottom-navbar {
    //z-index: 6;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
    width: 100%;
    pointer-events: all;
    height: 100%;
    a {
      border-left: 2px solid #b5d8ba;
      &:first-child {
        border: none;
      }
    }
    .link {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      row-gap: 5px;

      svg {
        height: 24px;
        // width: 24px;
        display: inline;
      }
      .title {
        font-family: "Roboto", sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 10px;
        line-height: 12px;
        text-align: center;
        letter-spacing: 0.125em;
        color: #bdb8b8;
        &.active {
          color: #23a534;
        }
      }
    }
  }
}

</style>
