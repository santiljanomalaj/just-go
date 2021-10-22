import axios from 'axios'

const user = {
  state: () => ({

  }),
  mutations: {

  },
  actions: {
    UPDATE_SMS({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
        .put("/update-sms", {
          status: data.status, msg: data.msg
        })
        .then(res => {
          resolve(res.data.msg);

        })
        .catch(err => {
          reject(err.response.data.msg);
        });
      });
    },
    FETCH_SMS({commit}){
      return new Promise((resolve, reject) => {

        axios.get("/get-sms").then(res => {
          resolve(res.data.sms);
        }).catch(err => {
          reject(err.response.data.msg);
        });
      })
    }
  },
  getters: {

  }
}

export default user
