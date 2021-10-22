import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import auth from './auth'
import user from './user'
import product from './product'
import category from './category'
import section from './section'
import order from './order'
import cart from './cart'
import payment from './payment'
import shop from './shop'
import sms from './sms'


//const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://api.justgodelivery.com'
const baseURL = 'http://dev.justgodelivery.com:8080';
axios.defaults.baseURL = baseURL
axios.defaults.headers.Authorization = 'Bearer ' + localStorage.token
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    user,
    category,
    product,
    section,
    order,
    cart,
    payment,
    sms,
    shop
  },
})

export default store
