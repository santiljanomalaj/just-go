<template>
  <div class="pending-orders">
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <h2 class="text-white text-center text-capitalize font-weight-bolder">{{$route.params.status}} Orders</h2>
    </base-header>
    <div class="container mt-4">
      <template v-if="!loading">
        <template v-if="orders.length">
        <OrderCard v-for="order in getStatusOders" :key="order.key" :order="order" @changeStatus="changeStatus"/>
        </template>
        <h3 class="text-center h-100vh" v-else>No order!</h3>
      </template>
      <div v-else class="loader">
        <b-icon
            animation="spin"
            class="spin-icon"
            font-scale="2.2"
            icon="arrow-clockwise"
        ></b-icon>
      </div>
    </div>
  </div>
</template>

<script>
import OrderCard from './OrderCard'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Pending',
  data () {
    return {
      loading: false,
    }
  },
  components: {
    OrderCard,
  },
  methods: {
    ...mapActions([
      'FETCH_ORDERS',
      'CHANGE_STATUS',
    ]),
    changeStatus (data) {
       
      this.CHANGE_STATUS(data).then(res => {
        this.showToast('Success', res, 'success')
      }).catch(err => {


        this.showToast('Error', err, 'danger')
      })
    },
    showToast (headline, msg, variant) {
      this.$bvToast.toast(msg, {
        title: headline,
        autoHideDelay: 5000,
        appendToast: true,
        variant: variant,
        toaster: 'b-toaster-top-right',
        solid: true,
      })
    },
  },

  computed: {
    ...mapGetters({
      orders: 'getOrders',
    }),
    getStatusOders(){
      return this.orders.filter(order=>{
        
        return order.status === this.$route.params.status.toUpperCase()
      })
    }
  },

  created () {
    this.loading = true

    this.FETCH_ORDERS('PENDING').then(res => {
      this.loading = false
    })
  },
  watch:{
    
  }
}
</script>

<style lang="scss" scoped>
.loader {
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
