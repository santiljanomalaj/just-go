<template>
<div class="enter-address">
  <div class="ico-back" @click="closeMe">
    <i class="bi bi-chevron-left"></i>
  </div>
  <section class="login">
    <!-- Page content -->
    <b-container class="mt-1 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card class="bg-none border-0 mb-0" no-body>
            <b-card-body class="px-lg-3 py-lg-5">
              <template v-if="!otpSent">
                <div class="text-center mb-4">
                  <h3 class="text-lg text-white">Enter your phone number</h3>
                </div>

                <b-form role="form" @submit.prevent="onSubmit">
                  <div class="form-item">
                    <span>
                      <i class="bi bi-chat-left"></i>
                    </span>
                    <input
                      v-model="phone"
                      inputmode="numeric"
                      placeholder="Phone Number"
                      required
                    />
                  </div>

                  <div
                    v-if="err"
                    class="invalid-feedback"
                    style="display: block"
                  >
                    {{ err }}
                  </div>

                  <div class="text-center mt-2">
                    <!-- Valid Phone Number Field -->

                    <!-- <b-button
                      type="primary"
                      :disabled="loading || phone.length <= 15"
                      native-type="submit"
                      class="my-2 btn"
                    >
                      <b-icon
                        v-if="loading"
                        animation="spin"
                        class="spin-icon"
                        font-scale="1.8"
                        icon="arrow-clockwise"
                      ></b-icon>
                      Send Code</b-button
                    > -->
                    <b-button
                      :disabled="loading || phone.length <= 11"
                      class="my-2 btn"
                      native-type="submit"
                      type="primary"
                    >
                      <b-icon
                        v-if="loading"
                        animation="spin"
                        class="spin-icon"
                        font-scale="1.8"
                        icon="arrow-clockwise"
                      ></b-icon>
                      Send Code
                    </b-button>
                  </div>
                </b-form>
              </template>
              <template v-else>
                <div class="text-center mb-4">
                  <h3 class="text-lg text-white">Verify OTP</h3>
                </div>

                <b-form role="form" @submit.prevent="verifyOTP">
                  <div class="form-item">
                    <span>
                      <i class="bi bi-key"></i>
                    </span>
                    <input
                      v-model="otp"
                      autocomplete="one-time-code"
                      inputmode="numeric"
                      pattern="[0-9]*"
                      placeholder="Verification Code"
                    />
                  </div>

                  <div
                    v-if="err"
                    class="invalid-feedback"
                    style="display: block"
                  >
                    {{ err }}
                  </div>

                  <div class="text-center mt-2">
                    <b-button
                      :disabled="loading || otp.length <= 5"
                      class="my-2 btn"
                      native-type="submit"
                      type="primary"
                    >
                      <b-icon
                        v-if="loading"
                        animation="spin"
                        class="spin-icon"
                        font-scale="1.8"
                        icon="arrow-clockwise"
                      ></b-icon>
                      Verify
                    </b-button>
                  </div>
                  <div class="text-center mt-1">
                    <div class="btn secondary" @click="onSubmit">Resend</div>
                  </div>
                </b-form>
              </template>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </section>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'EnterPhone',
  data(){
    return{
      phone: "",
      err: "",
      loading: false,
      otpSent: false,
      otp: "",
    }
  },
  methods: {
    ...mapActions(["SEND_OTP", "VERIFY_OTP", "VERIFY_LOGIN"]),
    closeMe(){
      this.$emit("close-me");
    },
    onSubmit() {
      this.err = "";
      this.loading = true;
      this.SEND_OTP({ phone: this.phone.replace(/\D/g, "") })
        .then((res) => {
          this.loading = false;
          this.otpSent = true;
        })
        .catch((err) => {
          this.loading = false;
          this.err = err;
        });
    },
    verifyOTP() {
      this.err = "";
      this.loading = true;
      this.VERIFY_OTP({
        phone: this.phone.replace(/\D/g, ""),
        otp: this.otp,
        referral: this.$route.query.referral,
      })
        .then((token) => {
          this.loading = false;
          this.$gtag.event("sign_up", {
            event_label: "User Registered",
            non_interaction: true,
          });
          this.VERIFY_LOGIN()
            .then((user) => {
              this.closeMe();
            })
        })
        .catch((err) => {
          this.loading = false;
          this.err = err;
        });
    },
  },
  watch: {
    phone(newVal, oldVal) {
      if (newVal.length > oldVal.length) {
        if (newVal.length > 16) {
          this.phone = newVal.slice(0, 16);
          return;
        }
        if (newVal.length > 0 && newVal.charAt(0) !== "(") {
          this.phone = newVal = "(" + newVal;
        }
        if (newVal.length > 3 && newVal.charAt(4) !== ")") {
          this.phone = newVal =
            newVal.slice(0, 4) + ") " + newVal.slice(5, newVal.length - 1);
        }

        if (newVal.length > 8 && newVal.charAt(9) !== " ") {
          this.phone = newVal =
            newVal.slice(0, 9) + " - " + newVal.slice(10, newVal.length - 1);
        }
      }
    },
  },
  created(){
     this.$gtag.screenview({
      app_name: "Just Go",
      screen_name: "EnterPhone",
    });
  }
}
</script>

<style lang="scss" scoped>
.enter-address{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 2;
  .ico-back{
    background:#1e852b;
    height: 45px;
    width: 45px;
    border-radius: 12px;
    position: fixed;
    top: 24px;
    left: 24px;
    z-index: 1;
    font-size: 26px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 2px;
    cursor: pointer;
  }
  .browse-store{
    background:#1e852b;
    height: 45px;
    width: 45px;
    border-radius: 12px;
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 1;
    font-size: 26px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 2px;
    cursor: pointer;
  }

  .login {
    background: linear-gradient(#2dce89, #2dcecc) !important;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .logo {
      padding: 60px 0;

      img {
        max-width: 200px;
        width: 100%;
        display: block;
        margin: 0 auto;
      }
    }

    .link {
      color: #000 !important;

      &:hover {
        text-decoration: underline;
      }
    }

    .bg-none {
      background: none;
    }

    .form-item {
      display: grid;
      grid-template-columns: 50px 1fr;
      background: #51b094;
      border-radius: 12px;
      align-items: center;
      height: 58px;

      span {
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          font-size: 24px;
          color: #fff;
        }
      }

      input {
        font-size: 1.1rem;
        background: none;
        color: #fff;
        height: 100%;
        width: 100%;
        border: none;
        padding-bottom: 4px;

        &::-webkit-input-placeholder {
          /* Edge */
          color: #fff;
        }

        &:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: #fff;
        }

        &::placeholder {
          color: #fff;
        }

        &:focus {
          outline: none;
        }
      }
    }

    button {
      width: 100%;
      background: #23a534;
      border: none;
      outline: none;
      transition: 0.3s;
      font-style: normal;
      font-weight: bold;
      box-shadow: none;
      color: #fff;
      border: 1px solid #23a534;

      &:active,
      &:hover {
        background: #1e852b;
      }

      &:disabled {
        cursor: not-allowed;
      }
    }

    .btn {
      cursor: pointer;
    }
  }
}
</style>
