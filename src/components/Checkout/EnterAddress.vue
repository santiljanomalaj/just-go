<template>
<div class="enter-address">
  <div class="ico-back" @click="closeMe">
    <i class="bi bi-chevron-left"></i>
  </div>
  <router-link to="/browse" class="browse-store">
    <i class="bi bi-shop"></i>
  </router-link>
  <Map autocomplete :mapAddress="address" :mapPosition="location" @addressUpdate="addressUpdate" />
  <div class="err">{{error}}</div>
  <div class="recent-address" v-if="user">
    <h3>Recent Address</h3>

    <ul>
      <li v-for="ad in user.recentAddress" :key="ad.address" @click="addressUpdate(ad)">
        <span class="ico">
        <i class="bi bi-geo-alt"></i>
        </span>
        <h4>{{ ad.address }}</h4>
      </li>
    </ul>

  </div>
  <div class="select-address" v-if="address">
    <button class="btn-save" @click="next">
      Next
    </button>
  </div>
</div>
</template>

<script>
import Map from "@/components/shared/Map";
import {mapGetters} from "vuex";
export default {
  name: 'EnterAddress',
  data(){
    return{
      error: '',
      location: {
        lat: 33.6509984,
        lng: -117.8367399,
      },
      address: "",
    }
  },
  methods: {
    addressUpdate(data) {
      this.error = '';
      if (data.address === "") {
        this.error =
            "So, Sorry We are not currently operating in this area!";
        return
      }
      this.address = data.address;
      this.location = data.location;

    },
    closeMe(){
      this.$emit("close-me");
    },
    next(){
      this.$emit('addressUpdate', {
        address: this.address,
        location: this.location
      })

    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  components: {
    Map,
  },
  created(){
     this.$gtag.screenview({
      app_name: "Just Go",
      screen_name: "EnterAddress",
    });
  }
}
</script>

<style lang="scss" scoped>
.enter-address{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 2;
  .ico-back{
    background:#1e852b;
    height: 45px;
    width: 45px;
    border-radius: 12px;
    position: fixed;
    top: 24px;
    left: 24px;
    z-index: 1;
    font-size: 26px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 2px;
    cursor: pointer;
  }
  .browse-store{
    background:#1e852b;
    height: 45px;
    width: 45px;
    border-radius: 12px;
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 1;
    font-size: 26px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 2px;
    cursor: pointer;
  }
  .err{
    max-width: 768px;
    width: 100%;
    margin-inline: auto;
  }
  .recent-address{
    overflow-y: auto;
    height: calc(100vh - 340px);
    h3{
      padding: 1rem  0 0 1rem;
      color: #737373;
      font-size: .8rem;

    }
    ul{
      list-style-type: none;
      li{
        cursor: pointer;
        display: flex;
        align-items: center;
        column-gap: 12px;
        padding: 1rem;
        border-bottom: 1px solid #eee;
        &:first-child{
          border-top: 1px solid #eee;
        }
        &:last-child{
          margin-bottom: 60px;
          }
        .ico i{
          font-size: 28px;
          color: #0a0a0a
        }
        h4{
          font-size: 18px;
          color: #0a0a0a;
          margin-bottom: 0;
        }
      }
    }
  }
  .select-address{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px;
    box-shadow: 0px -6px 4px 0 #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    background-color: #fff;
    .btn-save{
      height: 44px;
      width: 115px;
      padding-inline: 16px;
      border-radius: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #1e852b;
      background-color: #1e852b;
      color: #fff;
      font-weight: 600;
      &:focus{
        outline: none;
      }
    }
  }
}
</style>
