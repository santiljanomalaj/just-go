<template>
  <div>
    <base-header class="pb-4 pt-2 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <h2 class="text-white text-center font-weight-bolder">
        Arrange Products
      </h2>
    </base-header>
    <b-container class="mt-2" fluid>
      <b-row>
        <b-col cols="12" md="6" class="pb-3">
          <h4>Select Category: {{ categoryName }}</h4>
        </b-col>
        <b-col cols="12" md="6" class="pb-3">
          <base-dropdown
            menuClasses="base-dropdown"
            titleClasses="bg-primary text-white"
            title="Select Category"
          >
            <label
              v-for="cat in categories"
              :key="cat._id"
              class="d-block dropdown-item-label"
            >
              <li>
                <input v-model="category" :value="cat._id" type="radio" />{{
                  cat.name
                }}
              </li>
            </label>
          </base-dropdown>
        </b-col>

        <b-col>
          <draggable
            class="prods"
            tag="ul"
            v-model="categoryProducts"
            v-bind="dragOptions"
            @start="drag = true"
            @end="drag = false"
          >
            <transition-group
              type="transition"
              :name="!drag ? 'flip-list' : null"
            >
              <li v-for="prod in categoryProducts" :key="prod._id">
                <img :src="prod.img" alt="" />
                <h4>{{ prod.title }}</h4>
              </li>
            </transition-group>
          </draggable>
          <b-button :disabled="saving" variant="success" @click="updateOrder"> Update</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import draggable from "vuedraggable";

import { mapActions, mapGetters } from "vuex";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Table,
  TableColumn,
} from "element-ui";

export default {
  components: {
    draggable,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      products: [],
      show: false,
      category: "",
      drag: false,
      categoryProducts: [],
      saving: false,
    };
  },
  methods: {
    ...mapActions(["FETCH_PRODUCTS", "ARRANGE_PRODUCTS"]),
    setCategoryProds() {
      if (this.category === "") this.category = this.categories[0]._id;
      let prods = this.products.filter((prod) => {
        return prod.categories.includes(this.category);
      });
      this.categoryProducts = this.sortCategoryProduct(prods);
    },
    updateOrder() {
      let data = {};
      this.categoryProducts.forEach((prod, index) => {
        data[prod._id] = index + 1;
      });
      this.saving = true;
      this.ARRANGE_PRODUCTS(data)
        .then((res) => {
          this.saving = false;
          this.$router.push("/admin/products");
          this.showToast("Success", res, "success");
        })
        .catch((err) => {
          this.saving = false;

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
  },
  computed: {
    ...mapGetters({
      categories: "getCategories",
    }),
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
    categoryName() {
      return this.category !== ""
        ? this.categories.find((cat) => cat._id === this.category).name
        : "";
    },
  },
  created() {
    this.FETCH_PRODUCTS().then((prods) => {
      this.products = [...prods];
      this.category = this.categories[0]._id;
    });
  },
  watch: {
    category() {
      this.setCategoryProds();
    },
  },
};
</script>
<style lang="scss" scoped>
.prods {
  list-style-type: none;
  padding: 0;
  li {
    padding: 1rem;
    outline: 1px solid #ddd;
    cursor: move;
    display: flex;
    align-items: center;
    column-gap: 20px;
    img {
      max-height: 30px;
    }
  }
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
