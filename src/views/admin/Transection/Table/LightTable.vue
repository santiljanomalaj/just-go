<template>
  <b-card no-body>
    <b-container fluid>
      <b-row class="mb-2">
        <!-- <b-col cols="12" md="5">
          <base-dropdown menuClasses="base-dropdown" title="Roles">
            <label
              v-for="role in roles"
              :key="role"
              class="d-block dropdown-item-label"
            >
              <li>
                <input
                  v-model="filter.roles"
                  :value="role"
                  type="checkbox"
                />{{ role }}
              </li>
            </label>
          </base-dropdown>
        </b-col> -->
        <b-col cols="12" md="5">
          <input
            placeholder="Search User"
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
      :data="productsPaged"
    >
      <el-table-column label="Order Id" min-width="200px" prop="referralCode">
        <template v-slot="{ row }">
          <span class="font-italic"> #{{ row._id.substr(18) }} </span>
        </template>
      </el-table-column>
      <el-table-column label="Total" prop="total" min-width="100px" />

      <el-table-column
        label="Transaction Id"
        min-width="130px"
        prop="transactionId"
      />

      <!-- <el-table-column label="credit" min-width="100px" prop="credit" /> -->

      <el-table-column label="Actions" prop="id" min-width="310px">
        <template v-slot="{ row }">
          <div class="d-flex justify-content-between align-items-center">
            <b-button
              v-if="row.transactionId !== 'FREE'"
              variant="info btn-sm"
              :disabled="loading"
              @click="showDetails(row.transactionId)"
            >
              <b-icon
                v-if="loading"
                animation="spin"
                class="spin-icon"
                font-scale="1.8"
                icon="arrow-clockwise"
              ></b-icon>
              Show Details</b-button
            >
            <span class="font-italic" v-else> Free </span>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <b-card-footer class="py-4 d-flex justify-content-end">
      <base-pagination
        v-model="currentPage"
        @change="(val) => (currentPage = val)"
        :per-page="perpage"
        :total="searchProducts.length"
      ></base-pagination>
    </b-card-footer>
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
  props: {
    orders: Array,
    loading: Boolean,
  },
  data() {
    return {
      currentPage: 1,
      perpage: 10,
      filter: {
        users: [],
        roles: [],
        search: "",
      },
    };
  },
  computed: {
    domainLink() {
      return window.location.origin;
    },
    productsPaged() {
      return this.searchProducts.slice(
        (this.currentPage - 1) * this.perpage,
        this.perpage * this.currentPage
      );
    },
    searchProducts() {
      if (this.filter.search.length === 0) return this.orders;
      return this.filteredRoles.filter((order) => {
        return order._id
          .substr(18)
          .toLowerCase()
          .includes(this.filter.search.toLowerCase());
      });
    },
  },
  methods: {
    showDetails(id) {
      this.$emit("showDetails", id);
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