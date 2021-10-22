<template>
  <div class="layout">
    <home-header
      :categories="categories"
      @orderDialogToggle="orderDialogToggle"
      @profileDialogToggle="profileDialogToggle"
      @drawerToggle="drawerToggle"
      @navbarToggle="navbarToggle"
      @handleSearch="handleSearch"
    ></home-header>
    <div class="layout-container">
      <div class="layout-wrapper">
        <div class="layout-inner">
          <div>
            <slot
              :props="{ searchStr }"
              :navbarVisible="navbarVisible"
              :navbarToggle="navbarToggle"
              :drawerToggle="drawerToggle"
            ></slot>
          </div>
            <back-top />
        </div>
      </div>
    </div>
    <order-dialog
      :dialogVisible="orderDialogVisible"
      @dialogToggle="orderDialogToggle"
    />
    <profile-dialog
      :dialogVisible="profileDialogVisible"
      @dialogToggle="profileDialogToggle"
    />
    <bag-drawer
      :drawerVisible="drawerVisible"
      @drawerToggle="drawerToggle"
    ></bag-drawer>
  </div>
</template>

<script>
import HomeHeader from './HomeHeader';
import OrderDialog from '@/components/Orders/OrderDialog';
import ProfileDialog from '@/components/Profile/ProfileDialog';
import BagDrawer from '@/components/Checkout/BagDrawer';
import BackTop from './BackTop';

export default {
  name: 'home-layout',
  props: ['categories'],
  components: {
    BagDrawer,
    BackTop,
    HomeHeader,
    OrderDialog,
    ProfileDialog
  },
  data() {
    return {
      orderDialogVisible: false,
      profileDialogVisible: false,
      drawerVisible: false,
      navbarVisible: false,
      searchStr: ''
    }
  },
  methods: {
    orderDialogToggle(val) {
      this.orderDialogVisible = val;
    },
    profileDialogToggle(val) {
      this.profileDialogVisible = val;
    },
    drawerToggle(val) {
      this.drawerVisible = val;
    },
    navbarToggle(val) {
      this.navbarVisible = val;
    },
    handleSearch(val) {
      this.searchStr = val;
    }
  }
}
</script>

<style lang="scss" scoped>
  .layout {
    max-width: 1480px;
    margin: 0 auto;
    padding: 0 20px;

    .layout-container {
      padding: 0;
      margin-top: 0;
      height: 100%;
      min-height: auto;

      .layout-wrapper {
        height: calc(100% - 200px);

        .layout-inner {
          overflow: auto;
          height: 100vh;
        }
      }
    }

    @media screen and (max-width: 767px) {
      padding: 0 15px;

      .layout-container {
        .layout-wrapper {
          height: calc(100% - 190px);
        }
      }
    }
  }
</style>
