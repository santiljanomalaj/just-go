<template>
  <div>
    <b-container fluid>
      <b-navbar class="navbar">
        <b-navbar-brand href="/">
          <img alt="" src="@/assets/images/logo/logo-green.svg"/>
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="userName == ''" to="/login">Login</b-nav-item>
          <router-link v-if="userName !== ''" class="username" to="/profile">{{ userName }}</router-link>
          <span v-if="userName !== ''" class="logout" @click="logout"
          >Logout</span
          >
        </b-navbar-nav>
      </b-navbar>
    </b-container>
    <div class="main-content">
      <slot></slot>
    </div>
    <Footer></Footer>
  </div>  
</template>

<script>
import Footer from '@/components/shared/Footer.vue';

export default {
  name: 'default-layout',
  components: {
    Footer
  },
  data() {
    return {
      userName: '',
      login: null,
    }
  },
  created() {
    this.$store.dispatch('VERIFY_LOGIN').then((res) => {
      let user = res;
      if (user) {
        this.login = true;
        this.userName = user.fname +' '+user.sname.charAt(0);
      }
    });
  },
  methods: {
    logout() {
      this.$store.dispatch('LOGOUT').then(() => {
        this.userName = '';
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  padding-left: 45px;
  align-items: center;
  z-index: 1;

  img {
    height: 50px;
  }

  .nav-link {
    color: #23a534 !important;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    text-transform: uppercase;
  }

  .navbar-nav {
    align-items: start;
    padding-left: 60px;
  }

  .username {
    cursor: pointer;
    color: #23a534;
    font-weight: bold;
    font-size: 17px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }

  .logout {
    margin-left: 10px;
    cursor: pointer;
    color: #23a534;
    font-weight: bold;
    font-size: 17px;
    display: flex;
    justify-content: center;
    align-items: center;
    // width: 100%;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding-left: 0;
    padding-right: 0;
    img{
      height: 30px;
    }
    .username {
      display: none;
    }
  }
}

.main-content {
  max-width: 1100px;
  padding: 70px 40px;
  margin: 0 auto;

  @media screen and (max-width: 576px) {
    padding: 30px 20px;
  }
}
</style>