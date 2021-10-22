<template>
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      <img src="@/assets/images/nav/profile.svg" />
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown" class="home-header-dropdown">
      <el-dropdown-item>
        <div @click="openProfileDialog">
          <img src="@/assets/images/nav/setting.svg" />
          <img class="hover" src="@/assets/images/nav/white-setting.svg" />
          <span>My Account Settings</span>
        </div>
      </el-dropdown-item>
      <el-dropdown-item>
        <div @click="openOrderDialog">
          <img src="@/assets/images/nav/order.svg" />
          <img class="hover" src="@/assets/images/nav/white-order.svg" />
          <span>Your Orders</span>
        </div>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'home-dropdown',
  methods: {
    openOrderDialog() {
      this.$emit('openOrderDialog');
    },
    openProfileDialog() {
      this.$emit('openProfileDialog');
    },
  }
}
</script>

<style lang="scss" scoped>
.el-dropdown-menu.home-header-dropdown {
  width: 203px;
  padding: 24px 0;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.15);
  border-radius: 20px;

  .el-dropdown-menu__item {
    padding: 0;

    div{
      display: flex;
      line-height: inherit;
      padding: 10px 24px;
  
      img {
        margin-right: 16px;

        &.hover {
          display: none;
        }
      }
  
      span {
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
        color: #646363;
      }
    }

    &:hover {
      background-color: #23A534;

      div {
        img {
          display: none;

          &.hover {
            display: block;
          }
        }
        
        span {
          color: white;
          font-weight: bold;
        }
      }
    }
  }
}
</style>