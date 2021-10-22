<template>
  <div>
    <base-header class="pb-7 pt-7 p bg-gradient-success">
      <!-- Card stats -->
      <h2 class="text-white text-center font-weight-bolder">Shop</h2>
    </base-header>
    <b-container>
      <b-row class="pt-4">
        <b-col class="my-2" cols="12">

          <label>Shop</label>
          <div class="d-flex align-items-center pt-3">

            <span>Close</span>
            <label class="switch mx-2 mb-0">
              <input v-model="shop.status" type="checkbox" value="true">
              <span class="slider round"></span>
            </label>
           <span> Open</span>
          </div>
          <button :disabled="saving" class="btn btn-success mt-2 float-right" @click="updateShop()">
            Update
          </button>
        </b-col>
        <b-col class="my-2" cols="12">

          <label>Shop Close Title</label>
          <textarea v-model="shop.statusTitle" :disabled="saving" class="form-control" rows="4"></textarea>
          <button :disabled="saving" class="btn btn-success mt-2 float-right" @click="updateShop()">
            Update
          </button>
        </b-col>
        <b-col class="my-2" cols="12">
          <label>Shop Close Subtitle</label>
          <textarea v-model="shop.statusSubTitle" :disabled="saving" class="form-control" rows="4"></textarea>
          <button :disabled="saving" class="btn btn-success mt-2 float-right" @click="updateShop()">
            Update
          </button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'Shop',
  data() {
    return {

      saving: false,
    };
  },
  methods: {
    ...mapActions([
      'FETCH_SHOP',
      'UPDATE_SHOP',
    ]),
    updateShop() {

      this.saving = true;
      this.UPDATE_SHOP(this.shop).then(res => {
        this.showToast('Success', res, 'success');
        this.saving = false;
      }).catch(err => {
        this.showToast('Error', err, 'danger');
        this.saving = false;

      });
    },
    showToast(headline, msg, variant) {
      this.$bvToast.toast(msg, {
        title: headline,
        autoHideDelay: 5000,
        appendToast: true,
        variant: variant,
        toaster: 'b-toaster-top-right',
        solid: true,
      });
    },

  },
  computed: {
    ...mapGetters({
      shop: 'getShop'
    })
    },
  created() {
    // this.FETCH_SHOP().then(shop => {
    //   this.shop = shop;
    // }).catch(err => {
    //   this.showToast('Error', err, 'danger');
    // });
  },
};
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 76px;
  height: 40px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: hsl(0, 0%, 60%);
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 32px;
  width: 32px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: hsl(207, 90%, 54%);
}

input:focus + .slider {
  box-shadow: 0 0 1px hsl(207, 90%, 54%);
}

input:checked + .slider:before {
  -webkit-transform: translateX(36px);
  -ms-transform: translateX(36px);
  transform: translateX(36px);
}

.slider.round {
  border-radius: 40px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
