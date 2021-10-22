<template>
  <base-dialog
    title="My Account"
    :visible="dialogVisible"
    @dialogToggle="dialogToggle"
  >
    <profile-detail @dialogToggle="dialogToggle"></profile-detail>
  </base-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BaseDialog from "@/components/BaseDialog";
import ProfileDetail from "./ProfileDetail";

export default {
  name: "profile-dialog",
  components: {
    BaseDialog,
    ProfileDetail
  },
  props: {
    dialogVisible: Boolean
  },
  methods: {
    dialogToggle(val) {
      this.$emit('dialogToggle', val);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>