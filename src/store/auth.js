import axios from 'axios'

const auth = {
  state: () => ({
    user: {},
    signedIn: false,
  }),
  mutations: {
    SAVE_USER(state, user) {
      state.user = user;
      state.signedIn = true;
    },
    PURGE_AUTH(state) {
      state.user = {};
      state.signedIn = false;
      axios.defaults.headers.Authorization = "Bearer ";
    },
  },
  actions: {
    SEND_OTP({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
        .post("/send-otp", {
          phone: data.phone
        })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
      });
    },
    VERIFY_OTP({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
        .post("/verify-otp", {
          phone: data.phone,
          otp: data.otp,
          referredBy: data.referral
        })
        .then(res => {
          resolve(res.data.token);
          localStorage.setItem("token", res.data.token);
          axios.defaults.headers.Authorization =
            "Bearer " + localStorage.token;
        })
        .catch(err => {
          reject(err.response.data.msg);
        });
      });
    },
    VERIFY_LOGIN(context) {
      return new Promise((resolve, reject) => {
        if (context.getters.signedIn) {
          resolve(context.state.user);
        } else if (localStorage.token) {
          axios
          .get("/get-user")
          .then(res => {
            context.commit("SAVE_USER", res.data.user);
            resolve(res.data.user);
          })
          .catch(err => {
            reject(err.response.data.msg);
          });
        } else {
          reject();
        }
      });
    },
    LOGOUT(context) {
      return new Promise(resolve => {
        context.commit("PURGE_AUTH");
        localStorage.setItem("token", undefined);
        resolve();
      });
    }
  },
  getters: {
    getUser: state => state.user,
    signedIn: state => state.signedIn,
    isAdmin: state => state.user.role === "admin",
    getUserLocation: state => {
      let data = localStorage.getItem("addgress");
      if (data) return JSON.parse(data);
      if (state.user && state.user.recentAddress) return state.user.recentAddress.slice(-1).pop();
      return null;
    }
  }
}

export default auth
