import Vue from "vue";
import vueBraintree from "vue-braintree";
import VueSocialSharing from "vue-social-sharing";
import VueGtag from "vue-gtag"; 
import DashboardPlugin from "./plugins/dashboard-plugin";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from "./App.vue";
import store from "./store/store";
import * as VueGoogleMaps from "gmap-vue";
import { StripePlugin } from '@vue-stripe/vue-stripe';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// router setup
import router from "./routes/router";
import LazyLoadDirective from "./util/lazyload";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueScrollTo from 'vue-scrollto'
import HScroll from "@koas/v-hscroll"

Vue.use(VueScrollTo)

// plugin setup
Vue.use(ElementUI);
Vue.use(BootstrapVue)
Vue.use(DashboardPlugin);
Vue.directive("lazyload", LazyLoadDirective);
Vue.use(VueSocialSharing);
Vue.use(VueGtag, {
  config: { id: "UA-206075257-1" }
});

// Vue.use(braintree)
Vue.use("vue-braintree", vueBraintree);
// As a plugin
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_MAP_KEY,
    libraries: ["places", "geometry", "drawing"]
  },
  installComponents: true
});
Vue.mixin({
  methods: {
    formatPrice: price => {
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      });
      return formatter.format(+price);
    },
    sortCategoryProduct: products => {
      return [...products].sort(function(a, b) {
        return a.index ? parseFloat(a.index) - parseFloat(b.index) : 0;
      });
    },
    normalizeId: id=>{
      return id.toLowerCase().replace(/[^0-9a-z]/gi, '')
    }

  }
});

const options = {
  pk: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY,
  stripeAccount: process.env.VUE_APP_STRIPE_ACCOUNT_ID,
  apiVersion: process.env.VUE_APP_STRIPE_API_VERSION,
  locale: process.env.VUE_APP_STRIPE_LOCALE,
};
Vue.use(StripePlugin, options);
Vue.use(VueToast);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  async created() {
    await store.dispatch("FETCH_CATEGORIES");
  },
  render: h => h(App),
  router
});
