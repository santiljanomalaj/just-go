<template>
  <div class="checkout">
    <div v-if="!alert.length" class="checkout-wrapper">
      <div class="checkout-inner">
        <div class="checkout-header">
          <div class="container">
            <p class="left">Checkout</p>
            <p class="right">{{ formatPrice(totalPrice) }}</p>
          </div>
        </div>
        <div class="checkout-body">
          <div class="container">
            <div v-if="loader" class="loader">
              <b-icon
                animation="spin"
                class="spin-icon"
                font-scale="2.2"
                icon="arrow-clockwise"
              ></b-icon>
            </div>
            <div v-else class="user-details">
              <div class="detail">
                <span>Name</span>
                <h2 v-if="user">{{ userName }}</h2>
              </div>
              <div class="detail">
                <span>Phone</span>
                <h2
                  :class="{ placeholder: !formatedPhone }"
                  @click="phoneModal = true"
                >{{ formatedPhone || "Enter Your phone number" }}</h2>
                <transition mode="in-out" name="slide-fade-complete">
                  <EnterPhone
                    v-if="phoneModal"
                    @close-me="phoneModal = false"
                  />
                </transition>
              </div>

              <div class="detail address">
                <span>Address*</span>
                <h2
                  :class="{ placeholder: !address }"
                  @click="addressModal = true"
                >
                  {{ address || "Enter Your address" }}
                </h2>
                <div class="ico" @click="addressModal = true">
                  <i class="bi bi-arrow-up-square"></i>
                </div>
                <transition mode="in-out" name="slide-fade-complete">
                  <EnterAddress
                    v-if="addressModal"
                    @addressUpdate="addressUpdate"
                    @close-me="addressModal = false"
                  />
                </transition>
                <!-- addressUpdate -->
                <span v-if="errors.address" class="err">{{
                  errors.address
                }}</span>
              </div>
              <div v-if="totalPrice > 0" class="detail address">
                <span>Payment Method</span>
                <h2 @click="methodModal = true">{{ selectedMethod.title }}</h2>
                <div class="ico" @click="methodModal = true">
                  <i class="bi bi-arrow-up-square"></i>
                </div>
                <span v-if="errors.stripe" class="err">{{
                  errors.stripe
                }}</span>
              </div>
              <div class="detail">
                <span>Delivery Notes</span>
                <textarea
                  v-model="notes"
                  placeholder="Enter Apartment #, Gate Codes, &amp; Directions here"
                ></textarea>
              </div>

              <div class="detail">
                <span>Tip</span>
                <div class="d-flex gap-12 flex-wrap">
                  <div
                    :class="{ active: tip == 1 }"
                    class="pill"
                    @click="tip = 1"
                  >
                    {{ formatPrice(1) }}
                  </div>
                  <div
                    :class="{ active: tip == 2 }"
                    class="pill"
                    @click="tip = 2"
                  >
                    {{ formatPrice(2) }}
                  </div>
                  <div
                    :class="{ active: tip == 3 }"
                    class="pill"
                    @click="tip = 3"
                  >
                    {{ formatPrice(3) }}
                  </div>
                  <div
                    :class="{ active: tip != 1 && tip != 2 && tip != 3 }"
                    class="pill"
                    @click="tipModal = true"
                  >
                    <i class="mr-1 bi bi-pencil-fill"></i> {{ customTip }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="dropin-container"></div>
          <div class="button-container" style="height: 5rem">
            <div class="button-container-inner multiple">
              <div class="bottom-button sm" @click="closeMe">
                <p>Back</p>
              </div>
              <div
                v-if="totalPrice === 0"
                :class="{ disabled: loading }"
                class="bottom-button md"
                @click="placeOrder"
              >
                <p>Order for Free</p>
              </div>
              <div
                v-else-if="selectedMethod.id === 'CARD'"
                id="cardButton"
                :class="{ disabled: loading }"
                class="bottom-button card"
                @click="payWithCreditCard"
              >
                <p>
                  <i class="bi bi-credit-card"></i>
                  Pay
                </p>
              </div>
              <div
                v-else-if="selectedMethod.id === 'VENMO'"
                id="venmoButton"
                :class="{ disabled: loading }"
                class="bottom-button venmo"
              >
                <img alt="" src="@/assets/images/venmo_logo.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="order-placed">
      <template v-if="alert !== 'success'">
        <img alt="" src="@/assets/images/error.gif" />
        <h2>Error in placing order, Try again later!</h2>
      </template>
      <div class="bottom-button" @click="closeMsg">
        <p>Back</p>
      </div>
    </div>

    <transition mode="in-out" name="slide-fade-complete">
      <PayMethod
        v-show="methodModal"
        :methods="methods"
        :selected="selectedMethod.id"
        :token="token"
        @updateToken="updateToken"
        @payByCard="(id) => (nonce = id)"
        @update="methodSelected"
        @close-me="methodModal = false"
      >
      </PayMethod>
    </transition>
    <transition mode="in-out" name="slide-fade-complete">
      <Tip v-if="tipModal" :tipVal="tip" @save="saveTip" />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios"
import EnterAddress from "../Checkout/EnterAddress";
import EnterPhone from "../Checkout/EnterPhone";
import PayMethod from "../Checkout/PayMethod";
import Tip from "../Checkout/Tip";

export default {
  props: ["discount"],
  data() {
    return {
      methods: [
        {
          icon: require("@/assets/images/credit-card.svg"),
          title: "Credit/Debit Card",
          id: "CARD",
        },
      ],
      address: "",
      notes: "",
      errors: {},
      location: {},
      real_address: null,
      alert: "",
      loading: false,
      token: "",
      payWithCard: false,
      orderPrice: "",
      addressModal: false,
      methodModal: false,
      phoneModal: false,
      tipModal: false,
      selectedMethod: {
        icon: require("@/assets/images/credit-card.svg"),
        title: "Credit/Debit Card",
        id: "CARD",
      },
      venmoInstance: {},
      nonce: "",
      tip: 2,
      stripeToken: null,
      payError: "",
      choice: null,
      loader: false
    };
  },
  watch: {
    "selectedMethod.id"(newVal) {
      if (newVal === "VENMO") {
        this.displayVenmoButton(this.venmoInstance);
      }
    },
    "stripeToken"(newVal) {
      if (newVal) {
        this.errors.stripe = "";
      }
    },
    "tip"(newVal) {
      this.$emit('changeTip', Number(newVal));
    }
  },
  methods: {
    ...mapActions([
      "VERIFY_LOGIN",
      "POST_ORDER",
      "FETCH_BRAINTREE_TOKEN",
      "CONFIRM_BRAINTREE",
      "FETCH_USER",
    ]),
    saveTip(tip) {
      this.tip = Number(tip);
      this.tipModal = false;
    },
    methodSelected(id) {
      this.selectedMethod = this.methods.find((meth) => meth.id === id);
    },
    addressUpdate(data) {
      this.address = data.address;
      this.location = data.location;
      this.addressModal = false;
    },
    displayVenmoButton(venmoInstance) {
      const venmoButton = document.querySelector("#venmoButton");
      if (!venmoButton) return;
      venmoButton.style.display = "block";

      venmoButton.addEventListener("click", (event) => {
        if (this.selectedMethod.id !== "VENMO") return;
        this.errors = {};
        if (this.address.trim().length === 0) {
          this.errors.address = "Please Enter Address!";
        }

        if (Object.keys(this.errors).length) return;
        venmoButton.disabled = true;
        venmoInstance
          .tokenize()
          .then((res) => {
            this.handleVenmoSuccess(res);
          })
          .catch((err) => {
            this.handleVenmoError(err);
          })
          .then(function () {
            venmoButton.removeAttribute("disabled");
          });
      });
    },
    handleVenmoError(err) {
    },

    handleVenmoSuccess(payload) {
      this.loading = true;
      this.CONFIRM_BRAINTREE({
        amount: this.totalPrice * 100,
        nonce: payload.nonce,
      }).then((id) => {
        this.orderPrice = this.totalPrice;
        this.transactionId = id;
        this.placeOrder();
      });
    },

    closeMe() {
      this.$emit("close-me");
    },

    closeMsg() {
      if (this.alert === "success") {
        this.closeMe();
        this.$emit("closeCart");
      }
      this.alert = "";
    },
    getCategoryname(id) {
      return this.categories.find((cat) => cat._id === id).name;
    },
    placeOrder() {
      this.errors = {};
      if (this.address.trim().length === 0) {
        this.errors.address = "Please Enter Address!";
      }
      if (Object.keys(this.errors).length) return "";
      this.loading = true;
      let products = [];
      this.cartItems.forEach((item) => {
        products.push({
          ...item,
          id: item._id,
          category: this.getCategoryname(item.categories[0]),
        });
      });

      let data = {
        phone: this.user.phone,
        name: this.userName,
        address: this.address,
        notes: this.notes,
        uid: this.user.uid,
        subtotal: this.subTotoalPrice,
        total: this.totalPrice,
        tax: this.tax,
        tip: this.tip,
        delivery: "FREE",
        discount: this.discount,
        products: [...products],
        location: this.location,
        transactionId: this.transactionId || "FREE",
      };
      const tempPrice = this.totalPrice;
      //place order here
      this.POST_ORDER(data)
        .then((order) => {
          this.FETCH_USER()
            .then(() => {
              this.$router.push(`/purchase-complete?price=${tempPrice}`);
              this.sendAnalytics(order);
              this.alert = "success";
              this.loading = false;
            })
            .catch((err) => {
              this.$router.go(-1);
            });
        })
        .catch((err) => {
          this.alert = "error";
          this.loading = false;
        });
    },
    sendAnalytics(order) {
      let items = [];
      order.products.forEach(({ title, ...item}) => {
        items.push({
          ...item,
          name: title,
        });
      });

      this.$gtag.event("purchase", {
        id: order._id,
        non_interaction: true,
        transaction_id: order.transactionId || "FREE",
        currency: "USD",
        value: order.totalPrice,
        items: items,
      });
    },
    updateToken(data) {
      this.choice = data.choice;
      this.stripeToken = data.id;
      this.cardID = data.cardID;
    },
    async payWithCreditCard() {
      if (!this.formatedPhone) this.$router.push("/login");
      this.loading = true;
      this.payWithCard = false;

      try {
        if (!(this.errors && Object.keys(this.errors).length > 0)) {
          this.errors = {};
        }
        if (!this.stripeToken && !this.choice) {
          this.errors.stripe = "Please Enter Card Info.";
          return;
        }
        const amount = parseInt(this.totalPrice * 100);

        const response = await axios
          .post("/stripe-charge", {
            phone: this.user.phone,
            name: this.userName,
            address: this.real_address,
            email: this.user.email,
            amount,
            source: this.stripeToken.id,
            payment_method: this.cardID,
            userId: this.user.uid,
            customerId: this.user.customerId,
            choice: this.choice
          });
        
        if (response.data.success) {
          this.transactionId = response.data.transactionId;
          this.placeOrder()
        } else if (response.data.error) {
          this.payError = response.data.error;
          this.$toast.open({
            message: this.payError,
            type: "error",
            duration: 50000,
            dismissible: true
          });
        }
      } catch (error) {
        this.payError = error;
      } finally {
        this.loading = false;
      }
    },

    async initBraintree() {
      let token = await this.FETCH_BRAINTREE_TOKEN();
      this.token = token;

      braintree.client
        .create({
          authorization: token,
        })
        .then((clientInstance) => {
          return Promise.all([
            braintree.dataCollector.create({
              client: clientInstance,
              paypal: true,
            }),
            braintree.venmo.create({
              client: clientInstance,
              allowDesktop: true,
              paymentMethodUsage: "multi_use", // available in v3.77.0+

              allowNewBrowserTab: false,
            }),
            braintree.applePay.create({
              client: clientInstance,
            }),
          ]);
        })
        .then((results) => {
          /*VENMO */
          this.venmoInstance = results[1];

          if (!this.venmoInstance.isBrowserSupported()) {
            return;
          }

          this.displayVenmoButton(this.venmoInstance);

          if (this.venmoInstance.hasTokenizationResult()) {
            this.venmoInstance
              .tokenize()
              .then((res) => {
                this.handleVenmoSuccess(res);
              })
              .catch((err) => {
                this.handleVenmoError(err);
              });
          }

          //APPLE PAY
          var applePayInstance = results[2];
          var paymentRequest = applePayInstance.createPaymentRequest({
            total: {
              label: "My Store",
              amount: "19.99",
            },

            // We recommend collecting billing address information, at minimum
            // billing postal code, and passing that billing postal code with
            // all Apple Pay transactions as a best practice.
            requiredBillingContactFields: ["postalAddress"],
          });
          var session = new ApplePaySession(3, paymentRequest);
          if (!window.ApplePaySession) {
            console.error("This device does not support Apple Pay");
          }

          if (!ApplePaySession.canMakePayments()) {
            console.error(
              "This device is not capable of making Apple Pay payments"
            );
          }

          session.onvalidatemerchant = function (event) {
            applePayInstance
              .performValidation({
                validationURL: event.validationURL,
                displayName: "My Store",
              })
              .then(function (merchantSession) {
                session.completeMerchantValidation(merchantSession);
              })
              .catch(function (validationErr) {
                // You should show an error to the user, e.g. 'Apple Pay failed to load.'
                console.error("Error validating merchant:", validationErr);
                session.abort();
              });
          };
        });
    },
  },
  computed: {
    ...mapGetters({
      user: "getUser",
      categories: "getCategories",
    }),
    formatedPhone() {
      if (this.user.phone) {
        let phone = this.user.phone;
        phone = "(" + phone;
        phone = phone.substr(0, 4) + ") " + phone.slice(4);
        phone = phone.substr(0, 9) + " - " + phone.slice(9);
  
        return phone;
      }
      return null;
    },
    customTip() {
      return this.tip != 1 && this.tip != 2 && this.tip != 3
        ? this.formatPrice(this.tip)
        : "Other";
    },
    userName() {
      if (this.user.fname || this.user.sname)
        return this.user.fname + " " + this.user.sname;
      return null;
    },
    cartItems() {
      return this.$store.getters.getCartItems;
    },
    totalPrice() {
      let price = 0;

      price = this.subTotoalPrice + this.tax + this.tip + this.discount;
      return price < 0 ? 0 : price;
    },
    subTotoalPrice() {
      let items = this.$store.getters.getCartItems;
      let price = 0;
      items.forEach((item) => {
        if (item.salePrice) {
          price += +item.salePrice * +item.quantity;
        } else {
          price += +item.price * +item.quantity;
        }
      });
      return price;
    },
    tax() {
      let price = this.subTotoalPrice + this.tip + this.discount;
      price = price < 0 ? 0 : price;

      return price * 7.75 / 100;
    },
  },
  async created() {
    let data = localStorage.address ? JSON.parse(localStorage.address) : {};
    
    this.address = data.address;
    this.location = data.location;
    if (data.place && Object.keys(data.place).length > 0) {
      const { address_components } = data.place;
      const streetNumber = address_components.find( g => g.types.find( t => t === 'street_number'));
      const streetName = address_components.find( g => g.types.find( t => t === 'route' ));
      const cityName = address_components.find( g => g.types.find( t => t === 'locality') && g.types.find( t => t === 'political' ));
      const stateName = address_components.find( g => g.types.find( t => t === 'administrative_area_level_1') && g.types.find( t => t === 'political' ));
      const countryName = address_components.find( g => g.types.find( t => t === 'country') && g.types.find( t => t === 'political' ));
      const zip = address_components.find( g => g.types.find( t => t === 'postal_code' ));

      this.real_address = {
        line1: `${streetNumber ? streetNumber.short_name : ''} ${streetName ? streetName.short_name : ''}`,
        city: cityName ? cityName.short_name : '',
        state: stateName ? stateName.short_name : '',
        country: countryName ? countryName.short_name : '',
        postal_code: zip ? zip.short_name : ''
      };
    }

    try {
      if ((!this.user || !this.user.name) && localStorage.token && localStorage.token !== 'undefined') {
        this.loader = true;
        await this.VERIFY_LOGIN();
        this.loader = false;
      }
    } catch (error) {
    }
    this.$gtag.screenview({
      app_name: "Just Go",
      screen_name: "Checkout",
    });

    let items = [];
    this.cartItems.forEach(({title, ...item}) => {
      items.push({
        ...item,
        id: item._id,
        name: title,
        category: this.getCategoryname(item.categories[0]),
      });
    });

    this.$gtag.event("begin_checkout", {
      non_interaction: true,
      currency: "USD",
      value: this.totalPrice,
      coupon: this.totalPrice ===0 ? "NEW_USER": "",
      items: items,
    });
  },
  mounted() {
    //this.initBraintree();
  },
  components: {
    EnterAddress,
    EnterPhone,
    PayMethod,
    Tip,
  },
};
</script>

<style lang="scss" scoped>
.checkout {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;

  .order-placed {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 50;
    height: 100%;
    background-color: #fff;

    h2 {
      font-size: 1.2rem;
      font-weight: 600;
      text-align: center;
    }

    img {
      max-width: 60%;
    }

    .bottom-button {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: row;
      // align-items: center;
      cursor: pointer;
      justify-content: center;
      height: 2.5rem;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
      border-radius: 2.5rem;
      width: 200px;
      background: #efefef;
      color: #000;

      p {
        text-align: center;
        width: 100%;
        line-height: 2.5rem;
        font-weight: 600;
      }
    }
  }

  .checkout-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    height: 100%;
    border-radius: 0;
    overflow: hidden;
    transition: all 0.4s;
    background: #fff;
    box-shadow: 4px 4px 1rem rgba(0, 0, 0, 0.15);
    overflow-y: scroll;

    &.active {
      bottom: 0;
    }

    .checkout-inner {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      width: 100%;
      height: 100%;
      line-height: 1.5rem;

      .checkout-header {
        border-bottom: 1px solid #ececec;
        font-weight: 700;
        font-size: 1.5rem;
        line-height: 2.25rem;
        letter-spacing: -0.02em;
        width: 100%;
        background-color: #fff;
        z-index: 1;
        border-radius: 0;

        & > div {
          min-height: 4.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        p {
          color: #000;
          font-weight: 700;
          font-size: 1.5rem;
          line-height: 2.25rem;
          margin: 0;
        }
      }

      .checkout-body {
        width: 100%;
        overflow: scroll;
        padding-bottom: 150px;

        .loader {
          min-height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .user-details {
          .detail {
            padding-top: 1rem;
            // border-bottom: 1px solid #767676;

            span {
              color: #828282;
              font-size: 16px;
              font-weight: 400;
              display: inline-block;
              font-family: "Nunito", sans-serif;

              &.err {
                font-weight: 600;
                color: rgb(221, 61, 61);
              }
            }

            h2 {
              //font-family: 'Nunito',sans-serif;
              font-size: 1.2rem;
              color: #0a0a0a;
              margin-bottom: 0;
              font-weight: 600;

              &.placeholder {
                color: #737373;
              }

              @media (max-width: 500px) {
                font-size: 1rem;
              }
            }

            &.address {
              h2 {
                cursor: pointer;
              }

              position: relative;

              .ico {
                position: absolute;
                right: 16px;
                bottom: 2px;
                cursor: pointer;
                background-color: #fff;
                i {
                  color: #0a0a0a;
                  font-size: 28px;
                }

                //transform: translateY(-50%);
              }
            }
            textarea,
            input,
            .input {
              width: 100%;
              border: none;
              //font-family: 'Nunito',sans-serif;
              font-size: 1.2rem;
              color: #0a0a0a;
              margin-bottom: 0;
              font-weight: 600;
              resize: none;
              &:focus {
                outline: none;
              }

              @media (max-width: 500px) {
                padding: 0.5rem 0 0.5rem;
                font-size: 1rem;
              }
            }

            .gap-12 {
              column-gap: 12px;
              row-gap: 12px;
            }

            .pill {
              cursor: pointer;
              height: 38px;
              background: #fff;
              border-radius: 26px;
              padding-left: 18px;
              padding-right: 18px;
              font-size: 16px;
              font-weight: 600;
              display: flex;
              justify-content: center;
              align-items: center;
              border: 1px solid #eee;

              color: #0a0a0a;

              &.active {
                background: #1e852b;
                color: #fff;
              }
            }
          }
        }

        .button-container {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 5.5rem;
          z-index: 1;
          width: 100%;
          background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          .button-container-inner {
            padding: 0 20px;
            position: absolute;
            bottom: 0;
            display: flex;
            width: 100%;
            max-width: 768px;
            min-height: 2.5rem;
            line-height: 1.5rem;
            margin-bottom: 2.125rem;
            align-items: center;
            text-align: center;
            justify-content: center;

            &.multiple {
              column-gap: 18px;
            }

            .bottom-button {
              display: flex;
              flex-direction: row;
              // align-items: center;
              cursor: pointer;
              justify-content: center;
              height: 2.5rem;
              box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
              border-radius: 2.5rem;
              width: 100%;

              p {
                margin: 0;
              }

              &.sm {
                background: #efefef;
                color: #000;
              }

              &.venmo,
              &.card,
              &.md {
                background-color: #3ba535;
                color: #fff;
                font-weight: 600;
                padding-left: 12px;
                padding-right: 12px;

                &.disabled {
                  background-color: #8dd68a;
                  pointer-events: none;
                }
              }

              &.venmo {
                background-color: #fff;

                img {
                  height: 88px;
                  object-position: center;
                  transform: translateY(-22%);
                }
              }

              &.card {
                padding-inline: 22px;
              }

              p {
                text-align: center;
                width: 100%;
                line-height: 2.5rem;
                font-weight: 600;
              }
            }
          }
        }
      }
    }
  }
}

#pay-error {
  .alert-danger {
    color: #721c24;
    background-color: #f8d7da;
  }
}
</style>
