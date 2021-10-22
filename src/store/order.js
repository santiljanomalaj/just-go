import axios from "axios";
const audio = new Audio(require("@/assets/tune.mp3"));

const user = {
  state: () => ({
    userOrders: [],
    orders: [],
    riderOrders: []
  }),
  mutations: {
    SAVE_ORDERS(state, orders) {
      audio.pause();

      audio.loop = false;
      let index = state.orders.findIndex(order => order.status === "PENDING");
      if (index !== -1) {
        audio.play();
      }

      let interval = setInterval(() => {
        let index = state.orders.findIndex(order => order.status === "PENDING");
        if (index == -1) {
          audio.pause();
          clearInterval(interval);
        }
      }, 4000);

      state.orders = [...orders];
    },
    CLEAR_USER_ORDERS(state) {
      state.userOrders = [];
    },
    SAVE_USER_ORDERS(state, orders) {
      state.userOrders = [...orders];
    },
    UPDATE_USER_ORDER_STATUS(state, order) {
      let index = state.userOrders.findIndex(ord => ord.id === order.id);
      state.userOrders[index].status = order.status;
      state.userOrders[index].deliveredAt = order.deliveredAt;
    },
    CHANGE_STATUS(state, data) {
      let index = state.orders.findIndex(order => order._id === data.id);

      state.orders[index].status = data.status;
      state.orders[index].deliveredAt = data.deliveredAt;
    },
    SAVE_RIDER_ORDERS(state, orders) {
      state.riderOrders = [...orders];
    },
    CHANGE_RIDER_ORDERS_STATUS(state, data) {
      let index = state.riderOrders.findIndex(order => order._id === data.id);

      state.riderOrders[index].status = data.status;
      state.riderOrders[index].deliveredAt = data.deliveredAt;
    }
  },
  actions: {
    POST_ORDER({ commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/new-order", {
            ...data,
            status: "PENDING",
            orderedAt: new Date()
          })
          .then(res => {
            resolve(res.data.order);
            commit("CLEAR_CART");
          })
          .catch(error => {
            reject("Error in placing order!");
          });
      });
    },
    FETCH_ORDERS({ commit }, status) {
      return new Promise(async (resolve, reject) => {
        axios
          .get(`/get-orders`)
          .then(res => {
            commit("SAVE_ORDERS", res.data.orders);
            resolve();
          })
          .catch(err => {
            reject(err.response.data.msg);
          });
      });
    },
    CHANGE_STATUS({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/change-status", {
            id: data.id,
            status: data.status,
            deliveredAt: new Date()
          })
          .then(res => {
            commit("CHANGE_STATUS", { ...data, deliveredAt: new Date() });

            resolve("Marked as " + data.status.toLowerCase());
          })
          .catch(error => {
            reject("Unable to mark as " + data.status.toLowerCase());
          });
      });
    },
    FETCH_USER_ORDERS({ commit }, uid) {
      return new Promise(async (resolve, reject) => {
        axios
          .get("/user-orders/" + uid)
          .then(res => {
            commit("SAVE_USER_ORDERS", res.data.orders);
            resolve(res.data.orders);
          })
          .catch(err => {
            reject(err.response.data.msg);
          });
      });
    },
    ASSIGN_RIDER({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/assign-rider", {
            id: data.id,
            riderId: data.riderId
          })
          .then(res => {
            resolve(res.data.order);
          })
          .catch(error => {
            reject("Error assigning rider!");
          });
      });
    },
    FETCH_RIDER_ORDERS({ state, commit }, data) {
      return new Promise(async (resolve, reject) => {

        axios
          .get(`/get-rider-orders/${data.uid}?date=${data.from.getTime()}`)
          .then(res => {
            commit("SAVE_RIDER_ORDERS", res.data.orders);
            resolve();
          })
          .catch(err => {
            reject(err.response.data.msg);
          });
      });
    },
    CHANGE_STATUS_RIDER({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/change-status", {
            id: data.id,
            status: data.status,
            deliveredAt: new Date()
          })
          .then(res => {
            commit("CHANGE_RIDER_ORDERS_STATUS", {
              ...data,
              deliveredAt: new Date()
            });

            resolve("Marked as " + data.status.toLowerCase());
          })
          .catch(error => {
            reject("Unable to mark as " + data.status.toLowerCase());
          });
      });
    },
    CLEAR_RIDER_TIP({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios
          .post("/clear-tip", {
            riderId: id
          })
          .then(res => {
            resolve({
              msg: "Tip cleared successfully!",
              user: res.data.user
            });
          })
          .catch(error => {
            reject("Unable to clear tip");
          });
      });
    },
    FETCH_AVG_DELIVERY_TIME({ commit }) {
      var date = new Date();
      var pastDate = date.getDate() - 7;
      date.setDate(pastDate);

      //Log the date to our web console.
      return new Promise(async (resolve, reject) => {
        axios
          .post(`/avg-delivery-time`, {
            date: date
          })
          .then(res => {
            resolve(res.data.times);
          })
          .catch(err => {
            reject(err.response.data.msg);
          });
      });
    }
  },
  getters: {
    getPendingOrders: state => {
      if (!state.orders.length) return [];
      return state.orders.filter(item => item.status === "PENDING");
    },
    getDeliveredOrders: state => {
      if (!state.orders.length) return [];
      return state.orders.filter(item => item.status === "DELIVERED");
    },
    getOrders: state => state.orders,
    getRiderOrders: state => state.riderOrders,
    getUserOrders: state => (state.userOrders ? state.userOrders : [])
  }
};

export default user;
