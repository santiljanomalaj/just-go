<template>
  <b-card no-body>
    <b-card-header class="border-0 d-flex justify-content-between">
      <h3 class="mb-0">All Sections</h3>
    </b-card-header>

    <b-container fluid>
      <b-row class="mb-2">
        <b-col cols="12" md="6">
          <input
            type="text"
            placeholder="Enter section name"
            class="form-control"
            v-model="name"
          />
          <span class="err">{{ errors.name }} </span>
        </b-col>

        <b-col cols="12" md="2">
          <b-button variant="success ml-auto" @click="addSection"
            >Add section</b-button
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
      :data="sectionsPaged"
    >
      <el-table-column label="name" prop="name" min-width="140px">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
          
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
            <b-button class="btn btn-info" @click="editSection(row)"
              >Edit</b-button
            >
            <b-button
              variant="danger"
              @click="$emit('deleteSection', { id: row._id, icon: row.icon })"
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
        :total="searchSections.length"
      ></base-pagination>
    </b-card-footer>

    <!-- Edit Section modal -->
    <modal ref="edit" :show="!!editId" size="sm">
      <h2>Name</h2>
      <input v-model="editName" type="text" class="form-control mb-2" />
      <span class="err"> {{ errors.editname }} </span>
    </modal>
  </b-card>
</template>
<script>
import { Table, TableColumn } from "element-ui";
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
      },
      currentPage: 1,
      perpage: 10,
      editId: undefined,
      editName: "",

      name: "",

      filter: {
        search: "",
      },
    };
  },
  props: {
    sections: {
      type: Array,
    },
  },
  methods: {
    editSection(section) {
      this.editId = section._id;
      this.editName = section.name;

      this.$refs.edit.$refs["app-modal"].$once("hide", (bvEvt) => {
        if (bvEvt.trigger === "cancel") {
          this.editId = undefined;
        }
        if (bvEvt.trigger === "ok") {
          
          this.errors = {};
          if (!this.editName.trim()) {
            this.errors.editname = "Please enter Section name!";
          }

          if (Object.keys(this.errors).length) {
            bvEvt.preventDefault();
            return;
          }
          this.editId = undefined;
          this.submitting = true;

          this.$emit("updateSection", {
            id: section._id,
            name: this.editName,
          });
        }
        this.editName = "";
      });
    },
    addSection() {
      this.errors = {};
      if (!this.name.trim()) {
        this.errors.name = "Please enter Section name!";
      }

      if (Object.keys(this.errors).length) return;
      this.$emit("addSection", {
        name: this.name,
        bg: this.bg,
        img: this.icon,
      });
      this.name = "";
      this.icon = [];
    },
  },

  computed: {
    sectionsPaged() {
      return this.searchSections.slice(
        (this.currentPage - 1) * this.perpage,
        this.perpage * this.currentPage
      );
    },
    searchSections() {
      if (this.filter.search.length === 0) return this.sections;
      return this.sections.filter((prod) => {
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