import axios from 'axios';

const auth = {
  state: () => ({
    shop: {},
  }),
  mutations: {
    SAVE_SHOP(state, shop) {
      state.shop = shop;
    },

  },
  actions: {
    FETCH_SHOP({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.get('/get-shop').then(res => {
          commit('SAVE_SHOP', res.data.shop);
          resolve(res.data.shop);
        }).catch(err => {
          reject(err);
        });
      });
    },

    UPDATE_SHOP({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.put('/update-shop', {
          status: data.status,
          type: data.type,
          statusTitle: data.statusTitle,
          statusSubTitle: data.statusSubTitle,
        }).then(res => {
          commit('SAVE_SHOP', res.data.shop);
          resolve(res.data.msg);

        }).catch(err => {
          reject(err.response.data.msg);
        });
      });
    },

  },
  getters: {
    getShop: state => state.shop,
  },
};

export default auth;
