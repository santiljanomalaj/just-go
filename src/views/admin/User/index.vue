<template>
  <div>
    <base-header class="pb-7 pt-7 p bg-gradient-success">
      <!-- Card stats -->
      <h2 class="text-white text-center font-weight-bolder">Users</h2>
    </base-header>
    <b-container fluid>
      <b-row class="pt-4">
        <b-col cols="12">
          <light-table :roles="roles" :users="users" :loading="saving" @changeRole="changeRole" />
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
    ...mapActions(["FETCH_USERS", "CHANGE_ROLE"]),

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
    changeRole(data) {
      this.saving = true;
      this.CHANGE_ROLE(data).then((res) => {
        this.saving = false;
        this.showToast("Success", "Updated", "success");
        this.users.find(user => user._id===res._id).role = res.role
      }).catch(err=>{
         this.saving = false;
        this.showToast("Error", "Something went wrong", "danger");
      })
    },
  },
  created() {
    this.FETCH_USERS()
      .then((data) => {
        this.users = data.users;
        this.roles = data.roles

      })
      .catch((err) => {
        this.showToast("Error", err, "danger");
      });
  },
};
</script>

<style scoped>
</style>
