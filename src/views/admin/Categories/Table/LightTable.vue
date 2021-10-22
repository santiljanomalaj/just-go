<template>
  <b-card no-body>
    <b-card-header class="border-0 d-flex justify-content-between">
      <h3 class="mb-0">All Categories</h3>
    </b-card-header>

    <b-container fluid>
      <b-row class="mb-2">
        <b-col cols="12" md="6">
          <input
            type="text"
            placeholder="Enter category name"
            class="form-control"
            v-model="name"
          />
          <span class="err">{{ errors.name }} </span>
        </b-col>
        <b-col cols="12" md="1">
          <input class="form-control" v-model="bg" type="color" name="" id="" />
        </b-col>
        <b-col cols="12" md="3">
          <b-form-file
            v-model="icon"
            class="mb-3"
            drop-placeholder="Drop file here..."
            placeholder="Choose or drop it here..."
          ></b-form-file>
          <span class="err">{{ errors.icon }} </span>
        </b-col>
        <b-col cols="12" md="2">
          <b-button variant="success ml-auto" @click="addCategory"
            >Add Catergoty</b-button
          >
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" md="5">
          <input
            placeholder="Search products"
            type="text"
            v-model="filter.search"
            class="form-control"
          />
        </b-col>
      </b-row>
    </b-container>
    <el-table
      class="table-responsive table"
      header-row-class-name="thead-light"
      :data="categoriesPaged"
    >
      <el-table-column label="name" prop="name" min-width="140px">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <a href="#" class="avatar rounded-circle mr-3">
              <img alt="Image placeholder" :src="row.icon" />
            </a>
            <b-media-body>
              <span class="font-weight-600 name mb-0 text-sm"
                >{{ row.name }}
              </span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>

      <el-table-column label="name" prop="name" min-width="140px">
        <template v-slot="{ row }">
          <div class="h-100 w-100" :style="{ background: row.bg }">
            {{ row.bg }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Actions" prop="id" min-width="240px">
        <template v-slot="{ row }">
          <div class="d-flex align-items-center">
            <b-button class="btn btn-info" @click="editCategory(row)"
              >Edit</b-button
            >
            <b-button
              variant="danger"
              @click="$emit('deleteCategory', { id: row._id, icon: row.icon })"
              >Delete</b-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <b-card-footer class="py-4 d-flex justify-content-end">
      <base-pagination
        v-model="currentPage"
        @change="(val) => (currentPage = val)"
        :per-page="perpage"
        :total="searchCategories.length"
      ></base-pagination>
    </b-card-footer>

    <!-- Edit Category modal -->
    <modal ref="edit" :show="!!editId" size="sm">
      <h2>Name</h2>
      <input v-model="editName" type="text" class="form-control mb-2" />
      <input
        v-model="editBg"
        type="color"
        name=""
        class="form-control mb-2"
        id=""
      />
      <label>Order Number</label>
      <input
        v-model="orderNumber"
        type="number"
        name=""
        class="form-control mb-2"
      />
      <label>Icon</label>
      <b-form-file
        v-model="editIcon"
        class="mb-3"
        drop-placeholder="Drop file here..."
        placeholder="Choose a file or drop it here..."
      ></b-form-file>
    </modal>
  </b-card>
</template>
<script>
import { Table, TableColumn } from "element-ui";
import { mapActions } from "vuex";
export default {
  name: "light-table",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      errors: {
        name: "",
        icon: "",
      },
      currentPage: 1,
      perpage: 10,
      editId: undefined,
      editName: "",
      editBg: "",
      name: "",
      bg: "",
      icon: [],
      editIcon: [],
      filter: {
        categories: [],
        search: "",
      },
      orderNumber: 1,
    };
  },
  props: {
    categories: {
      type: Array,
    },
  },
  methods: {
    ...mapActions(["UPLOAD_IMAGE"]),
    editCategory(category) {
      this.editId = category._id;
      this.editName = category.name;
      this.editBg = category.bg;
      this.editIcon = category.icon;
      this.orderNumber = category.orderNumber;
      const oldUrl = category.icon;
      this.$refs.edit.$refs["app-modal"].$once("hide", (bvEvt) => {
        this.editId = undefined;

        if (bvEvt.trigger === "ok") {
          this.submitting = true;
          if (!this.editIcon.name) {
            this.$emit("updateCategory", {
              id: category._id,
              name: this.editName,
              bg: this.editBg,
              icon: this.editIcon,
              orderNumber: this.orderNumber
            });
            this.editName = "";
          } else {
            this.UPLOAD_IMAGE({
              img: this.editIcon,
              oldImage: oldUrl,
            }).then((imgUrl) => {
              this.editIcon = [];
              this.$emit("updateCategory", {
                id: category._id,
                name: this.editName,
                bg: this.editBg,
                icon: imgUrl,
                orderNumber: this.orderNumber
              });
              this.editName = "";
            });
          }
        } else {
          this.editName = "";
        }
      });
    },
    addCategory() {
      this.errors = {};
      if (!this.name.trim()) {
        this.errors.name = "Please enter category name!";
      }
      if (!this.icon.name) {
        this.errors.icon = "Please enter category name!";
      }
      if (Object.keys(this.errors).length) return;
      this.$emit("addCategory", {
        name: this.name,
        bg: this.bg,
        img: this.icon,
        orderNumber: this.orderNumber
      });
      this.name = "";
      this.icon = [];
    },
  },

  computed: {
    categoriesPaged() {
      return this.searchCategories.slice(
        (this.currentPage - 1) * this.perpage,
        this.perpage * this.currentPage
      );
    },
    searchCategories() {
      if (this.filter.search.length === 0) return this.categories;
      return this.categories.filter((prod) => {
        return prod.name
          .toLowerCase()
          .includes(this.filter.search.toLowerCase());
      });
    },
  },
};
</script>
<style >
.dropdown-item-label {
  cursor: pointer;
}
.base-dropdown {
  max-height: 200px;
  overflow-y: scroll;
}
/* width */
.base-dropdown::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.base-dropdown::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.base-dropdown::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.base-dropdown::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.form-control {
  width: 100%;
  color: #010101;
}
</style>