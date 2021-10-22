<template>
  <b-card no-body>
    <b-card-header class="border-0 d-flex justify-content-between">
      <h3 class="mb-0">All Users</h3>
      <!-- <b-link class="btn btn-outline-success" to="/admin/products/add"
        >Add Product</b-link
      > -->
    </b-card-header>

    <b-container fluid>
      <b-row class="mb-2">
           <b-col cols="12" md="5">
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
        </b-col>
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
      <el-table-column label="F. Name" min-width="100px" prop="fname" />

      <el-table-column label="L. Name" prop="sname" min-width="100px" />

      <el-table-column label="phone" min-width="130px" prop="phone" />

      <el-table-column label="credit" min-width="100px" prop="credit" />

      <el-table-column
        label="referralCode"
        min-width="200px"
        prop="referralCode"
      >
        <template v-slot="{ row }">
          <a
            :href="domainLink + '/login?referral=' + row.referralCode"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ domainLink }}/login?referral= {{ row.referralCode }}</a
          >
        </template>
      </el-table-column>

      <el-table-column label="Role" min-width="100px" prop="role" />

      <el-table-column label="Actions" prop="id" min-width="310px">
        <template v-slot="{ row }">
          <div class="d-flex justify-content-between align-items-center">
            <b-button
              v-if="row.role !== 'user'"
              variant="info"
              :disabled="loading"
              @click="changeRole(row._id, 'user')"
            >
              <b-icon
                v-if="loading"
                animation="spin"
                class="spin-icon"
                font-scale="1.8"
                icon="arrow-clockwise"
              ></b-icon>
              <i v-else class="bi bi-person-fill"></i> Make User</b-button
            >
            <b-button
              :disabled="loading"
              v-if="row.role !== 'rider'"
              variant="success"
              @click="changeRole(row._id, 'rider')"
            >
              <b-icon
                v-if="loading"
                animation="spin"
                class="spin-icon"
                font-scale="1.8"
                icon="arrow-clockwise"
              ></b-icon>
              <i v-else class="bi bi-bicycle"></i> Make Rider</b-button
            >
            <b-button
              :disabled="loading"
              v-if="row.role !== 'admin'"
              variant="primary"
              @click="changeRole(row._id, 'admin')"
            >
              <b-icon
                v-if="loading"
                animation="spin"
                class="spin-icon"
                font-scale="1.8"
                icon="arrow-clockwise"
              ></b-icon>
              <i v-else class="bi bi-person-check-fill"></i> Make
              Admin</b-button
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
    users: Array,
    loading: Boolean,
    roles: Array,
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
      if (this.filter.search.length === 0) return this.filteredRoles;
      return this.filteredRoles.filter((user) => {
        return (user.fname + " " + user.sname)
          .toLowerCase()
          .includes(this.filter.search.toLowerCase());
      });
    },
     filteredRoles() {
      if (this.filter.roles.length === 0) return this.users;
      return this.users.filter((user) => {
       
          
          if (this.filter.roles.includes(user.role)) return true
        

        return false;
      });
    },
  },
  methods: {
    changeRole(id, role) {
      this.$emit("changeRole", {
        id: id,
        role: role,
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