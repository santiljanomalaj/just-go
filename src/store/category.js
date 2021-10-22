import axios from 'axios'

const user = {
  state: () => ({
    categories: [],
  }),
  mutations: {
    ADD_NEW_CATEGORY(state, category) {
      state.categories.push(category);
    },
    SAVE_CATEGORIES(state, categories) {
      state.categories = categories;
    }
  },
  actions: {
    ADD_CATEGORY({ commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        dispatch("UPLOAD_IMAGE", { img: data.img })
        .then(imgUrl => {
          axios
          .post("/add-category", {
            name: data.name,
            bg: data.bg,
            icon: imgUrl,
          })
          .then(res => {
            commit("ADD_NEW_CATEGORY", res.data.category);
            resolve(res.data.category);
          })
          .catch(err => {
            reject(err.response.data.msg);
          });
        })
        .catch(err => {
          reject(err.response.data.msg);
        });
      });
    },
    FETCH_CATEGORIES({ commit }) {
      return new Promise((resolve, reject) => {
        axios
        .get("/get-categories")
        .then(res => {
          resolve(res.data.categories);
          commit("SAVE_CATEGORIES", res.data.categories);
        })
        .catch(err => {
          reject(err.response.data.msg);
        });
      });
    },
    UPDATE_CATEGORY({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
        .post("/update-category", {
          name: data.name,
          id: data.id,
          bg: data.bg,
          icon: data.icon,
          orderNumber: data.orderNumber
        })
        .then(res => {
          resolve(res.data.category);
        })
        .catch(err => {
          reject(err.response.data.msg);
        });
      });
    },
    DELETE_CATEGORY({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        axios
        .delete("/delete-category/" + data.id)
        .then(res => {
          dispatch("DELETE_IMAGE", data.icon);
          resolve(res.data.msg);
        })
        .catch(err => {
          reject(err.response.data.msg);
        });
      });
    },
  },
  getters: {
    getCategories: state => state.categories,
  }
}

export default user
