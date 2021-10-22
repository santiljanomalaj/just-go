<template>
  <div>
    <base-header class="pb-7 pt-7 p bg-gradient-success">
      <!-- Card stats -->
      <h2 class="text-white text-center font-weight-bolder">Riders</h2>
    </base-header>
    <b-container fluid>
      <b-row class="pt-4">
        <b-col cols="12">
          <light-table :roles="roles" :users="users" :loading="saving" @clearTip="clearTip" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import LightTable from "./Table/LightTable";

export default {
  name: "Users",
  data() {
    return {
      users: [],
      roles: [],
      saving: false,
    };
  },
  components: {
    LightTable,
  },
  methods: {
    ...mapActions(["FETCH_USERS",'FETCH_ORDERS', 'CLEAR_RIDER_TIP' ]),

    showToast(headline, msg, variant) {
      this.$bvToast.toast(msg, {
        title: headline,
        autoHideDelay: 5000,
        appendToast: true,
        variant: variant,
        toaster: "b-toaster-top-right",
        solid: true,
      });
    },
    clearTip(id) {
      this.saving = true;
      this.CLEAR_RIDER_TIP(id).then((res) => {
        this.saving = false;
        this.showToast("Success", res.msg, "success");
        this.users.find(user => user._id===id).clearedTip = res.user.clearedTip
      }).catch(err=>{
         this.saving = false;
        this.showToast("Error", "Something went wrong", "danger");
      })
    },
  },
  created() {
    this.FETCH_USERS()
      .then((data) => {
        this.users = data.users.filter(user=>user.role==='rider');
        this.roles = data.roles

      })
      .catch((err) => {
        this.showToast("Error", err, "danger");
      });
      this.FETCH_ORDERS()
  },
};
</script>

<style scoped>
</style>
