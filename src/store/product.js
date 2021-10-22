import axios from 'axios'
import firebase from '../firbase'

const user = {
  state: () => ({
    allProducts: {},
    products: [],
  }),
  mutations: {
    SAVE_PRODUCTS(state, products ) {
      state.products = products;
      //SAVING PRODUCTS BY CATEGORIES
      let allProducts = {};
      this.getters.getCategories.forEach(cat => {
        products.forEach(product => {
          if (product.categories.includes(cat._id)) {
            if (!allProducts[cat._id]) {
              allProducts[cat._id] = { category: cat.name, image: cat.icon, products: [] };
            }
            allProducts[cat._id].products.push(product);
          }
        });
      });
      state.allProducts = { ...allProducts };
    },
  },
  actions: {
    POST_PRODUCT({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        dispatch("UPLOAD_IMAGE", { img: data.img })
        .then(imgUrl => {
          axios
          .post("/add-product", {
            title: data.title,
            price: data.price,
            salePrice: data.salePrice,
            categories: data.categories,
            details: data.details,
            section: data.section,
            keyword: data.keyword,
            img: imgUrl
          })
          .then(() => {
            resolve("Product successfully created!");
          })
          .catch(error => {
            reject("Error creating the product!");
          });
        })
        .catch(err => {
          reject(err);
        });
      });
    },
    UPDATE_PRODUCT({ commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        axios
        .post("/update-product", {
          id: data.id,
          title: data.title,
          price: data.price,
          categories: data.categories,
          details: data.details,
          img: data.img,
          section: data.section,
          salePrice: data.salePrice,
          keyword: data.keyword
        })
        .then(() => {
          resolve("Product successfully created!");
        })
        .catch(error => {
          reject("Error creating the product!");
        });
      });
    },
    FETCH_PRODUCTS({ commit }) {
      return new Promise(async (resolve, reject) => {
        axios
        .get("/get-products")
        .then(res => {
          const products = res.data.products;
          commit("SAVE_PRODUCTS", products);
          resolve(products);
        })
        .catch(err => {
        });
      });
    },
    FETCH_PRODUCT({ commit }, id) {
      return new Promise(async (resolve, reject) => {
        axios
        .get("/get-products/" + id)
        .then(res => {
          resolve(res.data.product);
        })
        .catch(err => {
          reject("Unable to find the product with this ID!");
        });
      });
    },
    DELETE_PRODUCT({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        axios
        .delete("/delete-product/" + data.id)
        .then(() => {
          resolve("Document successfully deleted.");
          dispatch("DELETE_IMAGE", data.img);
        })
        .catch(() => {
          reject("Unable to find the product with this ID!");
        });
      });
    },
    UPLOAD_IMAGE(context, data) {
      let file = data.img;

      return new Promise((resolve, reject) => {
        const storageRef = firebase
        .storage()
        .ref(
          "products/" +
          1000 +
          new Date().getTime() +
          file.name.split(".").pop()
        )
        .put(file);
        storageRef.on(
          "state_changed",
          snapshot => {},
          err => {
            reject(err.response.data.msg);
          },
          () => {
            storageRef.snapshot.ref.getDownloadURL().then(url => {
              resolve(url);
              if (data.oldImage)
                context.dispatch("DELETE_IMAGE", data.oldImage);
            });
          }
        );
      });
    },
    DELETE_IMAGE({ commit }, url) {
      return new Promise((resolve, reject) => {
        const storageRef = firebase.storage().refFromURL(url);

        // Delete the file
        storageRef
        .delete()
        .then(() => {})
        .catch(error => {
        });
      });
    },
    ARRANGE_PRODUCTS({commit}, data){
      return new Promise((resolve, reject) => {
        axios
        .post("/arrange-products", {
          order: data
        })
        .then((res) => {
          resolve("Products successfully arranges!");
        })
        .catch(error => {
          reject("Error arranging the products!");
        });
      });
    }
  },
  getters: {
    getProducts: state => state.allProducts,
    getRawProducts: state => state.products,
    getSectionProducts: (state, getters, rootState, rootGetters) => {
      let sections = {};
      let allSections = rootState.section.sections || []
      allSections.forEach(section => {
        state.products.forEach(prod => {
          if (prod.section === section._id) {
            if (!sections[section._id]) {
              sections[section._id] = {
                category: section.name,
                products: []
              };
            }
            sections[section._id].products.unshift(prod);
          }
        });
      });
      return sections;
    }

  }
}

export default user
