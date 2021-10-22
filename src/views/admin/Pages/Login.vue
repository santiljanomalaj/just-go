<template>
  <section class="login">
    <!-- Page content -->
    <b-container class="mt-8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center mb-4">
                <h3 class="text-lg">
                   Sign in with credentials
                </h3>

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
                  <div v-if="err" class="invalid-feedback" style="display: block;">
                    {{ err }}
                  </div>                  <b-row class="my-3">
                    <b-col cols="6">
                      <router-link to="/forgot-password" class="text-light link"
                        >Forgot password?</router-link
                      >
                    </b-col>
                  </b-row>
                  <div class="text-center">
                    <b-button
                      type="primary"
                      :disabled="loading"
                      native-type="submit"
                      class="my-2 btn"
                      >
                      <b-icon v-if="loading" animation="spin" class="spin-icon" font-scale="1.8"
                              icon="arrow-clockwise"></b-icon>
                      Sign in</b-button
                    >
                  </div>
                  <b-row class="my-3">
                    <b-col cols="12">
                      Don't have an Account?
                      <router-link to="/register" class="text-light link"
                        >Register</router-link
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
import {mapActions} from  'vuex'
export default {
  data() {
    return {
      model: {
        email: "admin@admin.com",
        password: "password",
      },
      err: '',
      loading: false,
    };
  },
  methods: {
    ...mapActions(['LOGIN_USER', ]),
    onSubmit() {
      this.err = ''
      this.loading = true
      this.LOGIN_USER(this.model).then(res=>{
        this.loading=false

        if (res.role==='user'){
          this.$router.push('/browse')
        }else if(res.role==='admin'){
          this.$router.push('/admin')

        }
      }).catch(err=>{
        this.loading=false

        this.err = err
      })
    },
  },
};
</script>


<style lang="scss" scoped>
.login {
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
