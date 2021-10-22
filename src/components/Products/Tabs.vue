<template>
  <div>
    <div class="navbar-tab">
      <el-aside width="242px">
        <el-menu>
          <el-menu-item v-for="(category, index) in categories" :key="index">
            <a :href="'#' + normalizeId(category.name)">
              <div class="category-image">
                <img :src="category.icon" />
              </div>
              {{ category.name }}
            </a>
          </el-menu-item>
        </el-menu>
      </el-aside>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: Array,
    navbarDrawer: Boolean
  },
  data() {
    return {
      direction: 'ltr',
      drawer: false
    }
  },
  watch: {
    navbarDrawer(val) {
      this.drawer = val;
    }
  },
  methods: {
    toggleCartModal() {
      this.$emit('toggleCartModal');
    },
    handleClose(done) {
      done();
      this.$emit('navbarToggle', false);
    },
    toggleDrawer() {
      this.$emit('navbarToggle', false);
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar-tab {
  width: 242px;
  position: fixed;
  top: 0;
  bottom: 0;
  transition: padding-top .3s;
  margin-top: 200px;
  max-height: calc(100vh - 300px);
  overflow-y: auto;

  @media screen and (max-width: 767px) {
    display: none;
  }
}

.el-menu {
  border: none;
  
  .el-menu-item {
    padding: 10px !important;
    display: flex;
    align-items: center;
    height: 48px;
    border-bottom: 1px solid #C4C4C4;

    &:last-child {
      border: none;
    }

    &:focus,
    &:hover,
    &.is-active:focus,
    &.is-active:hover {
      background: #23A534;
      border-radius: 10px;
      
      a {
        color: white;
        font-weight: bold;
        text-decoration: none;
      }

      .category-image {
        background-color: white;
      }
    }

    &,
    &.is-active {
      a {
        color: #646363;
        font-weight: normal;
        font-size: 14px;
        line-height: 30px;
        height: 100%;
        width: 100%;
      }
    }

    .category-image {
      min-width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #23A534;
      margin-right: 14px;
      border-radius: 50%;
    }

    img {
      width: 22px;
      height: 22px;
    }

    a {
      display: flex;
      align-content: center;
    }
  }

  @media screen and (max-width: 767px) {
    .el-menu-item {
      padding: 9px 15px !important;

      &:focus,
      &:hover,
      &.is-active:focus,
      &.is-active:hover {
        border-radius: 0;
      }
    }
  }
}
</style>
