
   
import axios from 'axios'

const payment = {
  state: () => ({
    
  }),
  mutations: {
   
  },
  actions: {
    FETCH_BRAINTREE_TOKEN() {
      return new Promise(async (resolve, reject) => {
        axios
        .get("/initialize-braintree")
        .then(res => {
          resolve(res.data.token);
        })
        .catch(err => {
          reject(err.response.data.msg);
        });
      });
    },
    CONFIRM_BRAINTREE(context, data) {
      return new Promise(async (resolve, reject) => {
        axios
        .post("/confirm-braintree", {
          ...data
        })
        .then(res => {
          resolve(res.data.id);
        })
        .catch(err => {
          reject(err.response.data.msg);
        });
      });
    },
    FETCH_TRANSECTION({commit}, id) {
      return new Promise(async (resolve, reject) => {
        axios
        .get("/get-transection/"+id)
        .then(res => {
          resolve(res.data.transaction);
        })
        .catch(err => {
          reject(err.response.data.msg);
        });
      });
    }
  },
  getters: {
   
  }
}

export default payment
