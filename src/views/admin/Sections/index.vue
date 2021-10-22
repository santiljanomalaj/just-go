<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>
    <b-container class="mt--7" fluid>
      <b-row>
        <b-col>
          <light-table
            :sections="sections"
            @updateSection="updateSection"
            @deleteSection="deleteSection"
            @addSection="addSection"
          />
        </b-col>
      </b-row>
    </b-container>
    <modal ref="modal" :show="show" size="lg">
      <h2>{{modalMsg}}</h2>
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
  data() {
    return {
      sections: [],
      show: false,
      modalMsg: ''
    };
  },
  mixins: [ProductsData],

  methods: {
    ...mapActions([
      "ADD_SECTION",
      "FETCH_SECTIONS",
      "UPDATE_SECTION",
      "DELETE_SECTION",
    ]),
    deleteSection(data) {
      let count = 0;
      this.rawProducts.forEach((prod) => {
        if (prod.section === data.id) {
          count += 1;
        }
      });
    
      //checking if it has products or not
      this.show = true;
      if (count) {
        this.modalMsg = `You have ${count} products in this section! To delete this category you need to change those products section or delete them first.`;
      } else {
        this.modalMsg = "Do you want to delete this Section?";
      }

      this.$refs.modal.$refs["app-modal"].$once("hide", (bvEvt) => {
        this.show = false;
           if (count) return;
        if (bvEvt.trigger === "ok") {
          this.DELETE_SECTION(data)
            .then((res) => {
              this.showToast("Success", "Successfully Deleted", "success");
              let index = this.sections.findIndex((cat) => cat._id === data.id);
              this.sections.splice(index, 1);
            })
            .catch((err) => {
              this.showToast("Error", err, "danger");
            });
        }
      });
    },
    updateSection(data) {
      this.UPDATE_SECTION(data)
        .then((section) => {
          this.showToast("Success", "Successfully Updated", "success");
          let index = this.sections.findIndex(
            (cat) => cat._id === section._id
          );
          this.sections[index].name = section.name;
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
    addSection(data) {
      this.ADD_SECTION(data).then((section) => {
        this.sections.push(section);
         this.showToast("Success", "Successfully Created", "success");
        
      });
    },
  },
  created() {
    this.FETCH_SECTIONS().then((sections) => {
      this.sections = [...sections];
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
