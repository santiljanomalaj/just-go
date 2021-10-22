import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "../store/store";

Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  routes,
  mode: "history",
  linkActiveClass: "active",
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});
router.beforeEach((to, from, next) => {
  if (to.meta.admin || to.meta.rider) {
    store
      .dispatch("VERIFY_LOGIN")
      .then(res => {
        const isAdmin = res.role === "admin";
        const isRider = res.role==='rider'
        if ((to.meta.admin && !isAdmin) || (to.meta.rider && !isRider)) {
          if (store.getters.signedIn) next("/404");
          else next("/login");
        } else {
          next();
        }
      })
      .catch(err => {
        next("/login");
      });
  } else if (to.meta.auth) {
    store
      .dispatch("VERIFY_LOGIN")
      .then(res => {
        next();
      })
      .catch(err => {
        next("/login");
      });
  } else {
    next();
  }

  if (to.name == "LandingPage") {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];

    let isMobile = toMatch.some(toMatchItem => {
      return navigator.userAgent.match(toMatchItem);
    });
    // if (isMobile && !localStorage.getItem("device")) {
    //   localStorage.setItem("device", true);
    // } else if (isMobile && localStorage.getItem("device")) {
    //   next("/browse");
    // }
  }
});
export default router;
