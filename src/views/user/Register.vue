<template>
  <section class="register">
    <!-- Page content -->
    <b-container class="mt-8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center mb-4">
                <h3 class="text-lg">Sign up with credentials</h3>
              </div>
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-hat-3"
                    placeholder="First Name"
                    name="Name"
                    :rules="{ required: true }"
                    v-model="model.fname"
                  ></base-input>
                  <base-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-hat-3"
                    placeholder="Last Name"
                    name="SName"
                    :rules="{ required: true }"
                    v-model="model.sname"
                  >
                  </base-input>
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

                  <base-input
                    alternative
                    class="mb-3"
                    name="Password"
                    :rules="{ required: true, min: 6 }"
                    prepend-icon="ni ni-lock-circle-open"
                    type="password"
                    placeholder="Password"
                    v-model="model.password"
                  >
                  </base-input>

                  <div class="text-center">
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
                      Create account</b-button
                    >
                  </div>
                  <b-row class="my-3">
                    <b-col cols="12">
                      Already have an Account?
                      <router-link to="/login" class="text-light link"
                        >Login</router-link
                      >
                    </b-col>
                  </b-row>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "register",
  data() {
    return {
      model: {
        fname: "",
        sname: "",
        email: "",
        password: "",
        role: "user",
      },
      err: "",
      loading: false,
    };
  },
  methods: {
    ...mapActions(["CREATE_USER"]),
    onSubmit() {
      this.err = "";
      this.loading = true;
      this.CREATE_USER(this.model)

        .then((res) => {
          this.loading = false;
          this.$bvToast.toast(res.msg, {
            title: `${res.status ? "Success" : "Failed"}`,
            autoHideDelay: 5000,
            appendToast: true,
            variant: `${res.status ? "success" : "danger"}`,
            toaster: "b-toaster-top-right",
            solid: true,
          });

          setTimeout(() => {
            if (res.role === "user" && res.status) {
              this.$router.push("/browse");
            } else if (res.role === "admin") {
              this.$router.push("/admin");
            }
          }, 2000);
        })
        .catch((err) => {
          this.err = err;
          // this.loading = false;
        });
    },
  },
};
</script>


<style lang="scss" scoped>
.register {
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
