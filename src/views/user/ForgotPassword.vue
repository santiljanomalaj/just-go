<template>
  <section class="forgot-password">
    <!-- Page content -->
    <b-container class="mt-8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center mb-4">
                <h3 class="text-lg">Reset Password</h3>
              </div>
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input
                    alternative
                    class="mb-3"
                    name="Email"
                    :rules="{ required: true, email: true }"
                    prepend-icon="ni ni-email-83"
                    placeholder="Email"
                    v-model="model.email"
                  >
                  </base-input>

                  <div
                    v-if="err"
                    class="invalid-feedback"
                    style="display: block"
                  >
                    {{ err }}
                  </div>
                  <div class="text-center mt-2">
                    <b-button
                      type="primary"
                      :disabled="loading"
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
                      Reset</b-button
                    >
                  </div>
                  <b-row class="my-3">
                    <b-col cols="12">
                      Back to
                      <router-link to="/login" class="text-light link">
                        Login</router-link
                      >
                    </b-col>
                  </b-row>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <b-modal v-model="showModal" id="reset" hide-footer>
        <div class="d-block text-center">
          <h3>{{ modalMessage }}</h3>
        </div>
        <b-button class="mt-5" block @click="showModal = false"
          >Close Me</b-button
        >
      </b-modal>
    </b-container>
  </section>
</template>
<script>
import firebase from "../../firbase";
// import {mapActions} from  'vuex'
export default {
  data() {
    return {
      model: {
        email: "",
      },
      err: "",
      loading: false,
      showModal: false,
      modalMessage: "",
    };
  },
  methods: {
    onSubmit() {
      this.loading = true;
      firebase
        .auth()
        .sendPasswordResetEmail(this.model.email)
        .then(() => {
          this.modalMessage =
            "If your account exists, you will receive a email";
          this.loading = false;
          this.showModal = true;
        })
        .catch((err) => {
          this.modalMessage = err.message;
          this.loading = false;
          this.showModal = true;
        });
    },
  },
};
</script>


<style lang="scss" scoped>
.forgot-password {
  //    background: #23a534;
  background: linear-gradient(#2dce89, #2dcecc) !important;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .link {
    color: #000 !important;
    &:hover {
      text-decoration: underline;
    }
  }
  .bg-secondary {
    background: #fff !important;
  }
  button {
    background: #23a534;
    border: none;
    outline: none;
    transition: 0.3s;
    font-style: normal;
    font-weight: bold;
    box-shadow: none;
    color: #fff;

    &:hover {
      background-color: transparent;
      color: #000;
      border: 1px solid #23a534;
    }
  }
}
</style>
