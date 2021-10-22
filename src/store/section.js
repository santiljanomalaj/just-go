import axios from 'axios'

const user = {
  state: () => ({
    sections: [],
  }),
  mutations: {
    SAVE_SECTIONS(state, sections) {
      state.sections = sections;
    },
    ADD_NEW_SECTOIN(state, section) {
      state.sections.push(section);
    }
  },
  actions: {
    ADD_SECTION({ commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        axios
        .post("/add-section", {
          name: data.name
        })
        .then(res => {
          commit("ADD_NEW_SECTOIN", res.data.section);
          resolve(res.data.section);
        })
        .catch(err => {
          reject(err.response.data.msg);
        });
      });
    },
    FETCH_SECTIONS({ commit }) {
      return new Promise((resolve, reject) => {
        axios
        .get("/get-sections")
        .then(res => {
          resolve(res.data.sections);
          commit("SAVE_SECTIONS", res.data.sections);
        })
        .catch(err => {
          reject(err.response.data.msg);
        });
      });
    },
    UPDATE_SECTION({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
        .post("/update-section", {
          name: data.name,
          id: data.id
        })
        .then(res => {
          resolve(res.data.section);
        })
        .catch(err => {
          reject(err.response.data.msg);
        });
      });
    },
    DELETE_SECTION({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        axios
        .delete("/delete-section/" + data.id)
        .then(res => {
          resolve(res.data.msg);
        })
        .catch(err => {
          reject(err.response.data.msg);
        });
      });
    },
  },
  getters: {
    getSections: state => state.sections,
  }
}

export default user
