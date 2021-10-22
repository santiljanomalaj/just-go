<template>
  <div class="home-header">
    <div class="home-header-wrapper">
      <div class="text-center home-logo">
        <home-dropdown
          @openProfileDialog="openProfileDialog"
          @openOrderDialog="openOrderDialog"
        ></home-dropdown>
        <a href="/" class="nav-logo">
          <img src="@/assets/images/logo/logo-green.svg" />
        </a>
      </div>
      <div class="home-header-nav">
        <div class="home-deliver-info">
          <span>Delivering to</span>
          <span v-if="userLocation && userLocation.address">{{ userLocation.address }}</span>
        </div>
        <div class="home-search-wrapper">
          <div class="home-search-box">
            <div
              class="home-nav-toggle"
              @click="openNavbar"
            >
              <img class="" src="@/assets/images/nav/toggle.svg" />  
            </div>
            <input
              class="input custom-input"
              placeholder="Search Products"
              v-model="searchStr"
            />
            <img class="home-header-search__icon" src="@/assets/images/nav/search.svg" />
          </div>
          <div class="home-header-nav-list">
            <home-dropdown
              @openProfileDialog="openProfileDialog"
              @openOrderDialog="openOrderDialog"
            ></home-dropdown>
          </div>
        </div>
      </div>
    </div>
    <div style="padding-left: 15px; padding-right: 15px;">
      <div class="mobile-navbar">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="mobile-navbar-item"
        >
          <a :href="'#' + normalizeId(category.name)">
            <div class="category-image">
              <img :src="category.icon" />
            </div>
            {{ category.name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HomeDropdown from './HomeDropdown';

export default {
  name: "home-header",
  components: {
    HomeDropdown
  },
  props: ['categories'],
  data() {
    return {
      searchStr: '',
    }
  },
  computed: {
    ...mapGetters({
      userLocation: 'getUserLocation'
    }),
    productsLength() {
      return this.$store.getters.getProductsLength;
    },
  },
  watch: {
    searchStr(val) {
      this.$emit('handleSearch', val);
    }
  },
  methods: {
    openOrderDialog() {
      this.$emit('orderDialogToggle', true);
    },
    openProfileDialog() {
      this.$emit('profileDialogToggle', true);
    },
    openMybag() {
      this.$emit('drawerToggle', true);
    },
    openNavbar() {
      this.$emit('navbarToggle', true);
    }
  }
}
</script>

<style lang="scss" scoped>
.home-header {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1500;
  background: white;

  .nav-logo {
    img {
      height: 45px;
    }
  }

  .home-header-wrapper {
    max-width: 1480px;
    margin: 0 auto;
    padding: 0 20px;

    .home-logo {
      padding: 16px 0;

      .el-dropdown,
      .home-header-cart-wrapper {
        display: none;
      }
    }
    
    .home-header-nav {
      display: flex;
      align-items: center;
      margin-bottom: 76px;
    
      .home-deliver-info {
        width: 242px;
        margin-right: 87px;

        span {
          font-size: 16px;
          line-height: 19px;

          &:first-child {
            color: #23A334;
            font-weight: bold;
            margin-right: 8px;
          }

          &:last-child {
            color: #646363;
            font-weight: normal;
          }
        }
      }
    
      .home-search-wrapper {
        flex: 1;
        display: flex;
        justify-content: space-between;
    
        .home-search-box {
          position: relative;
          max-width: 630px;
          flex: 1;
          margin-right: 20px;

          .home-nav-toggle {
            display: none;
          }
    
          .home-header-search__icon {
            position: absolute;
            right: 29px;
            top: 14px;
          }
        }
    
        .home-header-nav-list {
          display: flex;
          align-items: center;
    
          .el-dropdown {
            margin-right: 20px;
            cursor: pointer;
          }
        }
      }
    }

    .home-header-cart-wrapper {
      background: #23A534;
      border-radius: 24px;
      padding: 5px 10px;
      cursor: pointer;

      span {
        font-weight: bold;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;
        margin-left: 4px;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .home-header-wrapper {
      padding: 0 15px;

      .home-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        .el-dropdown {
          display: block;
          cursor: pointer;
          position: absolute;
          left: 5px;
          top: 25px;
        }

        .home-header-cart-wrapper {
          display: block;
          background: white;

          span {
            color: #23A534;
          }
        }
      }

      .home-header-nav {
        margin-bottom: 34px;
        flex-direction: column;
        text-align: center;

        .home-deliver-info {
          margin-right: 0;
          margin-bottom: 12px;
        }

        .home-search-wrapper {
          width: 100%;
          
          .home-search-box {
            max-width: 100%;
            margin-right: 0;
            display: flex;
            align-items: center;

            .home-nav-toggle {
              display: flex;
              padding: 9px;
              background-color: #23A334;
              border-radius: 5px;
              margin-right: 8px;
              cursor: pointer;
            }

            .home-header-search__icon {
              display: none;
            }
          }
          
          .home-header-nav-list {
            display: none;
          }
        }
      }
    }
  }

  .mobile-navbar {
    display: none;

    @media screen and (max-width: 767px) {
      display: flex;
      align-content: center;
      width: 100%;
      overflow-x: auto;
      padding-bottom: 20px;
      background: white;

      &-item {
        max-width: 61px;
        margin-right: 28px;
        text-align: center;
        cursor: pointer;

        &:hover {
          .category-image {
            background-color: #23A534;
          }
        }

        &:last-child {
          margin-right: 0;
        }

        a {
          font-weight: bold;
          font-size: 11px;
          line-height: 13px;
          color: #646363;
          text-transform: uppercase;
          text-decoration: none;
        }

        .category-image {
          padding: 16px;
          background-color: #EBF9ED;
          border-radius: 50%;
          display: flex;
          width: fit-content;
          margin-bottom: 10px;

          img {
            object-fit: contain;
            width: 28px;
            height: 28px;
          }
        }
      }
    }
  }
}
</style>
