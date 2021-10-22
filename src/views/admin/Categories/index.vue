<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>
    <b-container class="mt--7" fluid>
      <b-row>
        <b-col>
          <light-table
            :categories="categories"
            @updateCategory="updateCategory"
            @deleteCategory="deleteCategory"
            @addCategory="addCategory"
          />
        </b-col>
      </b-row>
    </b-container>
    <modal ref="modal" :show="show" size="lg">
      <h2>{{ modalMsg }}</h2>
    </modal>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import ProductsData from "@/mixins/ProductsData";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Table,
  TableColumn,
} from "element-ui";
import LightTable from "./Table/LightTable";
import BaseButton from "../../../components/BaseButton.vue";

export default {
  components: {
    LightTable,
    BaseButton,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  mixins: [ProductsData],

  data() {
    return {
      categories: [],
      show: false,
      modalMsg: "",
    };
  },
  methods: {
    ...mapActions([
      "ADD_CATEGORY",
      "FETCH_CATEGORIES",
      "UPDATE_CATEGORY",
      "DELETE_CATEGORY",
    ]),
    deleteCategory(data) {
      let count = 0;
      this.rawProducts.forEach((prod) => {
        if (prod.categories.includes(data.id)) {
          count += 1;
        }
      });
    
      //checking if it has products or not
      this.show = true;
      if (count) {
        this.modalMsg = `You have ${count} products in this category! To delete this category you need to change those products category or delete them first.`;
      } else {
        this.modalMsg = "Do you want to delete this category?";
      }

      this.$refs.modal.$refs["app-modal"].$once("hide", (bvEvt) => {
        this.show = false;
        if (count) return;
        if (bvEvt.trigger === "ok") {
          this.DELETE_CATEGORY(data)
            .then((res) => {
              this.showToast("Success", "Successfully Deleted", "success");
              let index = this.categories.findIndex(
                (cat) => cat._id === data.id
              );
              this.categories.splice(index, 1);
            })
            .catch((err) => {
              this.showToast("Error", err, "danger");
            });
        }
      });
    },
    updateCategory(data) {
      this.UPDATE_CATEGORY(data)
        .then((category) => {
          this.showToast("Success", "Successfully Updated", "success");
          let temp = this.categories;
          const swapItem = temp.find(item => item.orderNumber === category.orderNumber);
          const currentItem = temp.find(item => item._id === category._id);
          this.categories = [...(temp.map(item => {
            if (item.orderNumber === category.orderNumber) return category;
            else if (item.orderNumber === currentItem.orderNumber) return { ...swapItem, orderNumber: currentItem.orderNumber };
            return item;
          }))];
          // let index = this.categories.findIndex(
          //   (cat) => cat._id === category._id
          // );
          // this.categories[index].name = category.name;
        })
        .catch((err) => {
          this.showToast("Error", err, "danger");
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
    addCategory(data) {
      this.ADD_CATEGORY(data).then((category) => {
        this.categories.push(category);
        this.showToast("Success", "Successfully Created", "success");
      });
    },
  },
  created() {
    this.FETCH_CATEGORIES().then((categories) => {
      this.categories = [...categories];
    });
  },
};
</script>
<style>
.el-table.table-dark {
  background-color: #172b4d;
  color: #f8f9fe;
}

.el-table.table-dark th,
.el-table.table-dark tr {
  background-color: #172b4d;
}

.el-table.table-dark td,
.el-table.table-dark th.is-leaf {
  border-bottom: none;
}
</style>
