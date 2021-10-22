<template>
<div></div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'ProductsData',
  data () {
    return{
     isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      rawProducts: 'getRawProducts',
      products: 'getProducts'
    }),
    loading(){
      return this.isLoading || this.products.length===0
    }
  },
  methods: {
    ...mapActions({
      FETCH_PRODUCTS: 'FETCH_PRODUCTS',
    })
  },
  async created () {
    if(!this.rawProducts || (this.rawProducts && this.rawProducts.length===0)){
      this.isLoading = true
      await this.FETCH_PRODUCTS()
      this.isLoading = false
    }
  },
};
</script>

<style scoped>

</style>
