<template>
  <b-card no-body>
    <b-card-header class="border-0 d-flex justify-content-between">
      <h3 class="mb-0">All Products</h3>
      <b-link class="btn btn-outline-success" to="/admin/products/add"
        >Add Product</b-link
      >
    </b-card-header>

    <b-container fluid>
      <b-row>
        <b-col cols="12" md="5">
          <base-dropdown menuClasses="base-dropdown" title="Categories">
            <label
              v-for="cat in categories"
              :key="cat._id"
              class="d-block dropdown-item-label"
            >
              <li>
                <input
                  v-model="filter.categories"
                  :value="cat._id"
                  type="checkbox"
                />{{ cat.name }}
              </li>
            </label>
          </base-dropdown>
        </b-col>
        <b-col cols="12" md="5">
          <input
            placeholder="Search products"
            type="text"
            v-model="filter.search"
            class="form-control"
          />
        </b-col>
        <b-col cols="12" md="2">
          <b-link href="/admin/products/arrange" class="btn btn-primary d-block">
          Arrange
          </b-link> </b-col>
      </b-row>
    </b-container>
    <el-table
      class="table-responsive table"
      header-row-class-name="thead-light"
      :data="productsPaged"
    >
      <el-table-column label="title" min-width="310px" prop="name">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <a href="#" class="avatar rounded-circle mr-3">
              <img alt="Image placeholder" :src="row.img" />
            </a>
            <b-media-body>
              <span class="font-weight-600 name mb-0 text-sm">{{
                row.title
              }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>
      <el-table-column label="price" prop="price" min-width="140px">
      </el-table-column>

      <el-table-column label="category" min-width="170px" prop="categories">
        <template v-slot="{ row }">
          <span v-for="item in row.categories" :key="item">
            {{ categoryName(item) }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="details" min-width="190px" prop="details">
      </el-table-column>

      <el-table-column label="Actions" prop="id" min-width="240px">
        <template v-slot="{ row }">
          <div class="d-flex align-items-center">
            <b-link class="btn btn-info" :to="`/admin/products/${row._id}/edit`"
              >Edit</b-link
            >
            <b-button
              variant="danger"
              @click="$emit('deleteProduct', { id: row._id, img: row.img })"
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
    products: {
      type: Array,
    },
    categories: Array,
  },
  data() {
    return {
      currentPage: 1,
      perpage: 10,
      filter: {
        categories: [],
        search: "",
      },
    };
  },
  computed: {
    productsPaged() {
      return this.searchProducts.slice(
        (this.currentPage - 1) * this.perpage,
        this.perpage * this.currentPage
      );
    },
    searchProducts() {
      if (this.filter.search.length === 0) return this.filteredProducts;
      return this.filteredProducts.filter((prod) => {
        return prod.title
          .toLowerCase()
          .includes(this.filter.search.toLowerCase());
      });
    },

    filteredProducts() {
      if (this.filter.categories.length === 0) return this.products;
      return this.products.filter((prod) => {
        for (let index = 0; index < prod.categories.length; index++) {
          const cat = prod.categories[index];

          if (this.filter.categories.includes(cat)) {
            return this.filter.categories.includes(cat);
          }
        }

        return false;
      });
    },
  },
  methods: {
    categoryName(id) {
      return this.categories.find((item) => item._id === id).name;
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