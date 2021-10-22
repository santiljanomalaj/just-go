<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :before-close="beforeClose"
  >
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  name: "base-dialog",
  props: {
    visible: Boolean,
    title: String
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible = val;
    }
  },
  methods: {
    beforeClose(done) {
      this.$emit("dialogToggle", false);
      done();
    }
  }
}
</script>