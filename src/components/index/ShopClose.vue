<template>
  <div class="w-100 close-alert px-lg-8 px-2 mb-4">
    <b-container fluid>
      <b-row class="gap-20 align-items-center">
        <div>
          <i class="bi bi-emoji-frown"></i>
        </div>
        <div>
          <h2>{{shop.statusTitle}}</h2>
          <p>{{shop.statusSubTitle}}</p>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'ShopClose',
  computed: {
    ...mapGetters({
      shop: 'getShop'
    })
  }
};
</script>

<style lang="scss" scoped>
.close-alert {
  background: #23a534;
  padding: 10px 0;
  margin-left: 260px;
  margin-top: 20px;
  padding-left: 65px !important;

  @media screen and (max-width: 767px) {
    margin-left: 0;
    padding-left: 8px !important;
  }
}

i {
  font-size: 44px;
  color: #fff;
}

.gap-20 {
  column-gap: 20px;
}

h2 {
  font-size: 22px;
  color: #fff;
  margin-bottom: 0;

}

p {
  font-size: 17px;
  color: #fff;
  margin-bottom: 0;
  font-weight: 500;
}
</style>
