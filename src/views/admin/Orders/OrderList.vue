<template>
  <div class="order-list">
    <ListItem
      v-for="order in orders"
      :key="order._id"
      :order="order"
      @showOrderDetails="showDetails"
    />
  </div>
</template>

<script>
import ListItem from "./ListItem.vue";
export default {
  props: ["orders"],
  data() {
    return {};
  },
  components: {
    ListItem,
  },
  methods: {
    showDetails(order) {
      this.$emit("showOrderDetails", order);
    },
  },
};
</script>

<style  lang="scss">
.order-list {
}
</style>