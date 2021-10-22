import axios from "axios";

const cart = {
  state: () => ({
    cartItem: {},
    cartItems: []
  }),
  mutations: {
    toggleCartItem(state, payload) {
      state.cartItem = payload;
    },

    // Add Items to Cart
    updateCartItems(state, payload) {
      let temp = state.cartItems.find(item => item._id === payload._id);
      if (!temp) {
        state.cartItems.push({ quantity: 1, ...payload });
      } else {
        let index = state.cartItems.findIndex(item => item._id === payload._id);
        temp.quantity = temp.quantity + 1;
        state.cartItems[index] = temp;
      }
    },
    // Update Items Quantity
    updateQuantity(state, payload) {
      let temp = state.cartItems.find(item => item._id === payload._id);
      let index = state.cartItems.findIndex(item => item._id === payload._id);

      if (payload.data === "increase") {
        temp.quantity = temp.quantity + 1;
        state.cartItems[index] = temp;
      } else {
        if (temp.quantity >= 2) {
          temp.quantity = temp.quantity - 1;
          state.cartItems[index] = temp;
        }
      }
    },
    // Remove Item From Cart
    removeItem(state, id) {
      let index = state.cartItems.findIndex(item => item._id === id);
      state.cartItems.splice(index, 1);
    },
    CLEAR_CART(state) {
      state.cartItems = [];
    }
  },
  actions: {},
  getters: {
    getSingleItem: state => state.cartItem,
    getCartItems: state => state.cartItems,
    getCartItemsLength: state => state.cartItems.length,
    getProductsLength: state => {
      let count = 0;
      state.cartItems.forEach(element => {
        count += element.quantity;
      });

      return count;
    }
  }
};

export default cart;
