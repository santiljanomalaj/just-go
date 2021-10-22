import axios from "axios";

const user = {
  state: () => ({
    users: []
  }),
  mutations: {
    SAVE_USERS(state, users) {
      state.users = users;
    }
  },
  actions: {
    SAVE_USER({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/save-user", {
            fname: data.fname,
            sname: data.sname
          })
          .then(res => {
            commit("SAVE_USER", res.data.user);

            resolve(res);
          })
          .catch(err => {
            reject(err.response.data.msg);
          });
      });
    },
    FETCH_USER({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get("/get-user")
          .then(res => {
            commit("SAVE_USER", res.data.user);
            resolve(res.data.user);
          })
          .catch(err => {
            reject(err.response.data.msg);
          });
      });
    },
    FETCH_USERS({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get("/get-users")
          .then(res => {
            resolve({
              users: res.data.users,
              roles: res.data.roles
            });
            commit("SAVE_USERS", res.data.users);
          })
          .catch(err => {
            reject(err.response.data.msg); //
          });
      });
    },
    CHANGE_ROLE({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .put("/change-role", {
            id: data.id,
            role: data.role
          })
          .then(res => {
            resolve(res.data.user);
          })
          .catch(err => {
            reject(err.response.data.msg); //
          });
      });
    }
  },
  getters: {
    getUsers: state=> state.users,
    getRiders: state=>{
      return state.users.filter(user => user.role==='rider')
    }
  }
};

export default user;
