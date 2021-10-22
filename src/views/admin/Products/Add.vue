<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <h2 class="text-white text-center font-weight-bolder">Add Product</h2>
    </base-header>
    <b-container class="pb-5">
      <b-row class="justify-content-center">
        <b-col lg="8" md="10">
          <b-card class="bg-secondary border-0 mb-0" no-body>
            <b-card-body class="px-lg-5 py-lg-5">
          
              <b-form role="form" @submit.prevent>
                <base-input
                  v-model="product.title"
                  alternative
                  class="mb-0"
                  label="Product Title*"
                  name="title"
                  placeholder="Title"
                >
                </base-input>
                <div
                  v-if="errors.title"
                  class="invalid-feedback"
                  style="display: block"
                >
                  {{ errors.title }}
                </div>

                <base-input
                  v-model="product.keyword"
                  alternative
                  class="mb-0"
                  label="Product Keyword"
                  name="keyword"
                  placeholder="Keyword"
                >
                </base-input>

                <base-input
                  v-model="product.price"
                  alternative
                  class="mt-3"
                  label="Price*"
                  name="price"
                  placeholder="Price"
                  type="number"
                >
                </base-input>
                <div
                  v-if="errors.price"
                  class="invalid-feedback"
                  style="display: block"
                >
                  {{ errors.price }}
                </div>

                <base-input
                  v-model="product.salePrice"
                  alternative
                  class="mt-3"
                  label="Sale Price"
                  name="salePrice"
                  placeholder="SalePrice"
                  type="number"
                >
                </base-input>

                <base-input
                  v-model="product.details"
                  alternative
                  class="mb-3"
                  label="Details"
                  name="details"
                  placeholder="Details"
                  type="text"
                >
                </base-input>

                <label class="form-control-label mt-3"
                  >Product Categories*</label
                >

                <base-dropdown class="" title="Categories">
                  <label
                    v-for="cat in categories"
                    :key="cat._id"
                    class="d-block dropdown-item-label"
                  >
                    <li>
                      <input
                        v-model="product.categories"
                        :value="cat._id"
                        type="checkbox"
                      />{{ cat.name }}
                    </li>
                  </label>
                </base-dropdown>
                <div
                  v-if="errors.categories"
                  class="invalid-feedback"
                  style="display: block"
                >
                  {{ errors.categories }}
                </div>

                <label class="form-control-label mt-3">Featured Section</label>
                <base-radio
                  v-for="sec in sections"
                  :key="sec._id"
                  :value="sec._id"
                  v-model="product.section"
                  :name="sec._id"
                  >{{ sec.name }}</base-radio
                >
                <base-radio
                  v-if="editPage"
                  value=""
                  v-model="product.section"
                  name=""
                  >No Section</base-radio
                >
                <p v-if="!sections.length">No Featured Section</p>
                <label class="form-control-label mt-3">Product Image*</label>
                <b-form-file
                  v-model="product.img"
                  class="mb-3"
                  drop-placeholder="Drop file here..."
                  placeholder="Choose a file or drop it here..."
                ></b-form-file>
                <div
                  v-if="errors.img"
                  class="invalid-feedback"
                  style="display: block"
                >
                  {{ errors.img }}
                </div>
                <div v-if="editPage && imgUrl" class="image-preview">
                  <img :src="imgUrl" alt="" />
                </div>

                <div class="text-center">
                  <base-button
                    v-if="!editPage"
                    :disabled="submitting"
                    class="my-4"
                    native-type="submit"
                    type="primary"
                    @click="onSubmit"
                  >
                    <b-icon
                      v-if="submitting"
                      animation="spin"
                      class="spin-icon"
                      font-scale="1.8"
                      icon="arrow-clockwise"
                    ></b-icon>
                    Add
                  </base-button>
                  <base-button
                    v-else
                    :disabled="submitting"
                    class="my-4"
                    native-type="submit"
                    type="primary"
                    @click="updateProduct"
                  >
                    <b-icon
                      v-if="submitting"
                      animation="spin"
                      class="spin-icon"
                      font-scale="1.8"
                      icon="arrow-clockwise"
                    ></b-icon>
                    Update
                  </base-button>
                </div>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { BToast } from "bootstrap-vue";

export default {
  name: "AddProduct",
  data() {
    return {
      // categories:["Grocery","Health","Chips","Snacks","Energy","Drinks","Candy","Sweets","Icecream","Ready to eat","Bath & Body","Personal Care","Student Essentials","Vapes","Home Cleaning","Electronics"],
      submitting: false,
      product: {
        title: "",
        price: "",
        categories: [],
        img: [],
        details: "",
        section: "",
        salePrice: "",
        keyword: ""
      },
      sections: [],
      imgUrl: "",
      errors: {
        title: "",
        price: "",
        categories: "",
        img: "",
      },
      rules: {
        title: { required: true },
        price: { required: true },
        categories: { required: true },
        img: { required: true },
      },
      imageSelected: false,
    };
  },
  components: {
    BToast,
  },
  methods: {
    ...mapActions([
      "POST_PRODUCT",
      "FETCH_PRODUCT",
      "UPDATE_PRODUCT",
      "UPLOAD_IMAGE",
      "FETCH_SECTIONS",
    ]),
    validateProduct() {
      this.errors = {};
      for (let key in this.errors) {
        this.errors[key] = "";
      }

      for (let key in this.rules) {
        if (this.rules[key].required && this.product[key].length === 0) {
          this.errors[key] = `${key} is required! `;
        }
      }
      if (Object.keys(this.errors).length) return false;
      return true;
    },
    onSubmit() {
      if (this.validateProduct()) {
        this.submitting = true;
        console.log(this.product)
        this.POST_PRODUCT(this.product)
          .then((res) => {
            this.submitting = false;
            this.showToast("Success", res, "success");
            this.$router.push("/admin/products");
          })
          .catch((err) => {
            this.submitting = false;
            this.showToast("Error", err, "danger");
          });
      }
    },
    updateProduct() {
      this.submitting = false;
      this.rules.img.required = false;

      if (this.validateProduct()) {
        this.rules.img.required = true;
        if (!this.product.img.name) {
          this.submitting = true;

          this.UPDATE_PRODUCT({
            ...this.product,
            img: this.imgUrl,
            id: this.$route.params.id,
          })
            .then((res) => {
              this.submitting = false;
              this.showToast("Success", res, "success");
              this.$router.push("/admin/products");
            })
            .catch((err) => {
              this.submitting = false;
              this.showToast("Error", err, "danger");
            });
        } else {
          this.submitting = true;

          this.UPLOAD_IMAGE({
            img: this.product.img,
            oldImage: this.imgUrl,
          }).then((imgUrl) => {
            this.imgUrl = imgUrl;
            this.product.img = [];
            this.updateProduct();
          });
        }
      }
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
  watch: {},
  created() {
    if (this.editPage) {
      let id = this.$route.params.id;
      this.FETCH_PRODUCT(id)
        .then((prod) => {
          this.product = { ...prod, img: [] };
          this.imgUrl = prod.img;
        })
        .catch((err) => {});
    }
    this.FETCH_SECTIONS().then((sections) => {
      this.sections = [...sections];
    });
  },
  computed: {
    editPage() {
      return this.$route.path.includes("edit");
    },
    ...mapGetters({
      categories: "getCategories",
    }),
  },
};
</script>

<style scoped>
.dropdown-item-label {
  cursor: pointer;
}

.invalid-feedback {
  text-transform: capitalize;
}

.image-preview img {
  max-width: 200px;
  margin: 0 auto;
  display: block;
  border: 2px solid #000;
  padding: 6px;
}
</style>
