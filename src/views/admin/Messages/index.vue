<template>
  <div>
    <base-header class="pb-7 pt-7 p bg-gradient-success">
      <!-- Card stats -->
      <h2 class="text-white text-center font-weight-bolder">Sms</h2>
    </base-header>
    <b-container>
      <b-row class="pt-4">
        <b-col v-for="sm in sms" :key="sm.status" class="my-2" cols="12">
          <label>{{ sm.status }}</label>
          <textarea v-model="sm.msg" class="form-control" :disabled="saving" rows="4"></textarea>
          <button class="btn btn-success mt-2 float-right" :disabled="saving" @click="updateMsg(sm.status)">Update</button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Messages',
  data () {
    return {
      sms: [],
      saving: false
    }
  },
  methods: {
    ...mapActions([
      'FETCH_SMS',
      'UPDATE_SMS',
    ]),
    updateMsg (status) {
      let sms = this.sms.find(sm => sm.status === status)
    this.saving = true
      this.UPDATE_SMS(sms).then(res => {
        this.showToast("Success", res, "success");
        this.saving = false
      }).catch(err => {
        this.showToast("Error", err, "danger");
        this.saving = false

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
  created () {
    this.FETCH_SMS().then(sms => {
      this.sms = sms
    }).catch(err => {
      this.showToast("Error", err, "danger");
    })
  },
}
</script>

<style scoped>

</style>
