<template>
  <modal ref="riders" :show="show" size="lg" @close="$emit('close')">
    <ul>
      <li
        v-for="rider in riders"
        :class="{ selected: selected === rider._id }"
        :key="rider._id"
        @click="selectRider(rider._id)"
      >
        {{ rider.fname }} {{ rider.sname }}
        <i class="bi bi-check2"></i>
      </li>
    </ul>
  </modal>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["show", "riders", "orderId"],
  data() {
    return {
      selected: "",
    };
  },
  methods: {
    ...mapActions(["ASSIGN_RIDER"]),

    selectRider(id) {
      this.selected = id;
      this.$refs["riders"].$refs["app-modal"].$once("hide", (bvEvt) => {
        if (bvEvt.trigger === "ok") {
          this.assignRider(id);
        }
        this.$emit("selectRider");
      });
    },
    assignRider(riderId) {
      this.ASSIGN_RIDER({ riderId: riderId, id: this.orderId })
        .then((res) => {
          this.showToast("Success", "Assigned to Rider", "success");
          this.$emit('assigned')
        })
        .catch((err) => {
          this.showToast("Er ror", "Something Went Wrong", "danger");
        });
    },
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
  },
  watch: {
    show() {
      this.selected = "";
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  padding: 0;
  li {
    padding: 12px;
    font-size: 1.2rem;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid #eee;
    &:first-child {
      border-top: 1px solid #eee;
    }
    i {
      display: none;
    }
    &.selected {
      background: #187b491c;
      i {
        display: block;
      }
    }
  }
}
</style>